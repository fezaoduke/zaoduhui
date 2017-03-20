> 今天迅速把书中的第三章过了一遍，本书主要针对Angular2对ts做了功能性说明，基本开发够了，但是对于刚入手的菜鸟来说还
差得远，所以以后会基于typescript中文官网对一些重要知识做详细学习，敲一些示例代码
### 简介
typescript 是一门静态类型的语言，对于js来说有很大的优点：
- 编译时类型检测  
ts有自己的编译器，采用了静态代码分析技术，从而可以帮助我们发现一些常规的拼写错属性名或者方法名的错误。编译器会及时
发出编译时的错误警告。  
而且ts提供了正式的，可验证的命名规则，从而可以方便大型团队之间的协作。
- 他是JavaScript的超集，基于最高的js标准。  

### TypeScript上手
需要全局安装typescript，安装过后会得到一个tsc的全局变量
`
npm install -g typescript
`
`
tsc -v  Version 2.2.1 //目前的版本
`
> 执行tsc dad.ts 会编译成js文件 然后node js文件即可，或者npm install ts-node -g 可以用ts-node命令直接执行ts文件   

#### 先学习es6和es7中的新内容
+ 箭头函数  
```javascript
    var result = [1,2,3,4].reduce((total, current) => total + current, 0);
    console.log(result);//10
```
上面对1，2，3，4进行求和，使用箭头函数看起来很简洁，箭头后面直接跟要return 的值，不需要return，或者代码多可以用{}
很方便。  
而且箭头函数没有了this的指向，直接指向外层函数，避免了下面的尴尬。  
```javascript
    setTimeout(function() {
        console.log(this);
    },1000)
```
这里的this指向window，而改用箭头函数，则会指向外层的this。
在angular2中这一特性及其有用，因为对于特定的Component来说，箭头函数所绑定的上下文就是Component的实例。
+ Class  
es6中的class其实是一种语法糖，编译为es5时就会发现，其实还是基于es5中的原型继承实现的一套，只不过写法上
向强类型语言靠近。class上的prototype任然存在，prototype.constructor 其实就是class本身
es6中的class：  
```javascript
    class Human {
        constructor() {}
        speak() {

        }
        static eat() {
            //静态方法不会被子类继承
            //可以直接通过类来调用
        }
    }
```
> es6中class类内部是没有静态属性的。es7中的新提案规定了静态属性和实例属性的写法
```javascript
    class MyClass {
        myProp = 32;//实例属性，以前实例属性必须在构造函数中
        constructor() {
            this.name = 'bob';//实例属性
        }
        static skill = 'eatting'; //静态属性，不会被实例访问到
    }

```
ts中es6和es7的class都实现了 :D  
在Angular中定义类非常常用，用来定义组件，指令，服务，以及管道。所有的一切。。
+ 块级作用域 使用很广泛 let const 代替了var
+ 装饰器进行元编程  
也是es7的提案，装饰器最大的作用是修改预定义好的逻辑，或者给各种结构添加一些元数据  
angular2内置了一些预定好的装饰器，用来提升代码的可读性，都定义在'core-decoration.js'中
+ Modules es6中的模块系统  
es6的模块化设计思想是尽量静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。而CommonJs和AMD模块都只能在
运行时确定这些东西，比如CommonJs模块就是对象，输入时必须查找对象属性。  
`
let { stat, exists, readFile } = require('fs');
`  
实质是整体加载fs模块(即加载模块的所有方法)，然后在使用时用到了3个方法。   
es6的模块是通过 export命令显式指定输出的代码，输入时也采用静态命令的形式。  
`
import { stat, exists, readFile } from 'fs';
`  
实际上是从fs模块加载3个方法，其他方法不加载，es6可以在编译时就完成模块编译，效率比CommonJs的加载方式高。  
常用的方式：
使用别名  
`
import { bootstrap as initialize } from 'angular2/platform/browser';    
`  
导入所有模块  
`
import * as Math from './math'
`   
默认导出 如果指定的模块定义了一个导出，而且这个导出很可能在每个使用它的消费者模块中都会用到，这时候
我们就可以使用默认导出语法：  
```javacript
export default function () {
    return ...
}
```   