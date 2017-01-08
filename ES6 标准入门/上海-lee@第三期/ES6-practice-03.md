1#class

ES6提供了更接近传统语言的写法，引入了Class（类）这个概念，作为对象的模板。

	//定义类
	class Point {
	  constructor(x, y) {
	    this.x = x;
	    this.y = y;
	  }
	
	  toString() {
	    return '(' + this.x + ', ' + this.y + ')';
	  }
	}

上面代码定义了一个“类”，可以看到里面有一个constructor方法，这就是构造方法，而this关键字则代表实例对象。也就是说，ES5的构造函数Point，对应ES6的Point类的构造方法。

Point类除了构造方法，还定义了一个toString方法。注意，定义“类”的方法的时候，前面不需要加上function这个关键字，直接把函数定义放进去了就可以了。另外，方法之间不需要逗号分隔，加了会报错。

ES6的类，完全可以看作构造函数的另一种写法。

	class Point {
	  // ...
	}
	
	typeof Point // "function"
	Point === Point.prototype.constructor // true

上面代码表明，**类的数据类型就是函数，类本身就指向构造函数**。

使用的时候，也是直接对类使用new命令，跟构造函数的用法完全一致。

	class Bar {
	  doStuff() {
	    console.log('stuff');
	  }
	}
	
	var b = new Bar();
	b.doStuff() // "stuff"
	
	class Point {
	  constructor(){
	    // ...
	  }
	
	  toString(){
	    // ...
	  }
	
	  toValue(){
	    // ...
	  }
	}
	
	// 等同于
	
	Point.prototype = {
	  toString(){},
	  toValue(){}
	};

由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。Object.assign方法可以很方便地一次向类添加多个方法。

	class Point {
	  constructor(){
	    // ...
	  }
	}
	
	Object.assign(Point.prototype, {
	  toString(){},
	  toValue(){}
	});

prototype对象的constructor属性，直接指向“类”的本身，这与ES5的行为是一致的。

**类的内部所有定义的方法，都是不可枚举的（non-enumerable）**

	class Point {
	  constructor(x, y) {
	    // ...
	  }
	
	  toString() {
	    // ...
	  }
	}
	
	Object.keys(Point.prototype)
	// []
	Object.getOwnPropertyNames(Point.prototype)
	// ["constructor","toString"]

>上面代码中，toString方法是Point类内部定义的方法，它是不可枚举的。这一点与ES5的行为不一致。

	var Point = function (x, y) {
	  // ...
	};
	
	Point.prototype.toString = function() {
	  // ...
	};
	
	Object.keys(Point.prototype)
	// ["toString"]
	Object.getOwnPropertyNames(Point.prototype)
	// ["constructor","toString"]
> 上面代码采用ES5的写法，toString方法就是可枚举的。

**类的属性名，可以采用表达式**

let methodName = "getArea";
class Square{
  constructor(length) {
    // ...
  }

  [methodName]() {
    // ...
  }
}
上面代码中，Square类的方法名getArea，是从表达式得到的。

**constructor方法**

constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。

	class Foo {
	  constructor() {
	    return Object.create(null);
	  }
	}
	
	new Foo() instanceof Foo
	// false

上面代码中，constructor函数返回一个全新的对象，结果导致实例对象不是Foo类的实例。

类的构造函数，不使用new是没法调用的，会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。

	class Foo {
	  constructor() {
	    return Object.create(null);
	  }
	}
	
	Foo()
	// TypeError: Class constructor Foo cannot be invoked without 'new'

**类的实例对象** --> 生成类的实例对象的写法，与ES5完全一样，也是使用new命令
>与ES5一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。

	//定义类
	class Point {
	
	  constructor(x, y) {
	    this.x = x;
	    this.y = y;
	  }
	
	  toString() {
	    return '(' + this.x + ', ' + this.y + ')';
	  }
	
	}
	
	var point = new Point(2, 3);
	
	point.toString() // (2, 3)
	
	point.hasOwnProperty('x') // true
	point.hasOwnProperty('y') // true
	point.hasOwnProperty('toString') // false
	point.__proto__.hasOwnProperty('toString') // true

上面代码中，x和y都是实例对象point自身的属性（因为定义在this变量上），所以hasOwnProperty方法返回true，而toString是原型对象的属性（因为定义在Point类上），所以hasOwnProperty方法返回false。这些都与ES5的行为保持一致。

与ES5一样，类的所有实例共享一个原型对象。

	var p1 = new Point(2,3);
	var p2 = new Point(3,2);
	
	p1.__proto__ === p2.__proto__  //true

这也意味着，可以通过实例的__proto__属性为Class添加方法。

	var p1 = new Point(2,3);
	var p2 = new Point(3,2);
	
	p1.__proto__.printName = function () { return 'Oops' };
	
	p1.printName() // "Oops"
	p2.printName() // "Oops"
	
	var p3 = new Point(4,2);
	p3.printName() // "Oops"

**不存在变量提升** --> Class不存在变量提升（hoist），这一点与ES5完全不同

	new Foo(); // ReferenceError
	class Foo {}
上面代码中，Foo类使用在前，定义在后，这样会报错，因为ES6不会把类的声明提升到代码头部。这种规定的原因与下文要提到的继承有关，必须保证子类在父类之后定义。
	
	{
	  let Foo = class {};
	  class Bar extends Foo {
	  }
	}
上面的代码不会报错，因为Bar继承Foo的时候，Foo已经有定义了。但是，如果存在class的提升，上面代码就会报错，因为class会被提升到代码头部，而let命令是不提升的，所以导致Bar继承Foo的时候，Foo还没有定义。


**Class表达式** --> 
与函数一样，类也可以使用表达式的形式定义。

	const MyClass = class Me {
	  getClassName() {
	    return Me.name;
	  }
	};

上面代码使用表达式定义了一个类。需要注意的是，这个类的名字是MyClass而不是Me，Me只在Class的内部代码可用，指代当前类。

	let inst = new MyClass();
	inst.getClassName() // Me
	Me.name // ReferenceError: Me is not defined
上面代码表示，Me只在Class内部有定义。

如果类的内部没用到的话，可以省略Me，也就是可以写成下面的形式。

	const MyClass = class { /* ... */ };
	采用Class表达式，可以写出立即执行的Class。
	
	let person = new class {
	  constructor(name) {
	    this.name = name;
	  }
	
	  sayName() {
	    console.log(this.name);
	  }
	}('张三');
	
	person.sayName(); // "张三"

上面代码中，person是一个立即执行的类的实例。

**私有方法** --> 私有方法是常见需求，但ES6不提供，只能通过变通方法模拟实现。

一种做法是在命名上加以区别。

	class Widget {
	
	  // 公有方法
	  foo (baz) {
	    this._bar(baz);
	  }
	
	  // 私有方法
	  _bar(baz) {
	    return this.snaf = baz;
	  }
	
	  // ...
	}

上面代码中，_bar方法前面的下划线，表示这是一个只限于内部使用的私有方法。但是，这种命名是不保险的，在类的外部，还是可以调用到这个方法。

另一种方法就是索性将私有方法移出模块，因为模块内部的所有方法都是对外可见的。

	class Widget {
	  foo (baz) {
	    bar.call(this, baz);
	  }
	
	  // ...
	}
	
	function bar(baz) {
	  return this.snaf = baz;
	}

上面代码中，foo是公有方法，内部调用了bar.call(this, baz)。这使得bar实际上成为了当前模块的私有方法。

还有一种方法是利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值。

	const bar = Symbol('bar');
	const snaf = Symbol('snaf');
	
	export default class myClass{
	
	  // 公有方法
	  foo(baz) {
	    this[bar](baz);
	  }
	
	  // 私有方法
	  [bar](baz) {
	    return this[snaf] = baz;
	  }
	
	  // ...
	};

上面代码中，bar和snaf都是Symbol值，导致第三方无法获取到它们，因此达到了私有方法和私有属性的效果。

##this的指向
类的方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。

	class Logger {
	  printName(name = 'there') {
	    this.print(`Hello ${name}`);
	  }
	
	  print(text) {
	    console.log(text);
	  }
	}
	
	const logger = new Logger();
	const { printName } = logger;
	printName(); // TypeError: Cannot read property 'print' of undefined

上面代码中，printName方法中的this，默认指向Logger类的实例。但是，如果将这个方法提取出来单独使用，this会指向该方法运行时所在的环境，因为找不到print方法而导致报错。

一个比较简单的解决方法是，在构造方法中绑定this，这样就不会找不到print方法了。
	
	class Logger {
	  constructor() {
	    this.printName = this.printName.bind(this);
	  }
	
	  // ...
	}

另一种解决方法是使用箭头函数。
	
	class Logger {
	  constructor() {
	    this.printName = (name = 'there') => {
	      this.print(`Hello ${name}`);
	    };
	  }
	
	  // ...
	}

还有一种解决方法是使用Proxy，获取方法的时候，自动绑定this。 **此段需要复看**

	function selfish (target) {
	  const cache = new WeakMap();
	  const handler = {
	    get (target, key) {
	      const value = Reflect.get(target, key);
	      if (typeof value !== 'function') {
	        return value;
	      }
	      if (!cache.has(value)) {
	        cache.set(value, value.bind(target));
	      }
	      return cache.get(value);
	    }
	  };
	  const proxy = new Proxy(target, handler);
	  return proxy;
	}
	
	const logger = selfish(new Logger());

**严格模式** --> 
类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。

考虑到未来所有的代码，其实都是运行在模块之中，所以ES6实际上把整个语言升级到了严格模式。

**严格模式** --> 
类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。

**name属性** --> 由于本质上，ES6的类只是ES5的构造函数的一层包装，所以函数的许多特性都被Class继承，包括name属性。

	class Point {}
	Point.name // "Point"

name属性总是返回紧跟在class关键字后面的类名。

###Class的继承  
>Class之间可以通过extends关键字实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多。

	class ColorPoint extends Point {}

上面代码定义了一个ColorPoint类，该类通过extends关键字，继承了Point类的所有属性和方法。但是由于没有部署任何代码，所以这两个类完全一样，等于复制了一个Point类。

	class ColorPoint extends Point {
	  constructor(x, y, color) {
	    super(x, y); // 调用父类的constructor(x, y)
	    this.color = color;
	  }
	
	  toString() {
	    return this.color + ' ' + super.toString(); // 调用父类的toString()
	  }
	}

上面代码中，constructor方法和toString方法之中，都出现了super关键字，它在这里表示父类的构造函数，用来新建父类的this对象。

子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。
如果子类没有定义constructor方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类都有constructor方法。

	constructor(...args) {
	  super(...args);
	}

> 另一个需要注意的地方是，在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。这是因为子类实例的构建，是基于对父类实例加工，只有super方法才能返回父类实例。
> 生成子类实例的代码。

	let cp = new ColorPoint(25, 8, 'green');
	
	cp instanceof ColorPoint // true
cp instanceof Point // true
上面代码中，实例对象cp同时是ColorPoint和Point两个类的实例，这与ES5的行为完全一致。

**类的prototype属性和__proto__属性**

类的prototype属性和__proto__属性 § ⇧
大多数浏览器的ES5实现之中，每一个对象都有__proto__属性，指向对应的构造函数的prototype属性。Class作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。

1. 子类的__proto__属性，表示构造函数的继承，总是指向父类。

2. 子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。

		class A {
		}
		
		class B extends A {
		}
		
		B.__proto__ === A // true
		B.prototype.__proto__ === A.prototype // true

**类的继承实现模式**
	class A {
	}
	
	class B {
	}
	
	// B的实例继承A的实例
	Object.setPrototypeOf(B.prototype, A.prototype);
	const b = new B();
	
	// B的实例继承A的静态属性
	Object.setPrototypeOf(B, A);
	const b = new B();


	Object.setPrototypeOf = function (obj, proto) {
	  obj.__proto__ = proto;
	  return obj;
	}
因此，就得到了上面的结果。

	Object.setPrototypeOf(B.prototype, A.prototype);
	// 等同于
	B.prototype.__proto__ = A.prototype;
	
	Object.setPrototypeOf(B, A);
	// 等同于
	B.__proto__ = A;

这两条继承链，可以这样理解：作为一个对象，子类（B）的原型（__proto__属性）是父类（A）；作为一个构造函数，子类（B）的原型（prototype属性）是父类的实例。

	Object.create(A.prototype);
	// 等同于
	B.prototype.__proto__ = A.prototype;

**Extends 的继承目标**  --> extends关键字后面可以跟多种类型的值。

	class B extends A {
	}

上面代码的A，只要是一个有prototype属性的函数，就能被B继承。由于函数都有prototype属性（除了Function.prototype函数），因此A可以是任意函数。

> 第一种特殊情况，**子类继承Object类**

	class A extends Object {
	}
	
	A.__proto__ === Object // true
	A.prototype.__proto__ === Object.prototype // true
这种情况下，A其实就是构造函数Object的复制，A的实例就是Object的实例。
> 第二种特殊情况，**不存在任何继承**

	class A {
	}
	
	A.__proto__ === Function.prototype // true
	A.prototype.__proto__ === Object.prototype // true
这种情况下，A作为一个基类（即不存在任何继承），就是一个普通函数，所以直接继承Funciton.prototype。但是，A调用后返回一个空对象（即Object实例），所以A.prototype.__proto__指向构造函数（Object）的prototype属性。

>第三种特殊情况，子类继承null。

	class A extends null {
	}
	
	A.__proto__ === Function.prototype // true
	A.prototype.__proto__ === undefined // true

这种情况与第二种情况非常像。A也是一个普通函数，所以直接继承Funciton.prototype。但是，A调用后返回的对象不继承任何方法，所以它的__proto__指向Function.prototype，即实质上执行了下面的代码。

	class C extends null {
	  constructor() { return Object.create(null); }
	}


**Object.getPrototypeOf()** --> 用来从子类上获取父类。 可以使用这个方法判断，一个类是否继承了另一个类

	Object.getPrototypeOf(ColorPoint) === Point // true

**super 关键字** --> 既可以当作函数使用，也可以当作对象使用

	class A {}
	
	class B extends A {
	  constructor() {
	    super();  //代表调用父类的构造函数。必须有
	  }
	}

注意，super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B，因此super()在这里相当于
> **注意**，super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B，因此super()在这里相当于A.prototype.constructor.call(this)。

	class A {
	  constructor() {
	    console.log(new.target.name);
	  }
	}
	class B extends A {
	  constructor() {
	    super();
	  }
	}
	new A() // A
	new B() // B

作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。

	class A {}
	
	class B extends A {
	  m() {
	    super(); // 报错
	  }
	}

第二种情况，**super作为对象** 时，指向父类的原型对象。

	class A {
	  p() {
	    return 2;
	  }
	}
	
	class B extends A {
	  constructor() {
	    super();
	    console.log(super.p()); // 2
	  }
	}
	
	let b = new B();
上面代码中，子类B当中的super.p()，就是将super当作一个对象使用。这时，super指向A.prototype，所以super.p()就相当于A.prototype.p()。

这里需要注意，由于**super指向父类的原型对象**，所以定义在父类实例上的方法或属性，是无法通过super调用的。

如果属性定义在父类的原型对象上，super就可以取到。

	class A {}
	A.prototype.x = 2;
	
	class B extends A {
	  constructor() {
	    super();
	    console.log(super.x) // 2
	  }
	}
	
	let b = new B();

**ES6 规定，通过super调用父类的方法时，super会绑定子类的this。**

	class A {
	  constructor() {
	    this.x = 1;
	  }
	  print() {
	    console.log(this.x);
	  }
	}
	
	class B extends A {
	  constructor() {
	    super();
	    this.x = 2;
	  }
	  m() {
	    super.print();
	  }
	}
	
	let b = new B();
	b.m() // 2
上面代码中，super.print()虽然调用的是A.prototype.print()，但是A.prototype.print()会绑定子类B的this，导致输出的是2，而不是1。也就是说，实际上执行的是super.print.call(this)。

由于绑定子类的this，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。

由于绑定子类的this，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。

	class A {
	  constructor() {
	    this.x = 1;
	  }
	}
	
	class B extends A {
	  constructor() {
	    super();
	    this.x = 2;
	    super.x = 3;
	    console.log(super.x); // undefined
	    console.log(this.x); // 3
	  }
	}
	
	let b = new B();

上面代码中，super.x赋值为3，这时等同于对this.x赋值为3。而当读取super.x的时候，读的是A.prototype.x，所以返回undefined。

注意，使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。

**由于对象总是继承其他对象的，所以可以在任意一个对象中，使用super关键字。**

**实例的__proto__属性** -->子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。也就是说，子类的原型的原型，是父类的原型。

	var p1 = new Point(2, 3);
	var p2 = new ColorPoint(2, 3, 'red');
	
	p2.__proto__ === p1.__proto__ // false
	p2.__proto__.__proto__ === p1.__proto__ // true

上面代码中，ColorPoint继承了Point，导致前者原型的原型是后者的原型。

因此，通过子类实例的__proto__.__proto__属性，可以修改父类实例的行为。

	p2.__proto__.__proto__.printName = function () {
	  console.log('Ha');
	};
	
	p1.printName() // "Ha"
上面代码在ColorPoint的实例p2上向Point类添加方法，结果影响到了Point的实例p1。

##原生构造函数的继承 -->
 指语言内置的构造函数，通常用来生成数据结构。ECMAScript的原生构造函数大致有下面这些
1. Boolean()
2. Number()
3. String()
4. Array()
5. Date()
6. Function()
7. RegExp()
8. Error()
9. Object()


**ES6允许继承原生构造函数定义子类**  因为ES6是先新建父类的实例对象this，然后再用子类的构造函数修饰this，使得父类的所有行为都可以继承。下面是一个继承Array的例子。

	class MyArray extends Array {
	  constructor(...args) {
	    super(...args);
	  }
	}
	
	var arr = new MyArray();
	arr[0] = 12;
	arr.length // 1
	
	arr.length = 0;
	arr[0] // undefined

extends关键字不仅可以用来继承类，还可以用来继承原生的构造函数。因此可以在原生数据结构的基础上，定义自己的数据结构

	class VersionedArray extends Array {
	  constructor() {
	    super();
	    this.history = [[]];
	  }
	  commit() {
	    this.history.push(this.slice());
	  }
	  revert() {
	    this.splice(0, this.length, ...this.history[this.history.length - 1]);
	  }
	}
	
	var x = new VersionedArray();
	
	x.push(1);
	x.push(2);
	x // [1, 2]
	x.history // [[]]
	
	x.commit();
	x.history // [[], [1, 2]]
	x.push(3);
	x // [1, 2, 3]
	
	x.revert();
	x // [1, 2]


下面是一个自定义Error子类的例子。

	class ExtendableError extends Error {
	  constructor(message) {
	    super();
	    this.message = message;
	    this.stack = (new Error()).stack;
	    this.name = this.constructor.name;
	  }
	}
	
	class MyError extends ExtendableError {
	  constructor(m) {
	    super(m);
	  }
	}

	var myerror = new MyError('ll');
	myerror.message // "ll"
	myerror instanceof Error // true
	myerror.name // "MyError"
	myerror.stack
	// Error
	//     at MyError.ExtendableError
	//     ...
	注意，继承Object的子类，有一个行为差异。
	
	class NewObj extends Object{
	  constructor(){
	    super(...arguments);
	  }
	}
	var o = new NewObj({attr: true});
	console.log(o.attr === true);  // false

上面代码中，NewObj继承了Object，但是无法通过super方法向父类Object传参。这是因为ES6改变了Object构造函数的行为，一旦发现Object方法不是通过new Object()这种形式调用，ES6规定Object构造函数会忽略参数。


**Class的取值函数（getter）和存值函数（setter）** -->
>  使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为
存值函数和取值函数是设置在属性的descriptor对象上的。

**Class的Generator方法**  --> 方法之前加*

	class Foo {
	  constructor(...args) {
	    this.args = args;
	  }
	  * [Symbol.iterator]() {
	    for (let arg of this.args) {
	      yield arg;
	    }
	  }
	}
	
	for (let x of new Foo('hello', 'world')) {
	  console.log(x);
	}
	// hello
	// world

上面代码中，Foo类的Symbol.iterator方法前有一个星号，表示该方法是一个Generator函数。Symbol.iterator方法返回一个Foo类的默认遍历器，for...of循环会自动调用这个遍历器。

**Class的静态方法**

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

	class Foo {
	  static classMethod() {
	    return 'hello';
	  }
	}
	
	Foo.classMethod() // 'hello' --类调用
	
	var foo = new Foo();
	foo.classMethod()
	// TypeError: foo.classMethod is not a function  -- 实例调用

**父类的静态方法，可以被子类继承**

**静态方法也是可以从super对象上调用的**
	class Foo {
	  static classMethod() {
	    return 'hello';
	  }
	}
	
	class Bar extends Foo {
	  static classMethod() {
	    return super.classMethod() + ', too';
	  }
	}
	
	Bar.classMethod();

####Class的静态属性和实例属性
静态属性指的是Class本身的属性，即Class.propname，而不是定义在实例对象（this）上的属性。
**ES6明确规定，Class内部只有静态方法，没有静态属性。**

####new.target属性 
new是从构造函数生成实例的命令。ES6为new命令引入了一个new.target属性，（在构造函数中）返回new命令作用于的那个构造函数。如果构造函数不是通过new命令调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的。Class内部调用new.target，返回当前Class。**子类继承父类时，new.target会返回子类**。

> **利用这个特点，可以写出不能独立使用、必须继承后才能使用的类**

**Mixin模式的实现** --> 将多个类的接口“混入”（mix in）另一个类

	function mix(...mixins) {
	  class Mix {}
	
	  for (let mixin of mixins) {
	    copyProperties(Mix, mixin);
	    copyProperties(Mix.prototype, mixin.prototype);
	  }
	
	  return Mix;
	}
	
	function copyProperties(target, source) {
	  for (let key of Reflect.ownKeys(source)) {
	    if ( key !== "constructor"
	      && key !== "prototype"
	      && key !== "name"
	    ) {
	      let desc = Object.getOwnPropertyDescriptor(source, key);
	      Object.defineProperty(target, key, desc);
	    }
	  }
	}

