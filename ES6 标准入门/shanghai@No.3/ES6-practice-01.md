自控力不好，所以，常会经历类似“计划赶不上变化”这样的事，大家都懂，废话不说了，看行动啦~~~~

#ES6入门
ES6模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS(服务器端)和AMD(浏览器端)模块，都只能在运行时确定这些东西。
####前言
>*检测本地是否支持ES6环境
简便方法：直接在浏览器调试工具下尝试输入Promise（ES6的新API，用于异步事件的处理），如果能打印出其构造函数，则支持。*


####开始

##### modul 使用
//content.js

	export default 'A cat'    
	export function say(){
	    return 'Hello!'
	}    
	export const type = 'dog'


//index.js

	import { say, type } from './content'  
	let says = say()
	console.log(`The ${type} says ${says}`)  //The dog says Hello

//index.js

	import animal, { say, type } from './content'  
	let says = say()
	console.log(`The ${type} says ${says} to ${animal}`)  
	//The dog says Hello to A cat

③
//index.js

	import animal, { say, type as animalType } from './content'  
	let says = say()
	console.log(`The ${animalType} says ${says} to ${animal}`)  
	//The dog says Hello to A cat

④//index.js

	import animal, * as content from './content'  
	let says = content.say()
	console.log(`The ${content.type} says ${says} to ${animal}`)  
	//The dog says Hello to A cat

#第一章
**let  & const**
块级作用域存在的意义:

1.  阻止内层变量可能会覆盖外层变量的情况出现;
2.  防止用来计数的循环变量泄露为全局变量；
3.  let实际上为JavaScript新增了块级作用域。
4.  let声明的变量只在它所在的代码块有效,ex:for(let i=0;i<9;i++){};且在改代码块内不允许重复生声明同一个变量，不论生命方式为"let"或"var"
5.   let不存在变量提升，用let声明的变量，仅在当前区块内有效，从一开始就形成了封闭作用域，变量一定要在声明后使用。 如果声明在使用之后，则会"ReferenceError"
6.   let存在暂时性死区（temporal dead zone，简称TDZ）-->在代码块内，使用let命令声明变量之前，该变量都是不可用的,若此时对该变量使用typeof，则会报" ReferenceError"
7.    let不允许在相同作用域内，重复声明同一个变量。
 


		if (true) {
		// TDZ开始
		tmp = 'abc'; // ReferenceError
		console.log(tmp); // ReferenceError
		
		let tmp; // TDZ结束
		console.log(tmp); // undefined
		
		tmp = 123;
		console.log(tmp); // 123
		}
		
		{{{{
		{let insane = 'Hello World'}
		console.log(insane); // 报错 not defined
		}}}};  
		
		{{{{
		let insane = 'Hello World';
		{let insane = 'Hello World'}
		}}}};  //两个块内，正确


**ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。且函数声明语句的行为类似于let，在块级作用域之外不可引用。**


	function f() { console.log('I am outside!'); }
	(function () {
	  if (false) {
	    // 重复声明一次函数f
	    function f() { console.log('I am inside!'); }
	  }
	
	  f();
	}());
	
	// ES5版本 执行操作
	function f() { console.log('I am outside!'); }
	(function () {
	// --> 执行过程中 f()会被提升到此处
	 
	  if (false) {
		
	  }
	  f();
	}());
	
	// ES6版本  执行操作
	// ES6的浏览器环境
	function f() { console.log('I am outside!'); }
	(function () {
	  var f = undefined;
	  if (false) {
	    function f() { console.log('I am inside!'); }
	  }
	
	  f(); // Uncaught TypeError: f is not a function
	}());

考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。ES6的块级作用域允许声明函数的规则----只在使用大括号的情况下成立，如果没有使用大括号，就会报错。

	// 函数声明语句
	{
	  let a = 'secret';
	  function f() {
	    return a;
	  }
	}
	
	// 函数表达式
	{
	  let a = 'secret';
	  let f = function () {
	    return a;
	  };
	}

**do 表达式**

是为了弥补会计作用域不返回值(除非是全局变量)而生的，在块级作用域之前加上do，使它变为do表达式。如下，变量X会得到整个会计作用域的返回值

	let x = do {
	  let t = f();
	  t * t + 1;
	};

**const命令**

const声明一个只读的常量。一旦声明，常量的值就不能改变。且声明后，必须赋值，否则就会报错，与let命令相似，只在声明所在的会计作用域内有效，且不可重复声明。const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。

	var message = "Hello!";
	let age = 25;
	
	// 以下两行都会报错
	const message = "Goodbye!";
	const age = 30;

对于复合类型的变量，变量名不指向数据，而是指向数据所在的地址。const命令只是保证变量名指向的地址不变，并不保证该地址的数据不变，所以将一个对象声明为常量必须非常小心。
	const foo = {};
	foo.prop = 123;
	
	foo.prop
	// 123
	
	foo = {}; // TypeError: "foo" is read-only

如果真的想将对象冻结，应该使用Object.freeze方法。

	const foo = Object.freeze({});

// 常规模式时，下面一行不起作用； 严格模式时，该行会报错
	foo.prop = 123;

除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。

	var constantize = (obj) => {
	  Object.freeze(obj);
	  Object.keys(obj).forEach( (key, value) => {
	    if ( typeof obj[key] === 'object' ) {
	      constantize( obj[key] );
	    }
	  });
	};

**顶层对象的属性**

顶层对象，在浏览器环境指的是window对象，在Node指的是global对象。ES5之中，顶层对象的属性与全局变量是等价的。

- 浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。
- 浏览器和 Web Worker 里面，self也指向顶层对象，但是Node没有self。
- Node 里面，顶层对象是global，但其他环境都不支持。

##在所有环境拿到global。
让global对象在各种环境都是存在的---》

	// CommonJS的写法
	require('system.global/shim')();
	// ES6模块的写法
	import shim from 'system.global/shim'; shim();
	
	将顶层对象放入变量global中---》
	// CommonJS的写法
	var global = require('system.global')();
	
	// ES6模块的写法
	import getGlobal from 'system.global';
	const global = getGlobal();

#第二章 变量的解构赋值
**解构:**
ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构。属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。ex:


	let [foo, [[bar], baz]] = [1, [[2], 3]];
	foo // 1
	bar // 2
	baz // 3
	
	let [ , , third] = ["foo", "bar", "baz"];
	third // "baz"
	
	let [x, , y] = [1, 2, 3];
	x // 1
	y // 3
	
	let [head, ...tail] = [1, 2, 3, 4];
	head // 1
	tail // [2, 3, 4]

解构不成功，变量的值就等于undefined。

	let [x, y, ...z] = ['a'];
	x // "a"
	y // undefined
	z // []
不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功。

	let [x, y] = [1, 2, 3];
	x // 1
	y // 2
	
	let [a, [b], d] = [1, [2, 3], 4];
	a // 1
	b // 2
	d // 4

以下的表达式都会报错，因为等号右边的值，要么转为对象以后不具备Iterator(迭代)接口（前五个表达式），要么本身就不具备Iterator接口（最后一个表达式）。

	// 报错
	let [foo] = 1;
	let [foo] = false;
	let [foo] = NaN;
	let [foo] = undefined;
	let [foo] = null;
	let [foo] = {};

解构赋值不仅适用于var命令，也适用于let和const命令。

	var [v1, v2, ..., vN ] = array;
	let [v1, v2, ..., vN ] = array;
	const [v1, v2, ..., vN ] = array;

对于Set结构，也可以使用数组的解构赋值。

	let [x, y, z] = new Set(["a", "b", "c"]);

**只要某种数据结构具有Iterator接口，都可以采用数组形式的解构赋值。**

	function* fibs() { 
	  var a = 0;
	  var b = 1;
	  while (true) {
	    yield a;
	    [a, b] = [b, a + b];
	  }
	}
	var [first, second, third, fourth, fifth, sixth] = fibs();
	sixth // 5
上面代码中，fibs是一个Generator函数，原生具有Iterator接口。解构赋值会依次从这个接口获取值。
 //function* 生成器函数，是es6内建的，其作用是迭代，暂停本身的运行，然后恢复并继续执行。每当调用生成器对象的.next()方法时，函数恢复运行直至遇到下一个yield表达式；生成器不是线程。当一个生成器执行时，它与其调用者都处于同一个线程，是按次序执行而不是并行运行。
####解构赋值允许指定默认值。
ES6内部使用严格相等运算符（===），判断一个位置是否有值。所以，如果一个数组成员不严格等于undefined，默认值是不会生效的。

	var [x = 1] = [undefined];
	x // 1
	
	var [x = 1] = [null];
	x // null

	function f() {
	  console.log('aaa');
	}
	
	let [x = f()] = [1];

默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

	let [x = 1, y = x] = [];     // x=1; y=1
	let [x = 1, y = x] = [2];    // x=2; y=2
	let [x = 1, y = x] = [1, 2]; // x=1; y=2
	let [x = y, y = 1] = [];     // ReferenceError

**对象的解构赋值**

	var { foo, bar } = { foo: "aaa", bar: "bbb" };
	foo // "aaa"
	bar // "bbb"

###对象的解构与数组有一个重要的不同:
- 数组的元素是按次序排列的，变量的取值由它的位置决定；
- 对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

		var { bar, foo } = { foo: "aaa", bar: "bbb" };
		foo // "aaa"
		bar // "bbb"
		
		var { baz } = { foo: "aaa", bar: "bbb" };
		baz // undefined

		var { foo: baz } = { foo: 'aaa', bar: 'bbb' };
		baz // "aaa"
		
		let obj = { first: 'hello', last: 'world' };
		let { first: f, last: l } = obj;
		f // 'hello'
		l // 'world'

###对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。

	var { foo: baz } = { foo: "aaa", bar: "bbb" };
	baz // "aaa"
	foo // error: foo is not defined