#class

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

