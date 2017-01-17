#异步操作和Async函数
Javascript 语言的执行环境是“单线程”的

##异步
所谓"异步"，简单说就是一个任务不是连续完成的，可以理解成该任务被人为分成两段，先执行第一段，然后转而执行其他任务，等做好了准备，再回过头执行第二段。相应地，连续的执行就叫做同步。

**回调函数**
JavaScript 语言对异步编程的实现，就是回调函数。所谓回调函数，就是把任务的第二段单独写在一个函数里面，等到重新执行这个任务的时候，就直接调用这个函数。回调函数的英语名字callback，直译过来就是"重新调用"。

	fs.readFile('/etc/passwd', 'utf-8', function (err, data) {
	  if (err) throw err;
	  console.log(data);
	});

Promise
回调函数本身并没有问题，它的问题出现在多个回调函数嵌套。假定读取A文件之后，再读取B文件，代码如下。

	fs.readFile(fileA, 'utf-8', function (err, data) {
	  fs.readFile(fileB, 'utf-8', function (err, data) {
	    // ...
	  });

Promise 对象就是为了解决这个**"回调函数地狱"（callback hell）**而提出的。它不是新的语法功能，而是一种新的写法，允许将回调函数的嵌套，改成链式调用。采用 Promise，连续读取多个文件，写法如下。

	var readFile = require('fs-readfile-promise');
	
	readFile(fileA)
	.then(function (data) {
	  console.log(data.toString());
	})
	.then(function () {
	  return readFile(fileB);
	})
	.then(function (data) {
	  console.log(data.toString());
	})
	.catch(function (err) {
	  console.log(err);
	});

**Generator函数**
传统的编程语言，早有异步编程的解决方案（其实是多任务的解决方案）。其中有一种叫做"协程"（coroutine），意思是多个线程互相协作，完成异步任务。

协程有点像函数，又有点像线程。它的运行流程大致如下。

第一步，协程A开始执行。
第二步，协程A执行到一半，进入暂停，执行权转移到协程B。
第三步，（一段时间后）协程B交还执行权。
第四步，协程A恢复执行。
上面流程的协程A，就是异步任务，因为它分成两段（或多段）执行。

	function *asyncJob() {
	  // ...其他代码
	  var f = yield readFile(fileA);
	  // ...其他代码
	}
> 上面代码的函数asyncJob是一个协程，它的奥妙就在其中的yield命令。它表示执行到此处，执行权将交给其他协程。也就是说，yield命令是异步两个阶段的分界线。

> 协程遇到yield命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。它的最大优点，就是代码的写法非常像同步操作，如果去除yield命令，简直一模一样。

 **Generator 函数的概念**

Generator 函数是协程在 ES6 的实现，最大特点就是可以**交出函数的执行权**（即暂停执行）。

整个 Generator 函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作需要暂停的地方，都用yield语句注明。Generator 函数的执行方法如下。

	function* gen(x) {
	  var y = yield x + 2;
	  return y;
	}
	
	var g = gen(1);
	g.next() // { value: 3, done: false }
	g.next() // { value: undefined, done: true }

上面代码中，调用 Generator 函数，会返回一个内部指针（即遍历器）g。这是 Generator 函数不同于普通函数的另一个地方，即执行它不会返回结果，返回的是指针对象。调用指针g的next方法，会移动内部指针（即执行异步任务的第一段），指向第一个遇到的yield语句，上例是执行到x + 2为止。

换言之，next方法的作用是分阶段执行Generator函数。每次调用next方法，会返回一个对象，表示当前阶段的信息（value属性和done属性）。value属性是yield语句后面表达式的值，表示当前阶段的值；done属性是一个布尔值，表示 Generator 函数是否执行完毕，即是否还有下一个阶段。

**Generator 函数的数据交换和错误处理**

Generator函数可以暂停执行和恢复执行，这是它能封装异步任务的根本原因。除此之外，它还有两个特性，使它可以作为异步编程的完整解决方案：函数体内外的数据交换和错误处理机制。

next方法返回值的value属性，是Generator函数向外输出数据；next方法还可以接受参数，这是向Generator函数体内输入数据。

	function* gen(x){
	  var y = yield x + 2;
	  return y;
	}
	
	var g = gen(1);
	g.next() // { value: 3, done: false }
	g.next(2) // { value: 2, done: true }

Generator 函数内部还可以部署错误处理代码，捕获函数体外抛出的错误。

	function* gen(x){
	  try {
	    var y = yield x + 2;
	  } catch (e){
	    console.log(e);
	  }
	  return y;
	}
	
	var g = gen(1);
	g.next();
	g.throw('出错了');
	// 出错了

上面代码的最后一行，Generator函数体外，使用指针对象的throw方法抛出的错误，可以被函数体内的try ...catch代码块捕获。这意味着，出错的代码与处理错误的代码，实现了时间和空间上的分离，这对于异步编程无疑是很重要的。

**异步任务的封装**
Generator 函数，执行一个真实的异步任务。

	var fetch = require('node-fetch');
	
	function* gen(){
	  var url = 'https://api.github.com/users/github';
	  var result = yield fetch(url);
	  console.log(result.bio);
	}
上面代码中，Generator函数封装了一个异步操作，该操作先读取一个远程接口，然后从JSON格式的数据解析信息。

**Thunk函数**

**参数的求值策略** --> 即函数的参数到底应该何时求值

* 一种意见是"传值调用"（call by value）
* 一种意见是"传名调用"（call by name）

Thunk函数的含义
编译器的"传名调用"实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做Thunk函数。

	function f(m){
	  return m * 2;
	}
	
	f(x + 5);
	
	// 等同于
	
	var thunk = function () {
	  return x + 5;
	};
	
	function f(thunk){
	  return thunk() * 2;
	}

上面代码中，函数f的参数x + 5被一个函数替换了。凡是用到原参数的地方，对Thunk函数求值即可。

这就是Thunk函数的定义，它是"传名调用"的一种实现策略，用来替换某个表达式。

**JavaScript语言的Thunk函数**

JavaScript语言是传值调用，它的Thunk函数含义有所不同。在JavaScript语言中，Thunk函数替换的不是表达式，而是多参数函数，将其替换成单参数的版本，且只接受回调函数作为参数。

	// 正常版本的readFile（多参数版本）
	fs.readFile(fileName, callback);
	
	// Thunk版本的readFile（单参数版本）
	var Thunk = function (fileName){
	  return function (callback){
	    return fs.readFile(fileName, callback);
	  };
	};
	
	var readFileThunk = Thunk(fileName);
	readFileThunk(callback);

上面代码中，fs模块的readFile方法是一个多参数函数，两个参数分别为文件名和回调函数。经过转换器处理，它变成了一个单参数函数，只接受回调函数作为参数。这个单参数版本，就叫做Thunk函数。

任何函数，只要参数有回调函数，就能写成Thunk函数的形式。下面是一个简单的Thunk函数转换器。

	// ES5版本
	var Thunk = function(fn){
	  return function (){
	    var args = Array.prototype.slice.call(arguments);
	    return function (callback){
	      args.push(callback);
	      return fn.apply(this, args);
	    }
	  };
	};
	
	// ES6版本
	var Thunk = function(fn) {
	  return function (...args) {
	    return function (callback) {
	      return fn.call(this, ...args, callback);
	    }
	  };
	};

使用上面的转换器，生成fs.readFile的Thunk函数。

	var readFileThunk = Thunk(fs.readFile);
	readFileThunk(fileA)(callback);
	下面是另一个完整的例子。
	
	function f(a, cb) {
	  cb(a);
	}
	let ft = Thunk(f);
	
	let log = console.log.bind(console);
	ft(1)(log) // 1

**Thunkify模块生产环境的转换器，建议使用Thunkify模块。**


**Generator 函数的流程管理**

Thunk函数现在可以用于Generator函数的自动流程管理。

Generator函数可以自动执行。

	function* gen() {
	  // ...
	}
	
	var g = gen();
	var res = g.next();
	
	while(!res.done){
	  console.log(res.value);
	  res = g.next();
	}

上面代码中，Generator函数gen会自动执行完所有步骤。

但是，这不适合异步操作。如果必须保证前一步执行完，才能执行后一步，上面的自动执行就不可行。这时，Thunk函数就能派上用处。以读取文件为例。下面的Generator函数封装了两个异步操作。

	var fs = require('fs');
	var thunkify = require('thunkify');
	var readFile = thunkify(fs.readFile);
	
	var gen = function* (){
	  var r1 = yield readFile('/etc/fstab');
	  console.log(r1.toString());
	  var r2 = yield readFile('/etc/shells');
	  console.log(r2.toString());
	};

上面代码中，yield命令用于将程序的执行权移出Generator函数，那么就需要一种方法，将执行权再交还给Generator函数。

这种方法就是Thunk函数，因为它可以在回调函数里，将执行权交还给Generator函数。为了便于理解，我们先看如何手动执行上面这个Generator函数。

	var g = gen();
	
	var r1 = g.next();
	r1.value(function(err, data){
	  if (err) throw err;
	  var r2 = g.next(data);
	  r2.value(function(err, data){
	    if (err) throw err;
	    g.next(data);
	  });
	});

上面代码中，变量g是Generator函数的内部指针，表示目前执行到哪一步。next方法负责将指针移动到下一步，并返回该步的信息（value属性和done属性）。

仔细查看上面的代码，可以发现Generator函数的执行过程，其实是将同一个回调函数，反复传入next方法的value属性。这使得我们可以用递归来自动完成这个过程。

Thunk函数的自动流程管理
Thunk函数真正的威力，在于可以自动执行Generator函数。下面就是一个基于Thunk函数的Generator执行器。

	function run(fn) {
	  var gen = fn();
	
	  function next(err, data) {
	    var result = gen.next(data);
	    if (result.done) return;
	    result.value(next);
	  }
	
	  next();
	}
	
	function* g() {
	  // ...
	}
	
	run(g);

上面代码的run函数，就是一个Generator函数的自动执行器。内部的next函数就是Thunk的回调函数。next函数先将指针移到Generator函数的下一步（gen.next方法），然后判断Generator函数是否结束（result.done属性），如果没结束，就将next函数再传入Thunk函数（result.value属性），否则就直接退出。

有了这个执行器，执行Generator函数方便多了。不管内部有多少个异步操作，直接把Generator函数传入run函数即可。当然，前提是每一个异步操作，都要是Thunk函数，也就是说，跟在yield命令后面的必须是Thunk函数。

	var g = function* (){
	  var f1 = yield readFile('fileA');
	  var f2 = yield readFile('fileB');
	  // ...
	  var fn = yield readFile('fileN');
	};
	
	run(g);

上面代码中，函数g封装了n个异步的读取文件操作，只要执行run函数，这些操作就会自动完成。这样一来，异步操作不仅可以写得像同步操作，而且一行代码就可以执行。

Thunk函数并不是Generator函数自动执行的唯一方案。因为自动执行的关键是，必须有一种机制，自动控制Generator函数的流程，接收和交还程序的执行权。回调函数可以做到这一点，Promise 对象也可以做到这一点。

##跨过CO

##async函数

async函数是什么？一句话，async函数就是 Generator 函数的语法糖。前文有一个 Generator 函数，依次读取两个文件。

	var fs = require('fs');
	
	var readFile = function (fileName) {
	  return new Promise(function (resolve, reject) {
	    fs.readFile(fileName, function(error, data) {
	      if (error) reject(error);
	      resolve(data);
	    });
	  });
	};
	
	var gen = function* (){
	  var f1 = yield readFile('/etc/fstab');
	  var f2 = yield readFile('/etc/shells');
	  console.log(f1.toString());
	  console.log(f2.toString());
	};

写成async函数，就是下面这样。

	var asyncReadFile = async function (){
	  var f1 = await readFile('/etc/fstab');
	  var f2 = await readFile('/etc/shells');
	  console.log(f1.toString());
	  console.log(f2.toString());
	};

一比较就会发现，async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await，仅此而已。

**async函数对 Generator 函数的改进，体现在以下四点**

1. 内置执行器。Generator 函数的执行必须靠执行器，所以才有了co模块，而async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样，只要一行。

	var result = asyncReadFile();
上面的代码调用了asyncReadFile函数，然后它就会自动执行，输出最后结果。这完全不像 Generator 函数，需要调用next方法，或者用co模块，才能得到真正执行，得到最后结果。

2. 更好的语义。async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。

3. 更广的适用性。 co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，可以是Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。

4. 返回值是 Promise。async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用then方法指定下一步的操作。

进一步说，async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖。

**语法** 
async函数的语法规则总体上比较简单，难点是错误处理机制。

1. async函数返回一个Promise对象。

async函数内部return语句返回的值，会成为then方法回调函数的参数。

	async function f() {
	  return 'hello world';
	}
	
	f().then(v => console.log(v))
	// "hello world"

上面代码中，函数f内部return命令返回的值，会被then方法回调函数接收到。

async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。抛出的错误对象会被catch方法回调函数接收到。

	async function f() {
	  throw new Error('出错了');
	}
	
	f().then(
	  v => console.log(v),
	  e => console.log(e)
	)
	// Error: 出错了

2. async函数返回的 Promise 对象，必须等到内部所有await命令的 Promise 对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误。也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。

下面是一个例子。

	async function getTitle(url) {
	  let response = await fetch(url);
	  let html = await response.text();
	  return html.match(/<title>([\s\S]+)<\/title>/i)[1];
	}
	getTitle('https://tc39.github.io/ecma262/').then(console.log)
	// "ECMAScript 2017 Language Specification"

上面代码中，函数getTitle内部有三个操作：抓取网页、取出文本、匹配页面标题。只有这三个操作全部完成，才会执行then方法里面的console.log。

3. 正常情况下，await命令后面是一个 Promise 对象。如果不是，会被转成一个立即resolve的 Promise 对象。
	
	async function f() {
	  return await 123;
	}
	
	f().then(v => console.log(v))
	// 123
上面代码中，await命令的参数是数值123，它被转成Promise对象，并立即resolve。

await命令后面的Promise对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到。

	async function f() {
	  await Promise.reject('出错了');
	}
	
	f()
	.then(v => console.log(v))
	.catch(e => console.log(e))
	// 出错了

注意，上面代码中，await语句前面没有return，但是reject方法的参数依然传入了catch方法的回调函数。这里如果在await前面加上return，效果是一样的。

只要一个await语句后面的Promise变为reject，那么整个async函数都会中断执行。

	async function f() {
	  await Promise.reject('出错了');
	  await Promise.resolve('hello world'); // 不会执行
	}

上面代码中，第二个await语句是不会执行的，因为第一个await语句状态变成了reject。

为了避免这个问题，可以将第一个await放在try...catch结构里面，这样第二个await就会执行。

	async function f() {
	  try {
	    await Promise.reject('出错了');
	  } catch(e) {
	  }
	  return await Promise.resolve('hello world');
	}
	
	f()
	.then(v => console.log(v))
	// hello world

另一种方法是await后面的Promise对象再跟一个catch方法，处理前面可能出现的错误。

	async function f() {
	  await Promise.reject('出错了')
	    .catch(e => console.log(e));
	  return await Promise.resolve('hello world');
	}
	
	f()
	.then(v => console.log(v))
	// 出错了
	// hello world

如果有多个await命令，可以统一放在try...catch结构中。

	async function main() {
	  try {
	    var val1 = await firstStep();
	    var val2 = await secondStep(val1);
	    var val3 = await thirdStep(val1, val2);
	
	    console.log('Final: ', val3);
	  }
	  catch (err) {
	    console.error(err);
	  }
	}

4. 如果await后面的异步操作出错，那么等同于async函数返回的Promise对象被reject。

	async function f() {
	  await new Promise(function (resolve, reject) {
	    throw new Error('出错了');
	  });
	}
	
	f()
	.then(v => console.log(v))
	.catch(e => console.log(e))
	// Error：出错了

上面代码中，async函数f执行后，await后面的Promise对象会抛出一个错误对象，导致catch方法的回调函数被调用，它的参数就是抛出的错误对象。具体的执行机制，可以参考后文的“async函数的实现”。

防止出错的方法，也是将其放在try...catch代码块之中。
	
	async function f() {
	  try {
	    await new Promise(function (resolve, reject) {
	      throw new Error('出错了');
	    });
	  } catch(e) {
	  }
	  return await('hello world');
	}

**async函数的实现**就是将 Generator 函数和自动执行器，包装在一个函数里。
	
	async function fn(args){
	  // ...
	}
	
	// 等同于
	
	function fn(args){
	  return spawn(function*() {
	    // ...
	  });
	}

**async 函数的用法**

async函数返回一个Promise对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到触发的异步操作完成，再接着执行函数体内后面的语句。

下面是一个例子。

	async function getStockPriceByName(name) {
	  var symbol = await getStockSymbol(name);
	  var stockPrice = await getStockPrice(symbol);
	  return stockPrice;
	}
	
	getStockPriceByName('goog').then(function (result) {
	  console.log(result);
	});

上面代码是一个获取股票报价的函数，函数前面的async关键字，表明该函数内部有异步操作。调用该函数时，会立即返回一个Promise对象。