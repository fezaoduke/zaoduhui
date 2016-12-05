## 12、Symbol
Symbol是一种互不等价的标志，即任意两个Symbol值都不相等。在ES2015中，字面量对象除了可以用字符串、数字作为属性键外，还能用Symbol作为属性键，因此可以通过利用Symbol值的互不相等特性实现属性操作的互不干扰。
### 基本语法
+ 生成唯一的Symbol值
执行Symbol( [description] )可以生成一个与其他Symbol值不等价的Symbol值。Symbol（）函数可以接受一个除了Symbol值作为该Symbol值的描述。
```
const symbol = Symbol();
const symbolstr = Symbol("something");
const symbolwithNumber = Symbol( 33 );
const symbolwithObject = Symbol( {'foo': 'bar'} );
```
Symbol函数中的描述值仅仅为描述性的存在，所以即使两个拥有相同描述值的Symbol对象也是不想等的。
Symbol函数不是构造函数，不能用new，Symbol值是值类型而不是引用类型，意味着将其作为参数传递给函数，将会进行复制值传递而不是按引用传递。
```
const symbol = Symbol('hello');

function fn1 (_symbol) {
    return _symbol == symbol;
}
console.log( fn1(symbol) );        // true

function fn2 (_symbol) {
    _symbol = null;
    console.log( _symbol );
}
fn2( symbol);    //null
console.log(symbol);        //Symbol(hello)
```
如果要得到symbol“对象”可以通过Object（）函数实现：
```
const symbol1 = Symbol(123);
typeof symbol1;        // symbol
const symbolObj = Object(symbol);
typeof symbolObj;    //object
```
+ 注册全局可重用Symbol
ES2015标准除了提供具有唯一性的Symbol值以外，还允许开发者在当前运行中定义一些具有全局有效性的Symbol。通过Symbol.for()。与Symbol（）的区别是是Symbol.for()会根据传进去的key在全局作用域内注册一个Symbol值，如果一个key没注册到全局作用域中就会被注册，如果被注册到全局了就返回一个与第一次使用所创建的Symbol值等价的Symbol值。
```
const symbol = Symbol.for( 'foo' );
const obj = {};
obj[symbol] = 'bar';
//...

const anotherSymbol = Symbol.for( 'foo' );
console.log(symbol === anotherSymbol);    //true
console.log(obj[anotherSymbol]);   // bar
```
+ 获取全局Symbol的key
通过Symbol.keyFor(  )获取全局Symbol的key值
```
const symbol = Symbol.for( 'foobar' );
console.log(Symbol.keyFor(symbol));
```
### 常用Symbol值
ES2015内置了很多常用的Symbol值，可以通过常用Symbol值对代码的内部运行逻辑进行修改或拓展，实现更多需求。
`@@iterator` `@@hasInstance` `@@match`...
书中详解：
#### Symbol.iterator
**可迭代对象：可迭代对象不是一种类型，而是指带有@@iterator属性和能被for-of循环语句所遍历的对象总称。**
**默认可迭代对象：** 数组，字符串，类型数组（typeArray），映射对象（map），集合对象（Set）和生成器（generator），浏览器环境中DOM元素集合也属于可迭代对象。
开发者可以用Symbol.iterator来定义一个可迭代对象，每个可迭代对象都会有一个使用Symbol.iterator作为方法名的方法属性，返回一个迭代器。可以看做是一个迭代器协议。该协议定义了next（）方法，含义为进入下一次迭代状态，第一次执行返回第一次的迭代状态，这个迭代对象需要有两个属性：  `done`布尔值表示该迭代器是否已经迭代结束  `value` 任何类型表示迭代的状态

#### Symbol.hasInstance
Symbol.hasInstance用于扩展instanceof语句内部逻辑的权限，可以将其作为属性键，用于为一个类定义静态方法，该方法第一个形参是被检测的对象，而该方法的返回值便是决定了当次instanceof语句的返回结果。
```
class MyArray { 
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance);
  }
}
console.log([] instanceof MyArray); // true
```

#### Symbol.match
 Symbol.match是正则表达式作为字符串使用match（）方法，内部运行逻辑的自定义逻辑入口。
```
const re = /foo/;
re[Symbol.match] = function (str) {
    const regxp = this;
    console.log(str);
    return true;
}
'bar'.match(re);    //true
```

#### Symbol.unscopables
作为属性键能够看一个对象的哪些对象是在with语句中禁止使用的
```
Array.prototype[Symbol.unscopables]
// =>
/*{
    copyWithin:true,
    entries:true,
    fill:true,
    find:true,
    findIndex:true,
    includes:true,
    keys:true
}*/
```
#### Symbol.toPrimitive
为了给开发者提供更高的控制权利，使得引用类型的对象在转换为值类型时可以自定义处理，无论是转换啊为数字还是字符串
```
const obj = {};
console.log(+obj);    //NaN
console.log(`${obj}`);    //[object object]
console.log(obj + '');    //[object object]

const Ten = {
    [Symbol.toPrimitive](hint) {
        switch(hint) {
            case 'number':
                return 10;
            case 'string':
                return 'Ten';
            case 'default':
                return true;
       }
   }
}
console.log(+Ten);    //10
console.log(`${Ten}`);    //Ten
console.log(Ten + '');    //true
```
#### Symbol.toStringTag
除了null和undefined外，所以Object子类的实例都有一个利用Symbol.toStringTag作为属性键的属性，这个属性定义这个对象调用toString方法时的返回Tag内容。
```
class Bar {}
class Foo {
    get [Symbol.toStringTag] () { return 'Bar' }
}

const obj = new Foo();
console.log( obj.toString() );    // [object Bar]