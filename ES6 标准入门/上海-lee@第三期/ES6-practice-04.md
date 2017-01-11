#Module

> ES6 模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。
> ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。

	// ES6模块
	import { stat, exists, readFile } from 'fs';

ES6 模块的优点：

 1. 静态加载

 1. 不再需要UMD模块格式了，将来服务器和浏览器都会支持 ES6 模块格式。目前，通过各种工具库，其实已经做到了这一点。
 2. 将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者navigator对象的属性。
不再需要对象作为命名空间（比如Math对象），未来这些功能可以通过模块提供。

##严格模式
严格模式主要有以下限制：

1. 变量必须声明后再使用
2. 函数的参数不能有同名属性，否则报错
3. 不能使用with语句
4. 不能对只读属性赋值，否则报错
5. 不能使用前缀0表示八进制数，否则报错
6. 不能删除不可删除的属性，否则报错
7. 不能删除变量delete prop，会报错，只能删除属性delete global[prop]
8. eval不会在它的外层作用域引入变量
9. eval和arguments不能被重新赋值
10. arguments不会自动反映函数参数的变化
11. 不能使用arguments.callee
12. 不能使用arguments.caller
13. 禁止this指向全局对象
14. 不能使用fn.caller和fn.arguments获取函数调用的堆栈
15. 增加了保留字（比如protected、static和interface）

##export命令 
模块功能主要由两个命令构成：export和import。**export命令用于规定模块的对外接口**，import命令用于输入其他模块提供的功能。
> 一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。下面是一个 JS 文件，里面使用export命令输出变量。

	// profile.js -- ① 
	export var firstName = 'Michael';
	export var lastName = 'Jackson';
	export var year = 1958;

	// profile.js -- ②
	var firstName = 'Michael';
	var lastName = 'Jackson';
	var year = 1958;
	
	export {firstName, lastName, year};

	上面代码在export命令后面，使用大括号指定所要输出的一组变量。它与前一种写法（直接放置在var语句前）是等价的，但是应该优先考虑使用这种写法。因为这样就可以在脚本尾部，一眼看清楚输出了哪些变量。

> export命令除了输出变量，还可以输出函数或类（class）。

	export function multiply(x, y) {
	  return x * y;
	};
上面代码对外输出一个函数multiply。

	function v1() { ... }
	function v2() { ... }
	
	export {
	  v1 as streamV1,
	  v2 as streamV2,
	  v2 as streamLatestVersion
	};

上面代码使用as关键字，重命名了函数v1和v2的对外接口。重命名后，v2可以用不同的名字输出两次。

需要特别注意的是，export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。

// 报错
export 1;

// 报错
var m = 1;
export m;
上面两种写法都会报错，因为没有提供对外的接口

	// 报错
	function f() {}
	export f;
	
	// 正确
	export function f() {};
	
	// 正确
	function f() {}
	export {f};

> export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。

	export var foo = 'bar';
	setTimeout(() => foo = 'baz', 500);
上面代码输出变量foo，值为bar，500毫秒之后变成baz。

export命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，因为没法做静态优化。

##important命令

通过import命令加载使用export命令定义了的模块的对外接口

	// main.js
	import {firstName, lastName, year} from './profile';
	
	function setName(element) {
	  element.textContent = firstName + ' ' + lastName;
	}

import命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块（profile.js）对外接口的名称相同。

	import { lastName as surname } from './profile';  **变量重命名，.js省略**

如果只是模块名，不带有路径，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置。

	import {myMethod} from 'util';

util是模块文件名，由于不带有路径，必须通过配置，告诉引擎怎么取到这个模块。

**import命令具有提升效果，会提升到整个模块的头部，首先执行。**

	foo(); //不会存在foo undefinne
	
	import { foo } from 'my_module'; 
上面的代码不会报错，因为import的执行早于foo的调用。这种行为的本质是，import命令是编译阶段执行的，在代码运行之前。

由于import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。

	// 报错 --表达式
	import { 'f' + 'oo' } from 'my_module';
	
	// 报错 --变量
	let module = 'my_module';
	import { foo } from module;
	
	// 报错 --if
	if (x === 1) {
	  import { foo } from 'module1';
	} else {
	  import { foo } from 'module2';
	}

**import语句会执行所加载的模块**，因此可以有下面的写法。

	import 'lodash';
上面代码仅仅执行lodash模块，但是不输入任何值。

如果多次重复执行同一句import语句，那么只会执行一次，而不会执行多次。
 **import语句是 Singleton 模式**

	import 'lodash';
	import 'lodash';

	import { foo } from 'my_module';
	import { bar } from 'my_module';
	
	// 等同于
	import { foo, bar } from 'my_module';

##模块的整体加载

除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面

	// circle.js
	
	export function area(radius) {
	  return Math.PI * radius * radius;
	}
	
	export function circumference(radius) {
	  return 2 * Math.PI * radius;
	}
	
	import * as circle from './circle';
	
	console.log('圆面积：' + circle.area(4));
	console.log('圆周长：' + circle.circumference(14));

##export default 命令
为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令，为模块指定默认输出。

// export-default.js
export default function () {
  console.log('foo');
}

其他模块加载该模块时，import命令可以为该匿名函数指定任意名字。**此时import命令后面，不使用大括号。**

	// import-default.js
	import customName from './export-default';
	customName(); // 'foo'

**export default命令用在非匿名函数前，也是可以的。**

export default命令用于指定模块的默认输出。显然，**一个模块只能有一个默认输出**，因此export default命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能对应一个方法。

有了export default命令，输入模块时就非常直观了，以输入 lodash 模块为例。

import _ from 'lodash';
如果想在一条import语句中，同时输入默认方法和其他变量，可以写成下面这样。

	import _, { each } from 'lodash';
对应上面代码的export语句如下。

	export default function (obj) {
	  // ···
	}
	export function each(obj, iterator, context) {
	  // ···
	}
	export { each as forEach };
上面代码的最后一行的意思是，暴露出forEach接口，默认指向each接口，即forEach和each指向同一个方法。

如果要输出默认的值，只需将值跟在export default之后即可。

	export default 42;
	export default也可以用来输出类。
	
	// MyClass.js
	export default class { ... }
	
	// main.js
	import MyClass from 'MyClass';

##export 与 import 的复合写法
如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。

模块的接口改名和整体输出，也可以采用这种写法。

	// 接口改名
	export { foo as myFoo } from 'my_module';
	
	// 整体输出
	export * from 'my_module';
默认接口的写法如下。

	export { default } from 'foo';
具名接口改为默认接口的写法如下。

	export { es6 as default } from './someModule';

	// 等同于
	import { es6 } from './someModule';
	export default es6;
同样地，默认接口也可以改名为具名接口。

	export { default as es6 } from './someModule';

##模块的继承
假设有一个circleplus模块，继承了circle模块。
	
	// circleplus.js
	
	export * from 'circle';
	export var e = 2.71828182846;
	export default function(x) {
	  return Math.exp(x);
	}
上面代码中的export *，表示再输出circle模块的所有属性和方法。注意，export *命令会忽略circle模块的default方法。然后，上面代码又输出了自定义的e变量和默认方法。

这时，也可以将circle的属性或方法，改名后再输出。

	// circleplus.js
	
	export { area as circleArea } from 'circle';
上面代码表示，只输出circle模块的area方法，且将其改名为circleArea。

加载上面模块的写法如下。

	// main.js
	
	import * as math from 'circleplus';
	import exp from 'circleplus';
	console.log(exp(math.e));
上面代码中的import exp表示，将circleplus模块的默认方法加载为exp方法。

##ES6模块加载的实质

ES6模块加载的机制，与CommonJS模块完全不同。CommonJS模块输出的是一个值的拷贝，而ES6模块输出的是值的引用。

CommonJS模块输出的是被输出值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。ES6模块的运行机制与CommonJS不一样，它遇到模块加载命令import时，不会去执行模块，而是只生成一个动态的只读引用。等到真的需要用到时，再到模块里面去取值，换句话说，ES6的输入有点像Unix系统的“符号连接”，原始值变了，import输入的值也会跟着变。因此，ES6模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

##浏览器的模块加载

浏览器使用 ES6 模块的语法如下。

<script type="module" src="foo.js"></script>
**由于type属性设为module，所以浏览器知道这是一个 ES6 模块。**

对于外部的模块脚本（上例是foo.js），有几点需要注意。

1. 该脚本自动采用严格模块。
2. 该脚本内部的顶层变量，都只在该脚本内部有效，外部不可见。
3. 该脚本内部的顶层的this关键字，返回undefined，而不是指向window。

##循环加载

“循环加载”（circular dependency）指的是，a脚本的执行依赖b脚本，而b脚本的执行又依赖a脚本。
通常，“循环加载”表示存在强耦合，如果处理不好，还可能导致递归加载，使得程序无法执行，因此应该避免出现。

对于JavaScript语言来说，目前最常见的两种模块格式CommonJS和ES6，处理“循环加载”的方法是不一样的，返回的结果也不一样。
