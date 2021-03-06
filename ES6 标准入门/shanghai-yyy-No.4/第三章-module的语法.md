这个是看的网站，所以可能与书上不太一样。

## module的语法

ES6 模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。

ES6 模块不是对象，而是通过`export`命令显式指定输出的代码，再通过`import`命令输入。
加载方式为`更高效`的`编译时加载`或者`静态加载`，即 ES6 可以在编译时就完成模块加载。

以下好处并没有太看懂：
+ 不再需要UMD模块格式了，将来服务器和浏览器都会支持 ES6 模块格式。目前，通过各种工具库，其实已经做到了这一点。
+ 将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者navigator对象的属性。
+ 不再需要对象作为命名空间（比如Math对象），未来这些功能可以通过模块提供。

ES6 的模块自动采用严格模式。最重要的一点：`ES6 模块之中，顶层的this指向undefined，即不应该在顶层代码使用this。`

### export命令 和 import命令
就是在这个文件（模块）中定义好了（用export）你在另一个文件（模块）拿去用（import）。

> 一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，
就必须使用export关键字输出该变量。

使用export可以定义变量和方法，可用as以起别名，还可以同意最后一起定义，这样看变量比较方便知道定义了什么。
```javascript
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;

----------------

var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export {firstName, lastName, year};

------------------

function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
```
需要特别注意的是，`export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系`。
就是放在后边统一定义的这种情况吧需要使用{}来定义你所使用的变量。

而在使用`import`时呢，你想引用的其他模块的变量名必须与该模块一致。如果想起别名，也可以用as。

```javascript
import { lastName as surname } from './profile';

-------

import {myMethod} from 'util';
```
如果只是模块名，不带有路径，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置。

注意：`import命令是编译阶段执行的，在代码运行之前。`可以类似函数声明提升？

也可以使用*号作为`模块的整体加载`。并且模块整体加载的那个对象是可以静态分析的，所以不允许运行时改变。

### export defalut 命令

这个就是该模块的默认输出，而`import`此时就可以不用as重命名了，可以直接起别名，而且也可以不用写{}了。
因为是默认输出，所以一个模块只能有一个export default命令。

这个命令的`本质`其实是输出一个叫做default的变量，所以它后面不能跟变量声明语句。

```javascript
// 正确
export var a = 1;

// 正确
var a = 1;
export default a;

// 错误
export default var a = 1;
```

### export和import复合写法
如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。


```javascript
export { foo, bar } from 'my_module';

// 等同于
import { foo, bar } from 'my_module';
export { foo, bar };

// 接口改名
export { foo as myFoo } from 'my_module';

// 整体输出
export * from 'my_module';

export { es6 as default } from './someModule';

// 等同于
import { es6 } from './someModule';
export default es6;
```

### 跨模块常量

const声明的常量只在当前代码块有效。如果想设置跨模块的常量（即跨多个文件），
或者说一个值要被多个模块共享，可以采用下面的写法。

```javascript
// constants.js 模块
export const A = 1;
export const B = 3;
export const C = 4;

// test1.js 模块
import * as constants from './constants';
console.log(constants.A); // 1
console.log(constants.B); // 3

// test2.js 模块
import {A, B} from './constants';
console.log(A); // 1
console.log(B); // 3
```

### import()   

适用场景：

+ 按需加载
```javascript
button.addEventListener('click', event => {
  import('./dialogBox.js')
  .then(dialogBox => {
    dialogBox.open();
  })
  .catch(error => {
    /* Error handling */
  })
});
```
+ 条件加载
```javascript
if (condition) {
  import('moduleA').then(...);
} else {
  import('moduleB').then(...);
}
```
+ 动态的模块路径
```javascript
import(f())
.then(...);
```
要注意的是：import()加载模块成功以后，这个模块会作为一个对象，当作then方法的参数。
因此，可以使用对象解构赋值的语法，获取输出接口。

```javascript
import('./myModule.js')
.then(({export1, export2}) => {
  // ...·
});
```