##使用typescript需要安装：
   1. 安装typescript :npm install -g typescript@1.8
   2. 编译ts文件 tsc hello.ts
   3. node执行 hello.js

###ts-node模块将编译和执行组合起来
    1. 安装 npm install ts-node
    2. 使用 ts-node hello.ts

##typescript引入的es2015和es2016上的特性
    1.箭头函数 
    var result=[1,2,3].reduce(
       (total,current)=>total+current,0
    )

    ###箭头函数的执行上下文(this)指向外层的代码
    + 使用箭头函数
    function MyComponent(){
    	this.age=42;
    	setTimeout(
           ()=>{
           	 this.age+=1;
           	 console.log(this.age);
           },100 
    	);
    }

    new MyComponnet();//43 in 100ms

    + 不使用箭头函数

    function MyComponent(){
    	this.age=42;
    	setTimeout(
           function(){
           	 this.age+=1;
           	 console.log(this.age);
           },100 
    	);
    }
    new MyComponnet();//NAN in 100ms

    ###类的使用
    class Human {
	  static totalPeople = 0;
	  _name; // ES2016 property declaration syntax
	  constructor(name) {
	    this._name = name;
	    Human.totalPeople += 1;
	  }
	  get name() {
	    return this._name;
	  }
	  set name(val) {
	    this._name = val;
	  }
	  talk() {
	    return `Hi, I'm ${this.name}!`;
	  }
    }

	class Developer extends Human {
	  _languages; // ES2016 property declaration syntax
	  constructor(name, languages) {
	    super(name);
	    this._languages = languages;
	  }
	  get languages() {
	    return this._languages;
	  }
	  talk() {
	    return `${super.talk()} And I know ${this.languages.join(', ')}.`;
	  }
	}

	var human =new Human("footbar");
	var dev=new Developer("bar",["javaScript"]);
	console.log(dev.talk());
	console.log(human.talk());

	##块级作用域 let的使用

	##装饰器进行元编程(装饰器类似java注解)
	angular2用来定义组件，指令以及指令，跟依赖注入的机制混合使用。
    class Person {
	  @nonenumerable
	  get kidCount() {
	    return 42;
	  }
	}

	function nonenumerable(target, name, descriptor) {
	  descriptor.enumerable = false;
	  return descriptor;
	}

	var person = new Person();

	for (let prop in person) {
	  console.log(prop);
	}

	console.log(person.kidCount);

	##es2015的模块语法
	###导出
	function square(x){
		return Math.pow(x,2);
	}

	function log10(x){
		return Math.log10(x);
	}

	export {square,log10};

    ###导入
    import {square,log10} from './math';

    ##ts是js的超集，ts独有的特性

    ### ts静态类型的特性
    let foo=42;//类型推断机制，foo为number型
    foo="42"; //tsc编译报错
    
    ### 枚举类型
    enum STATES{
		CONNECTING,
		CONNECTED,
		DISCONNECTING,
		WAITING,
		DISCONNECTED
	} 

	###函数类型
	需要声明函数参数类型和返回值类型，没有返回值定义成void
	函数声明式的写法：
	function isPrime(n:Number):boolean{

	}

	##类的访问修饰符
	public private protected跟java是类似的
	类的继承支持extends关键字，可以转换成基于原型继承的js代码

    ##接口的定义
    interface Accountable{
    	accountNumber: string
    	getIncome():number;
    }

    class Firm implements Accountable{
    	getIncome():number{
    		...
    	}
    }

    接口的继承跟java类似

    ##编写泛型代码
    class Node<T>{
    	value: T;
    	left:Node<T>;
    	right:Node<T>;
    }
    Node<T>表示这个类可以接受单个参数T，这个参数在类中会用到;
    let numberNode=new Node<number>();
    numberNode.value="42";//报错



