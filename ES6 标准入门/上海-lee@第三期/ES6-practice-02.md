#Set和Map数据结构

**Set** --> 

 * 类似于数组，但是成员的值都是唯一的，没有重复的值。
 * Set本身是一个构造函数，用来生成Set数据结构。
 * Set函数可以接受一个数组（或类似数组的对象）作为参数，用来初始化。

		function divs () {
		  return [...document.querySelectorAll('div')];
		}
		
		var set = new Set(divs());
		set.size // 56
		
		// 类似于
		divs().forEach(div => set.add(div));
		set.size // 56

* 向Set加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。Set内部判断两个值是否不同，使用的算法叫做“Same-value equality”，它类似于精确相等运算符（===），主要的区别是NaN等于自身，而精确相等运算符认为NaN不等于自身。
* Set实例的属性和方法

	Set.prototype.constructor：构造函数，默认就是Set函数。
	Set.prototype.size：返回Set实例的成员总数。

**Set实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。**

**四个操作方法**

 - add(value)：添加某个值，返回Set结构本身。
 - delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
 - has(value)：返回一个布尔值，表示该值是否为Set的成员。
 - clear()：清除所有成员，没有返回值。

**遍历操作**

 - keys()：返回键名的遍历器
 - values()：返回键值的遍历器
 - entries()：返回键值对的遍历器
 - forEach()：使用回调函数遍历每个成员

**WeakSet**   --> WeakSet结构与Set类似，也是不重复的值的集合

> * WeakSet的成员只能是对象，而不能是其他类型的值
* 其次，WeakSet中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于WeakSet之中。这个特点意味着，无法引用WeakSet的成员，因此WeakSet是不可遍历的。

	var ws = new WeakSet();

	var a = [[1,2], [3,4]];
	var ws = new WeakSet(a);
上面代码中，a是一个数组，它有两个成员，也都是数组。将a作为WeakSet构造函数的参数，a的成员会自动成为WeakSet的成员。

**WeakSet结构有以下三个方法:**

 - WeakSet.prototype.add(value)：向WeakSet实例添加一个新成员。
 - WeakSet.prototype.delete(value)：清除WeakSet实例的指定成员。
 - WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在


 **WeakSet没有size属性，没有办法遍历它的成员**


##Map

> 类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
> Map也可以接受一个数组作为参数

	var m = new Map([  //字符串true和布尔值true是两个不同的键。
	  [true, 'foo'],
	  ['true', 'bar']
	]);
	
	m.get(true) // 'foo'
	m.get('true') // 'bar'

* 如果对同一个键多次赋值，后面的值将覆盖前面的值。
* 如果读取一个未知的键，则返回undefined**(只有对同一个对象的引用，Map结构才将其视为同一个键)**
* Map的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞（clash）的问题.

* 如果Map的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map将其视为一个键，包括0和-0。另外，虽然NaN不严格相等于自身，但Map将其视为同一个键。

		let map = new Map();
		
		map.set(NaN, 123);
		map.get(NaN) // 123
		
		map.set(-0, 123);
		map.get(+0) // 123

**实例的属性和操作方法**

- size属性--size属性返回Map结构的成员总数。
- set(key, value)--set方法设置key所对应的键值，然后返回整个Map结构。如果key已经有值，则键值会被更新，否则就新生成该键。set方法返回的是Map本身，因此可以采用链式写法。

		var m = new Map();
		
		m.set("edition", 6)        // 键是字符串
		m.set(262, "standard")     // 键是数值
		m.set(undefined, "nah")    // 键是undefined
		
		let map = new Map()
		  .set(1, 'a')
		  .set(2, 'b')
		  .set(3, 'c');

- get(key)--get方法读取key对应的键值，如果找不到key，返回undefined。

		var m = new Map();
		
		var hello = function() {console.log("hello");}
		m.set(hello, "Hello ES6!") // 键是函数
		
		m.get(hello)  // Hello ES6!

- has(key)--has方法返回一个布尔值，表示某个键是否在Map数据结构中。
- delete(key)--delete方法删除某个键，返回true。如果删除失败，返回false。
- clear()--clear方法清除所有成员，没有返回值。

**遍历方法**  Map原生提供三个遍历器生成函数和一个遍历方法。Map的遍历顺序就是插入顺序
。
1. keys()：返回键名的遍历器。
2. values()：返回键值的遍历器。
3. entries()：返回所有成员的遍历器。
4. forEach()：遍历Map的所有成员。


Map结构转为数组结构，比较快速的方法是结合使用扩展运算符（...）。
	let map = new Map([
	  [1, 'one'],
	  [2, 'two'],
	  [3, 'three'],
	]);
	
	[...map.entries()]
	// [[1,'one'], [2, 'two'], [3, 'three']]
	
	[...map]
	// [[1,'one'], [2, 'two'], [3, 'three']]

结合数组的map方法、filter方法，可以实现Map的遍历和过滤（Map本身没有map和filter方法）。

	let map0 = new Map()
	  .set(1, 'a')
	  .set(2, 'b')
	  .set(3, 'c');
	
	let map1 = new Map(
	  [...map0].filter(([k, v]) => k < 3)
	);
	// 产生Map结构 {1 => 'a', 2 => 'b'}
	
	let map2 = new Map(
	  [...map0].map(([k, v]) => [k * 2, '_' + v])
	    );
	// 产生Map结构 {2 => '_a', 4 => '_b', 6 => '_c'}

此外，Map还有一个forEach方法，与数组的forEach方法类似，也可以实现遍历。

	map.forEach(function(value, key, map) {
	  console.log("Key: %s, Value: %s", key, value);
	});

	forEach方法还可以接受第二个参数，用来绑定this。

	var reporter = {
	  report: function(key, value) {
	    console.log("Key: %s, Value: %s", key, value);
	  }
	};
	
	map.forEach(function(value, key, map) {
	  this.report(key, value);
	}, reporter);

**与其他数据结构的互相转换**

1. Map转为数组--使用扩展运算符（...）
2. 数组转为Map--将数组转入Map构造函数，就可以转为Map
3. Map转为对象--如果所有Map的键都是字符串，它可以转为对象。
4. 对象转为Map

		function objToStrMap(obj) {
		  let strMap = new Map();
		  for (let k of Object.keys(obj)) {
		    strMap.set(k, obj[k]);
		  }
		  return strMap;
		}
		
		objToStrMap({yes: true, no: false})
		// [ [ 'yes', true ], [ 'no', false ] ]

5. Map转为JSON -- Map转为JSON要区分两种情况。
	* 一种情况是，Map的键名都是字符串，这时可以选择转为对象JSON。
	*  另一种情况是，Map的键名有非字符串，这时可以选择转为数组JSON
6. JSON转为Map--
	* 正常情况下，所有键名都是字符串。
	* 整个JSON就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为Map。这往往是数组转为JSON的逆操作。

**WeakMap**

WeakMap结构与Map结构基本类似，唯一的区别是它只接受对象作为键名（null除外），不接受其他类型的值作为键名，而且键名所指向的对象，不计入垃圾回收机制。


#Iterator和for...of循环

**Iterator（遍历器)** --> 是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署Iterator接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）

**Iterator的作用**
1. 为各种数据结构，提供一个统一的、简便的访问接口；
2. 使得数据结构的成员能够按某种次序排列；
3. ES6创造了一种新的遍历命令for...of循环，Iterator接口主要供for...of消费。

**Iterator的遍历过程**

1. 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

2. 第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。

3. 第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。

4. 不断调用指针对象的next方法，直到它指向数据结构的结束位置。

每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。

由于Iterator只是把接口规格加到数据结构之上，所以，遍历器与它所遍历的那个数据结构，实际上是分开的，完全可以写出没有对应数据结构的遍历器对象，或者说用遍历器对象模拟出数据结构

凡是部署了Symbol.iterator属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。

如果使用TypeScript的写法，遍历器接口（Iterable）、指针对象（Iterator）和next方法返回值的规格可以描述如下。

	interface Iterable {
	  [Symbol.iterator]() : Iterator,
	}
	
	interface Iterator {
	  next(value?: any) : IterationResult,
	}
	
	interface IterationResult {
	  value: any,
	  done: boolean,
	}

**数据结构的默认Iterator接口** --> 为所有数据结构，提供了一种统一的访问机制，即for...of循环。当使用for...of循环遍历某种数据结构时，该循环会自动去寻找Iterator接口。

一种数据结构只要部署了Iterator接口，我们就称这种数据结构是”可遍历的“（iterable）。

在ES6中，有三类数据结构原生具备Iterator接口：数组、某些类似数组的对象、Set和Map结构。

有了遍历器接口，数据结构就可以用for...of循环遍历（详见下文），也可以使用while循环遍历。

	var $iterator = ITERABLE[Symbol.iterator]();
	var $result = $iterator.next();
	while (!$result.done) {
	  var x = $result.value;
	  // ...
	  $result = $iterator.next();
	}

上面代码中，ITERABLE代表某种可遍历的数据结构，$iterator是它的遍历器对象。遍历器对象每次移动指针（next方法），都检查一下返回值的done属性，如果遍历还没结束，就移动遍历器对象的指针到下一步（next方法），不断循环。

**调用Iterator接口的场合**

1. 解构赋值
2. 扩展运算符
3. yield*
4. 其他场合--》由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。下面是一些例子。

		for...of
		Array.from()
		Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
		Promise.all()
		Promise.race()

**字符串的Iterator接口**-->字符串是一个类似数组的对象，也原生具有Iterator接口

**Iterator接口与Generator函数**

**遍历器对象的return()，throw()**