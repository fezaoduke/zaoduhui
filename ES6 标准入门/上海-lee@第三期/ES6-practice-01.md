自控力不好，所以，常会经历类似“计划赶不上变化”这样的事，大家都懂，废话不说了，看行动啦~~~~

#ES6入门
##概念浏览




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
4.  let声明的变量只在它所在的代码块有效,ex:for(let i=0;i<9;i++){};且在改代码块内不允许  重复生声明同一个变量，不论生命方式为"let"或"var"
5.   let不存在变量提升，用let声明的变量，仅在当前区块内有效，从一开始就形成了封闭作用域，变量一定要在声明后使用。 如果声明在使用之后，则会"ReferenceError"
6.   let存在暂时性死区（temporal dead zone，简称TDZ）-->在代码块内，使用let命令声明变量之前，该变量都是不可用的,若此时对该变量使用typeof，则会报" ReferenceError(引用错误)"
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

	let x = do { //X的值，为整个do块的返回值
	  let t = f();
	  t * t + 1;
	};

**const命令**

const声明一个只读的常量。一旦声明，常量的值就不能改变。且声明后，必须赋值，否则就会报错，与let命令相似，只在声明所在的块级作用域内有效，且不可重复声明。const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。

	var message = "Hello!";
	let age = 25;

	// 以下两行都会报错--不可重复声明
	const message = "Goodbye!";
	const age = 30;

对于复合类型的变量，变量名不指向数据，而是指向数据所在的地址。const命令只是保证变量名指向的地址不变，并不保证该地址的数据不变，所以将一个对象声明为常量必须非常小心。
	const foo = {};
	foo.prop = 123;

	foo.prop
	// 123

	foo = {}; // TypeError: "foo" is read-only

如果真的想将对象冻结（使该对象不可被重写），应该使用Object.freeze方法。

	const foo = Object.freeze({});

// 常规模式时，下面一行不起作用； 严格模式时，该行会报错
	foo.prop = 123;

除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。

**(记住如下写法！！_renderTable()字符串模板拼接+组件化追加html标签)**


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

**组件中this到me的对应传递**

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
**字符串的解构赋值**
将字符串当做数组对象，因此可以按照数组的操作赋值，切也具备数组的length属性

	let {length : len} = 'hello';
	len // 5

**数值和布尔值的解构赋值**
数值和布尔值的包装对象都有toString属性，解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。

	let {toString: s} = 123;
	s === Number.prototype.toString // true

	let {toString: s} = true;
	s === Boolean.prototype.toString // true

> 解构赋值的规则是，只要等号右边的值不是对象，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错

**函数参数的解构赋值**

函数add的参数表面上是一个数组，但在传入参数的那一刻，数组参数就被解构成变量x和y。对于函数内部的代码来说，它们能感受到的参数就是x和y。

	function add([x, y]){
	  return x + y;
	}
	add([1, 2]); // 3

	[[1, 2], [3, 4]].map(([a, b]) => a + b); // [ 3, 7 ]

	function move({x = 0, y = 0} = {}) {      //move的参数是对象，为变量XY指定默认值
	  return [x, y];
	}
	move({x: 3, y: 8}); // [3, 8]
	move({x: 3}); // [3, 0]
	move({}); // [0, 0]
	move(); // [0, 0]

	function move({x, y} = { x: 0, y: 0 }) {     //为move参数指定默认值
	  return [x, y];
	}
	move({x: 3, y: 8}); // [3, 8]
	move({x: 3}); // [3, undefined]
	move({}); // [undefined, undefined]
	move(); // [0, 0]          //undefined就会触发函数参数的默认值。

	[1, undefined, 3].map((x = 'yes') => x); //箭头函数。。。
	// [ 1, 'yes', 3 ]

**圆括号问题**

解构赋值虽然很方便，但是解析起来并不容易。对于编译器来说，一个式子到底是模式，还是表达式，没有办法从一开始就知道，必须解析到（或解析不到）等号才能知道。模式中若出现 *圆括号* ，则可能导致结构的歧义。目前能做的，就是不要再模式中放置圆括号。。

**不能使用圆括号的情况**

- 变量声明语句中，不能带有圆括号
	 // 全部报错
	var [(a)] = [1];

	var {x: (c)} = {};
	var ({x: c}) = {};
	var {(x: c)} = {};
	var {(x): c} = {};

	var { o: ({ p: p }) } = { o: { p: 2 } };

- 函数参数中，模式不能带有圆括号

	function f([(z)]) { return z; } // 报错

- 赋值语句中，不能将整个模式，或嵌套模式中的一层，放在圆括号之中

	({ p: a }) = { p: 42 };//  整个模式放置 --》全部报错
	([a]) = [5];

	[({ p: a }), { x: c }] = [{}, {}]; // 嵌套模式 --》 报错

**可以使用圆括号的情况** --> 赋值语句的非模式部分，可以使用圆括号 (赋值语句,赋值语句,赋值语句!!！ 不是声明语句！！！)

	[(b)] = [3]; // 正确
	({ p: (d) } = {}); // 正确
	[(parseInt.prop)] = [3]; // 正确
> *上面三行语句都可以正确执行，因为首先它们都是赋值语句，而不是声明语句；其次它们的圆括号都不属于模式的一部分。第一行语句中，模式是取数组的第一个成员，跟圆括号无关；
> 二行语句中，模式是p，而不是d；
> 行语句与第一行语句的性质一致。*

**变量的解构赋值用途**

1.  交换变量的值
2.  从函数返回多个值
3.  函数参数的定义
4.  提取JSON数据
5.  函数参数的默认值
6.  遍历Map结构
7.  输入模块的指定方法

		// 返回一个数组

		function example() {
		  return [1, 2, 3];
		}
		var [a, b, c] = example();

		// 返回一个对象

		function example() {
		  return {
		    foo: 1,
		    bar: 2
		  };
		}
		var { foo, bar } = example();

		// 参数是一组有次序的值
		function f([x, y, z]) { ... }
		f([1, 2, 3]);

		// 参数是一组无次序的值
		function f({x, y, z}) { ... }
		f({z: 3, y: 2, x: 1});
		var jsonData = {
		  id: 42,
		  status: "OK",
		  data: [867, 5309]
		};

		let { id, status, data: number } = jsonData;

		console.log(id, status, number);
		// 42, "OK", [867, 5309]

		jQuery.ajax = function (url, {
		  async = true,
		  beforeSend = function () {},
		  cache = true,
		  complete = function () {},
		  crossDomain = false,
		  global = true,
		  // ... more config
		}) {
		  // ... do stuff
		};     //指定参数的默认值，就避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句。

		var map = new Map();
		map.set('first', 'hello');
		map.set('second', 'world');

		for (let [key, value] of map) {
		  console.log(key + " is " + value);
		}
		// first is hello
		// second is world
		// 获取键名
		for (let [key] of map) {
		  // ...
		}

		// 获取键值
		for (let [,value] of map) {
		  // ...
		}
		const { SourceMapConsumer, SourceNode } = require("source-map");

#第三章字符串的扩展

1. 字符的Unicode表示法 
 	JavaScript允许采用\uxxxx形式表示一个字符，其中“xxxx”表示字符的码点。如果直接在\u后面跟上超过0xFFFF的数值（比如\u20BB7），JavaScript会理解成\u20BB+7。由于\u20BB是一个不可打印字符，所以只会显示一个空格，后面跟着一个7。ES6 对这一点做出了改进，**只要将码点放入大括号**，就能正确解读该字符。大括号表示法与四字节的UTF-16编码是等价的。
		
		"\uD842\uDFB7"
		// "𠮷"
		
		"\u20BB7"
		// " 7"

		"\u{41}\u{42}\u{43}"
		// "ABC"
		
		let hello = 123;
		hell\u{6F} // 123
		
		'\u{1F680}' === '\uD83D\uDE80'   // true
		
		JavaScript共有6种方法可以表示一个字符。
		
		'\z' === 'z'  // true
		'\172' === 'z' // true
		'\x7A' === 'z' // true
		'\u007A' === 'z' // true
		'\u{7A}' === 'z' // true

2. codePointAt() --> 能够正确处理4个字节储存的字符，返回一个字符的码点。对于那些两个字节储存的常规字符，它的返回结果与charCodeAt方法相同。 codePointAt方法返回的是码点的十进制值，如果想要十六进制的值，可以使用toString方法转换一下。

	字符以UTF-16的格式储存，每个字符固定为2个字节。对于那些需要4个字节储存的字符（Unicode码点大于0xFFFF的字符），JavaScript会认为它们是两个字符。
3. String.fromCodePoint() -- > 用于从码点返回对应字符，但是这个方法不能识别32位的UTF-16字符（Unicode编号大于0xFFFF）。在作用上，正好与codePointAt方法相反。
 **注意，fromCodePoint方法定义在String对象上，而codePointAt方法定义在字符串的实例对象上。**

4. 字符串的遍历器接口 --> ES6为字符串添加了遍历器接口（详见《Iterator》一章），使得字符串可以被for...of循环遍历。

		for (let codePoint of 'foo') {    //foreach(var a in aList){}
		  console.log(codePoint)
		}
		// "f"
		// "o"
		// "o"
除了遍历字符串，这个遍历器最大的优点是可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点。

		var text = String.fromCodePoint(0x20BB7);
		
		for (let i = 0; i < text.length; i++) {
		  console.log(text[i]);
		}
		// " "
		// " "
		
		for (let i of text) {
		  console.log(i);
		}
		// "𠮷"
上面代码中，字符串text只有一个字符，但是for循环会认为它包含两个字符（都不可打印），而for...of循环会正确识别出这一个字符。
5. at() --> 此方法通过垫片库实现。可以识别Unicode编号大于0xFFFF的字符，返回正确的字符。

		'abc'.at(0) // "a"
		'𠮷'.at(0) // "𠮷"


6. normalize() --> 用来将字符的不同表示方法统一为同样的形式，这称为Unicode正规化。

	*许多欧洲语言有语调符号和重音符号。为了表示它们，Unicode提供了两种方法。一种是直接提供带重音符号的字符，比如Ǒ（\u01D1）。另一种是提供合成符号（combining character），即原字符与重音符号的合成，两个字符合成一个字符，比如O（\u004F）和ˇ（\u030C）合成Ǒ（\u004F\u030C）。这两种表示方法，在视觉和语义上都等价，但是JavaScript不能识别。*

7. includes(), startsWith(), endsWith()  --> 用来确定一个字符串是否包含在另一个字符串中
	- includes()：返回布尔值，表示是否找到了参数字符串。
	- startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。
	- endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。
	
	*以上是哪个方法均包含第二个参数。使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。*
	
8. repeat(n) --> 方法返回一个新字符串，表示将原字符串重复n次。
	* 参数如果是小数，会被取整。
	* 参数是负数或者Infinity，会报错。
	* 如果参数是0到-1之间的小数，则等同于0，这是因为会先进行取整运算。0到-1之间的小数，取整以后等  	于-0，repeat视同为0。
	* 参数NaN等同于0。
	* 参数是字符串，则会先转换成数字。

9. padStart()，padEnd() --> ES7推出了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart用于头部补全，padEnd用于尾部补全。

	* padStart和padEnd一共接受两个参数，第一个参数用来指定字符串的最小长度，第二个参数是用来补全的字符串
	* 如果原字符串的长度，等于或大于指定的最小长度，则返回原字符串。
	* 如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截去超出位数的补全字符串。
	* 如果省略第二个参数，则会用空格补全长度。
	* padStart的常见用途是为数值补全指定位数。
	* 另一个用途是提示字符串格式。
	
10. 模板字符串(template string) --> 是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。 如果在模板字符串中需要使用反引号，则前面要用反斜杠转义。  *类似jTemplate的使用*

		// 字符串中嵌入变量
		var name = "Bob", time = "today";
		`Hello ${name}, how are you ${time}?`
	* 使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中
	* 如果不想要这个换行，可以使用trim方法消除它
	* 模板字符串中嵌入变量，需要将变量名写在${}之中
	* 大括号内部可以放入任意的JavaScript表达式，可以进行运算，以及引用对象属性。
	* 模板字符串之中还能调用函数。
	
			function fn() {
			  return "Hello World";
			}
			
			`foo ${fn()} bar`
			// foo Hello World bar
	
	* 如果大括号中的值不是字符串，将按照一般的规则转为字符串。比如，大括号中是一个对象，将默认调用对象的toString方法。
	* 如果模板字符串中的变量没有声明，将报错。
	* 由于模板字符串的大括号内部，就是执行JavaScript代码，因此如果大括号内部是一个字符串，将会原样输出。
	* 模板字符串甚至还能嵌套。
	
			const tmpl = addrs => `
			  <table>
			  ${addrs.map(addr => `
			    <tr><td>${addr.first}</td></tr>
			    <tr><td>${addr.last}</td></tr>
			  `).join('')}
			  </table>
			`;
			// 使用方法如下：
			const data = [
			    { first: '<Jane>', last: 'Bond' },
			    { first: 'Lars', last: '<Croft>' },
			];
			
			console.log(tmpl(data));
			// <table>
			//
			//   <tr><td><Jane></td></tr>
			//   <tr><td>Bond</td></tr>
			//
			//   <tr><td>Lars</td></tr>
			//   <tr><td><Croft></td></tr>
			//
			// </table>

	* 如果需要引用模板字符串本身，在需要时执行，可以像下面这样写
	
			// 写法一
			let str = 'return ' + '`Hello ${name}!`';
			let func = new Function('name', str);
			func('Jack') // "Hello Jack!"
			
			// 写法二
			let str = '(name) => `Hello ${name}!`';
			let func = eval.call(null, str);
			func('Jack') // "Hello Jack!"

11. 实例：模板编译 --> 该模板使用<%...%>放置JavaScript代码，使用<%= ... %>输出JavaScript表达式。
12. 标签模板 --> 模板字符串可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串
	* 标签模板其实不是模板，而是函数调用的一种特殊形式。“标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。
	* 如果模板字符里面有变量，就不是简单的调用了，而是会将模板字符串先处理成多个参数，再调用函数。
	
			var a = 5;
			var b = 10;
			
			tag`Hello ${ a + b } world ${ a * b }`;
			// 等同于
			tag(['Hello ', ' world ', ''], 15, 50);

		模板字符串前面有一个标识名tag，它是一个函数。整个表达式的返回值，就是tag函数处理模板字符串后的返回值。
		
		函数tag依次会接收到多个参数
		
	**passthru函数采用rest参数的写法如下**

		//将各个参数按照原来的位置拼合回去
		var total = 30;
		var msg = passthru`The total is ${total} (${total*1.05} with tax)`;
		
		function passthru(literals) {
		  var result = '';
		  var i = 0;
		
		  while (i < literals.length) {
		    result += literals[i++];
		    if (i < arguments.length) {
		      result += arguments[i];
		    }
		  }
		
		  return result;
		}
		
		msg // "The total is 30 (31.5 with tax)"

	
	**“标签模板”的一个重要应用，就是过滤HTML字符串，防止用户输入恶意内容**

		var message =
		  SaferHTML`<p>${sender} has sent you a message.</p>`;
		
		function SaferHTML(templateData) {
		  var s = templateData[0];
		  for (var i = 1; i < arguments.length; i++) {
		    var arg = String(arguments[i]);
		
		    // Escape special characters in the substitution.
		    s += arg.replace(/&/g, "&amp;")
		            .replace(/</g, "&lt;")
		            .replace(/>/g, "&gt;");
		
		    // Don't escape special characters in the template.
		    s += templateData[i];
		  }
		  return s;
		}


	> *上面代码中，sender变量往往是用户提供的，经过SaferHTML函数处理，里面的特殊字符都会被转义。*
	
	> **标签模板的另一个应用，就是多语言转换（国际化处理），还可以使用标签模板，在JavaScript语言之中嵌入其他语言**


13. String.raw() --> 方法，往往用来充当模板字符串的处理函数，返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，对应于替换变量后的模板字符串。如果原字符串的斜杠已经转义，那么String.raw不会做任何处理

		String.raw`Hi\n${2+3}!`;
		// "Hi\\n5!"
		
		String.raw`Hi\u000A!`;
		// 'Hi\\u000A!'


	String.raw方法也可以作为正常的函数使用。这时，它的第一个参数，应该是一个具有raw属性的对象，且raw属性的值应该是一个数组。


		String.raw({ raw: 'test' }, 0, 1, 2);
		// 't0e1s2t'
		
		// 等同于
		String.raw({ raw: ['t','e','s','t'] }, 0, 1, 2);

14. 模板字符串的限制-->前面提到标签模板里面，可以内嵌其他语言。但是，模板字符串默认会将字符串转义，因此导致了无法嵌入其他语言。

 	 模板字符串会将\u00FF和\u{42}当作Unicode字符进行转义，所以\unicode解析时报错；而\x56会被当作十六进制字符串转义，所以\xerxes会报错。

	如果遇到不合法的字符串转义，就返回undefined，而不是报错，并且从raw属性上面可以得到原始字符串。

		function tag(strs) {
		  strs[0] === undefined
		  strs.raw[0] === "\\unicode and \\u{55}";
		}
		tag`\unicode and \u{55}`

	> 模板字符串原本是应该报错的，但是由于放松了对字符串转义的限制，所以不报错了，JavaScript引擎将第一个字符设置为undefined，但是raw属性依然可以得到原始字符串，因此tag函数还是可以对原字符串进行处理。
	> 	
	注意，这种对字符串转义的放松，只在标签模板解析字符串时生效，不是标签模板的场合，依然会报错。


#第五章 正则的扩展

#第六章 数值的扩展

#第七章 数组的扩展

#第八章 函数的扩展


**基本用法 **
先判断一下参数y是否被赋值，如果没有，再等于默认值。ES6允许为函数的参数设置默认值，即直接写在参数定义的后面。
function log(x, y = 'World') {
  console.log(x, y);
}
> 优点：

> 1. 阅读代码的人，可以立刻意识到哪些参数是可以省略的，不用查看函数体或文档；
> 2. 有利于将来的代码优化，即使未来的版本在对外接口中，彻底拿掉这个参数，也不会导致以前的代码无法运行



**参数变量是默认声明的，所以不能用let或const再次声明。**

	function foo(x = 5) {
	  let x = 1; // error
	  const x = 2; // error
	}

*  参数默认值可以与解构赋值的默认值，结合起来使用。
	
		//--上面代码使用了对象的解构赋值默认值，而没有使用函数参数的默认值。只有当函数foo的参数是一个对象时，变量x和y才会通过解构
		//--赋值而生成。如果函数foo调用时参数不是对象，变量x和y就不会生成，从而报错。如果参数对象没有y属性，y的默认值5才会生效。
		function foo({x, y = 5}) {
		  console.log(x, y);
		}
		
		foo({}) // undefined, 5
		foo({x: 1}) // 1, 5
		foo({x: 1, y: 2}) // 1, 2
		foo() // TypeError: Cannot read property 'x' of undefined

		function fetch(url, { method = 'GET' } = {}) {
		  console.log(method);
		}
		
		fetch('http://example.com')
		// "GET"


**下面两种写法都对函数的参数设定了默认值，区别是写法一函数参数的默认值是空对象，但是设置了对象解构赋值的默认值；写法二函数参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值。**

	// 写法一
	function m1({x = 0, y = 0} = {}) {
	  return [x, y];
	}
	
	// 写法二
	function m2({x, y} = { x: 0, y: 0 }) {
	  return [x, y];
	}

	// 函数没有参数的情况
	m1() // [0, 0]
	m2() // [0, 0]
	
	// x和y都有值的情况
	m1({x: 3, y: 8}) // [3, 8]
	m2({x: 3, y: 8}) // [3, 8]
	
	// x有值，y无值的情况
	m1({x: 3}) // [3, 0]
	m2({x: 3}) // [3, undefined]
	
	// x和y都无值的情况
	m1({}) // [0, 0];
	m2({}) // [undefined, undefined]
	
	m1({z: 3}) // [0, 0]
	m2({z: 3}) // [undefined, undefined]

 * 参数默认值的位置 --> 通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，到底省略了哪些参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的。如果传入undefined，将触发该参数等于默认值，null则没有这个效果。

	// 例一
	function f(x = 1, y) {
	  return [x, y];
	}
	
	f() // [1, undefined]
	f(2) // [2, undefined])
	f(, 1) // 报错
	f(undefined, 1) // [1, 1]
	
	// 例二
	function f(x, y = 5, z) {
	  return [x, y, z];
	}
	
	f() // [undefined, 5, undefined]
	f(1) // [1, 5, undefined]
	f(1, ,2) // 报错
	f(1, undefined, 2) // [1, 5, 2]

* 函数的length属性 --> 指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，预期传入的参数个数就不包括这个参数了,length属性将失真。同理，rest参数也不会计入length属性。如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了。

		(function (a) {}).length // 1
		(function (a = 5) {}).length // 0
		(function (a, b, c = 5) {}).length // 2
		(function(...args) {}).length // 0
		(function (a = 0, b, c) {}).length // 0
		(function (a, b = 1, c) {}).length // 1

* 作用域 --> 一个需要注意的地方是，如果参数默认值是一个变量，则该变量所处的作用域，与其他变量的作用域规则是一样的，即先是当前函数的作用域，然后才是全局作用域。

		var x = 1;
		
		function f(x, y = x) {
		  console.log(y);
		}
		
		f(2) // 2

	上面代码中，参数y的默认值等于x。调用时，由于函数作用域内部的变量x已经生成，所以y等于参数x，而不是全局变量x。
	如果调用时，函数作用域内部的变量x没有生成，结果就会不一样。
	
		
	let x = 1;
	
	function f(y = x) {
	let x = 2;
	console.log(y);
	}
	
	f() // 1

如果参数的默认值是一个函数，该函数的作用域是其声明时所在的作用域。函数bar的参数func的默认值是一个匿名函数，返回值为变量foo。这个匿名函数声明时，bar函数的作用域还没有形成，所以匿名函数里面的foo指向外层作用域的foo，输出outer。

	let foo = 'outer';
	
	function bar(func = x => foo) {
	  let foo = 'inner';
	  console.log(func()); // outer
	}
	
	bar();

匿名函数里面的foo指向函数外层，但是函数外层并没有声明foo

	function bar(func = () => foo) {
	  let foo = 'inner';
	  console.log(func());
	}
	
	bar() // ReferenceError: foo is not defined

下面是一个更复杂的例子。

	var x = 1;
	function foo(x, y = function() { x = 2; }) {
	  var x = 3;
	  y();
	  console.log(x);
	}
	
	foo() // 3

上面代码中，函数foo的参数y的默认值是一个匿名函数。函数foo调用时，它的参数x的值为undefined，所以y函数内部的x一开始是undefined，后来被重新赋值2。但是，函数foo内部重新声明了一个x，值为3，这两个x是不一样的，互相不产生影响，因此最后输出3。

如果将var x = 3的var去除，两个x就是一样的，最后输出的就是2。

	var x = 1;
	function foo(x, y = function() { x = 2; }) {
	  x = 3;
	  y();
	  console.log(x);
	}
	
	foo() // 2

**参数默认值的应用**  --》 利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误。

	function throwIfMissing() {
	  throw new Error('Missing parameter');
	}
	
	function foo(mustBeProvided = throwIfMissing()) {
	  return mustBeProvided;
	}
	
	foo()
	// Error: Missing parameter

上面代码的foo函数，如果调用的时候没有参数，就会调用默认值throwIfMissing函数，从而抛出一个错误。

从上面代码还可以看到，参数mustBeProvided的默认值等于throwIfMissing函数的运行结果（即函数名之后有一对圆括号），这表明参数的默认值不是在定义时执行，而是在运行时执行（即如果参数已经赋值，默认值中的函数就不会运行），这与python语言不一样。

另外，可以将参数默认值设为undefined，表明这个参数是可以省略的。
function foo(optional = undefined) { ··· }

**reset参数** --> 

（形式为“...变量名”），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中。函数的length属性，不包括rest参数。

	function add(...values) {
	  let sum = 0;
	
	  for (var val of values) {
	    sum += val;
	  }
	
	  return sum;
	}
	
	add(2, 5, 3) // 10

上面代码的add函数是一个求和函数，利用rest参数，可以向该函数传入任意数目的参数。

	// arguments变量的写法
	function sortNumbers() {
	  return Array.prototype.slice.call(arguments).sort();
	}
	
	// rest参数的写法
	const sortNumbers = (...numbers) => numbers.sort();

rest参数中的变量代表一个数组，所以数组特有的方法都可以用于这个变量。下面是一个利用rest参数改写数组push方法的例子。

	function push(array, ...items) {
	  items.forEach(function(item) {
	    array.push(item);
	    console.log(item);
	  });
	}
	
	var a = [];
	push(a, 1, 2, 3)

**注意**，rest参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。

	// 报错
	function f(a, ...b, c) {
	  // ...
	}

	(function(a) {}).length  // 1
	(function(...a) {}).length  // 0
	(function(a, ...b) {}).length  // 1


**扩展运算符** --> （spread）是三个点（...）。它好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列。
 
	console.log(...[1, 2, 3])
	// 1 2 3
	
	console.log(1, ...[2, 3, 4], 5)
	// 1 2 3 4 5
	
	[...document.querySelectorAll('div')]
	// [<div>, <div>, <div>]

该运算符主要用于函数调用

	function push(array, ...items) {
	  array.push(...items);
	}
	
	function add(x, y) {
	  return x + y;
	}
	
	var numbers = [4, 38];
	add(...numbers) // 42

array.push(...items)和add(...numbers)这两行，都是函数的调用，它们的都使用了扩展运算符。该运算符将一个数组，变为参数序列。

扩展运算符与正常的函数参数可以结合使用，非常灵活。

	function f(v, w, x, y, z) { }
	var args = [0, 1];
	f(-1, ...args, 2, ...[3]);


**替代数组的apply方法 ** -->由于扩展运算符可以展开数组，所以不再需要apply方法，将数组转为函数的参数了。
	
	// ES5的写法
	function f(x, y, z) {
	  // ...
	}
	var args = [0, 1, 2];
	f.apply(null, args);
	
	// ES6的写法
	function f(x, y, z) {
	  // ...
	}
	var args = [0, 1, 2];
	f(...args);

扩展运算符取代apply方法的一个实际的例子，应用Math.max方法，简化求出一个数组最大元素的写法。

	// ES5的写法
	Math.max.apply(null, [14, 3, 77])
	
	// ES6的写法
	Math.max(...[14, 3, 77])
	
	// 等同于
	Math.max(14, 3, 77);

上面代码表示，由于JavaScript不提供求数组最大元素的函数，所以只能套用Math.max函数，将数组转为一个参数序列，然后求最大值。有了扩展运算符以后，就可以直接用Math.max了。

另一个例子是通过push函数，将一个数组添加到另一个数组的尾部。

	// ES5的写法
	var arr1 = [0, 1, 2];
	var arr2 = [3, 4, 5];
	Array.prototype.push.apply(arr1, arr2);
	
	// ES6的写法
	var arr1 = [0, 1, 2];
	var arr2 = [3, 4, 5];
	arr1.push(...arr2);

上面代码的ES5写法中，push方法的参数不能是数组，所以只好通过apply方法变通使用push方法。有了扩展运算符，就可以直接将数组传入push方法。

**扩展运算符的应用**

1. 扩展运算符提供了数组合并的新写法
2. 与解构赋值结合--如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错
3. 函数的返回值--JavaScript的函数只能返回一个值，如果需要返回多个值，只能返回数组或对象。扩展运算符提供了解决这个问题的一种变通方法
4. 字符串--扩展运算符还可以将字符串转为真正的数组。JavaScript会将32位Unicode字符，识别为2个字符，采用扩展运算符就没有这个问题

	function length(str) {
	  return [...str].length;
	}

5. 实现了Iterator接口的对象--任何Iterator接口的对象，都可以用扩展运算符转为真正的数组
	 
		var nodeList = document.querySelectorAll('div');
		var array = [...nodeList];

	上面代码中，querySelectorAll方法返回的是一个nodeList对象。它不是数组，而是一个类似数组的对象。这时，扩展运算符可以将其转为真正的数组，原因就在于NodeList对象实现了Iterator接口。

6. Map和Set结构，Generator函数--扩展运算符内部调用的是数据结构的Iterator接口，因此只要具有Iterator接口的对象，都可以使用扩展运算符，比如Map结构

		let map = new Map([
		  [1, 'one'],
		  [2, 'two'],
		  [3, 'three'],
		]);

		let arr = [...map.keys()]; // [1, 2, 3]
Generator函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。
		
		var go = function*(){
		  yield 1;
		  yield 2;
		  yield 3;
		};

	[...go()] // [1, 2, 3]
上面代码中，变量go是一个Generator函数，执行后返回的是一个遍历器对象，对这个遍历器对象执行扩展运算符，就会将内部遍历得到的值，转为一个数组。

如果对没有iterator接口的对象，使用扩展运算符，将会报错。

var obj = {a: 1, b: 2};
let arr = [...obj]; // TypeError: Cannot spread non-iterable object



**严格模式** 
从ES5开始，函数内部可以设定为严格模式。

	function doSomething(a, b) {
	  'use strict';
	  // code
	}

《ECMAScript 2016标准》做了一点修改，规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。

	
	function doSomething(a, b = a) {  // 报错
	  'use strict';
	  // code
	}
	
	const doSomething = function ({a, b}) {  // 报错
	  'use strict';
	  // code
	};
	
	const doSomething = (...a) => {  // 报错
	  'use strict';
	  // code
	};
	
	const obj = {
	  doSomething({a, b}) {  // 报错
	    'use strict';
	    // code
	  }
	};

这样规定的原因是，函数内部的严格模式，同时适用于函数体代码和函数参数代码。但是，函数执行的时候，先执行函数参数代码，然后再执行函数体代码。这样就有一个不合理的地方，只有从函数体代码之中，才能知道参数代码是否应该以严格模式执行，但是参数代码却应该先于函数体代码执行。

	// 报错
	function doSomething(value = 070) {
	  'use strict';
	  return value;
	}
上面代码中，参数value的默认值是八进制数070，但是严格模式下不能用前缀0表示八进制，所以应该报错。但是实际上，JavaScript引擎会先成功执行value = 070，然后进入函数体内部，发现需要用严格模式执行，这时才会报错。

虽然可以先解析函数体代码，再执行参数代码，但是这样无疑就增加了复杂性。因此，标准索性禁止了这种用法，只要参数使用了默认值、解构赋值、或者扩展运算符，就不能显式指定严格模式。

两种方法可以规避这种限制。第一种是设定全局性的严格模式，这是合法的。
	
	'use strict';
	
	function doSomething(a, b = a) {
	  // code
	}
第二种是把函数包在一个无参数的立即执行函数里面。

	const doSomething = (function () {
	  'use strict';
	  return function(value = 42) {
	    return value;
	  };
	}());

**name属性** --> 返回函数的名称 

ES6对这个属性的行为做出了一些修改。如果将一个匿名函数赋值给一个变量，ES5的name属性，会返回空字符串，而ES6的name属性会返回实际的函数名。

	var func1 = function () {};
	
	// ES5
	func1.name // ""
	
	// ES6
	func1.name // "func1"

如果将一个具名函数赋值给一个变量，则ES5和ES6的name属性都返回这个具名函数原本的名字。

	const bar = function baz() {};
	
	// ES5
	bar.name // "baz"
	
	// ES6
	bar.name // "baz"

Function构造函数返回的函数实例，name属性的值为“anonymous”。

	(new Function).name // "anonymous"

bind返回的函数，name属性值会加上“bound ”前缀。

	function foo() {};
	foo.bind({}).name // "bound foo"
	
	(function(){}).bind({}).name // "bound "

##箭头函数    !!!      -->   ES6允许使用“箭头”（=>）定义函数。 
**"参数" => "返回值"**

	var f = v => v;
上面的箭头函数等同于：

	var f = function(v) {
	  return v;
	};

如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。

	var f = () => 5;
	// 等同于
	var f = function () { return 5 };
	
	var sum = (num1, num2) => num1 + num2;
	// 等同于
	var sum = function(num1, num2) {
	  return num1 + num2;
	};

如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。

	var sum = (num1, num2) => { return num1 + num2; }

由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号。

	var getTempItem = id => ({ id: id, name: "Temp" });

箭头函数可以与变量解构结合使用。

	const full = ({ first, last }) => first + ' ' + last;
	
	// 等同于
	function full(person) {
	  return person.first + ' ' + person.last;
	}

箭头函数使得表达更加简洁。

	const isEven = n => n % 2 == 0;
	const square = n => n * n;

箭头函数的一个用处是简化回调函数。

	// 正常函数写法
	[1,2,3].map(function (x) {
	  return x * x;
	});
	
	// 箭头函数写法
	[1,2,3].map(x => x * x);

另一个例子是

	// 正常函数写法
	var result = values.sort(function (a, b) {
	  return a - b;
	});
	
	// 箭头函数写法
	var result = values.sort((a, b) => a - b);

下面是rest参数与箭头函数结合的例子。

	const numbers = (...nums) => nums;
	
	numbers(1, 2, 3, 4, 5)
	// [1,2,3,4,5]
	
	const headAndTail = (head, ...tail) => [head, tail];
	
	headAndTail(1, 2, 3, 4, 5)
	// [1,[2,3,4,5]]

**箭头函数使用注意事项**

> 1.函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。 **this对象的指向是固定的**
> 
> 2.不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
> 
> 3.不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替。
> 
> 4.不可以使用yield命令，因此箭头函数不能用作Generator函数。


		function Timer() {
		  this.s1 = 0;
		  this.s2 = 0;
		  // 箭头函数
		  setInterval(() => this.s1++, 1000);
		  // 普通函数
		  setInterval(function () {
		    this.s2++;
		  }, 1000);
		}
		
		var timer = new Timer();
		
		setTimeout(() => console.log('s1: ', timer.s1), 3100);
		setTimeout(() => console.log('s2: ', timer.s2), 3100);
		// s1: 3
		// s2: 0


上面代码中，Timer函数内部设置了两个定时器，分别使用了箭头函数和普通函数。前者的this绑定定义时所在的作用域（即Timer函数），后者的this指向运行时所在的作用域（即全局对象）。所以，3100毫秒之后，timer.s1被更新了3次，而timer.s2一次都没更新。


箭头函数转成ES5的代码如下。

	// ES6
	function foo() {
	  setTimeout(() => {
	    console.log('id:', this.id);
	  }, 100);
	}
	
	// ES5
	function foo() {
	  var _this = this;
	
	  setTimeout(function () {
	    console.log('id:', _this.id);
	  }, 100);
	}

除了this，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：arguments、super、new.target。

	function foo() {
	  setTimeout(() => {
	    console.log('args:', arguments);
	  }, 100);
	}
	
	foo(2, 4, 6, 8)
	// args: [2, 4, 6, 8]

上面代码中，箭头函数内部的变量arguments，其实是函数foo的arguments变量。

另外，由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向。

		(function() {
		  return [
		    (() => this.x).bind({ x: 'inner' })()
		  ];
		}).call({ x: 'outer' });
		// ['outer']

上面代码中，箭头函数没有自己的this，所以bind方法无效，内部的this指向外部的this。

**嵌套的箭头函数** --> 箭头函数内部，还可以再使用箭头函数

	function insert(value) {
	  return {into: function (array) {
	    return {after: function (afterValue) {
	      array.splice(array.indexOf(afterValue) + 1, 0, value);
	      return array;
	    }};
	  }};
	}
	
	insert(2).into([1, 3]).after(1); //[1, 2, 3]

上面这个函数，可以使用箭头函数改写。

	let insert = (value) => ({into: (array) => ({after: (afterValue) => {
	  array.splice(array.indexOf(afterValue) + 1, 0, value);
	  return array;
	}})});
	
	insert(2).into([1, 3]).after(1); //[1, 2, 3]

下面是一个部署**管道机制（pipeline）**的例子，即前一个函数的输出是后一个函数的输入。

	const pipeline = (...funcs) =>
	  val => funcs.reduce((a, b) => b(a), val);
	
	const plus1 = a => a + 1;
	const mult2 = a => a * 2;
	const addThenMult = pipeline(plus1, mult2);
	
	addThenMult(5)
	// 12

如果觉得上面的写法可读性比较差，也可以采用下面的写法。

	const plus1 = a => a + 1;
	const mult2 = a => a * 2;
	
	mult2(plus1(5))
	// 12

箭头函数还有一个功能，就是可以很方便地改写λ演算。

	// λ演算的写法
	fix = λf.(λx.f(λv.x(x)(v)))(λx.f(λv.x(x)(v)))
	
	// ES6的写法
	var fix = f => (x => f(v => x(x)(v)))
	               (x => f(v => x(x)(v)));


**绑定 this** --> 
> 箭头函数可以绑定this对象，大大减少了显式绑定this对象的写法（call、apply、bind）。但是，箭头函数并不适用于所有场合，所以ES7提出了“函数绑定”（function bind）运算符，用来取代call、apply、bind调用。虽然该语法还是ES7的一个提案，但是Babel转码器已经支持。

> 函数绑定运算符是并排的两个双冒号（::），双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面。

	 foo::bar;
	// 等同于
	bar.bind(foo);
	
	foo::bar(...arguments);
	// 等同于
	bar.apply(foo, arguments);
	
	const hasOwnProperty = Object.prototype.hasOwnProperty;
	function hasOwn(obj, key) {
	  return obj::hasOwnProperty(key);
	}

如果双冒号左边为空，右边是一个对象的方法，则等于将该方法绑定在该对象上面。

	var method = obj::obj.foo;
	// 等同于
	var method = ::obj.foo;
	
	let log = ::console.log;
	// 等同于
	var log = console.log.bind(console);

由于双冒号运算符返回的还是原对象，因此可以采用链式写法。

	// 例一
	import { map, takeWhile, forEach } from "iterlib";
	
	getPlayers()
	::map(x => x.character())
	::takeWhile(x => x.strength > 100)
	::forEach(x => console.log(x));
	
	// 例二
	let { find, html } = jake;
	
	document.querySelectorAll("div.myClass")
	::find("p")
	::html("hahaha");

**尾调用？** --> 
尾调用（Tail Call）是函数式编程的一个重要概念，本身非常简单，一句话就能说清楚，就是指某个函数的最后一步是调用另一个函数。

	function f(x){
	  return g(x);
	}

函数调用会在内存形成一个“调用记录”，又称“调用帧”（call frame），保存调用位置和内部变量等信息。“尾调用优化”（Tail call optimization）-->只保留内层函数的调用帧.

**尾递归**-->
函数调用自身，称为递归。如果尾调用自身，就称为尾递归。

	function factorial(n) { //递归
	  if (n === 1) return 1;
	  return n * factorial(n - 1);
	}
	
	factorial(5) // 120

	function factorial(n, total) {  //尾递归
	  if (n === 1) return total;
	  return factorial(n - 1, n * total);
	}
	
	factorial(5, 1) // 120

**递归函数的改写**
尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。做到这一点的方法，就是把所有用到的内部变量改写成函数的参数。

**柯里化（ currying）**--> 意思是将多参数的函数转换成单参数的形式。这里也可以使用柯里化。

**严格模式**
ES6的尾调用优化只在严格模式下开启，正常模式是无效的。

**函数参数的尾逗号**
如果以后修改代码，想为函数添加第n+1参数，就势必要在第n个参数后面添加一个逗号。这对版本管理系统来说，就会显示，添加逗号的那一行也发生了变动。这看上去有点冗余，因此新的语法允许定义和调用时，尾部直接有一个逗号。