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