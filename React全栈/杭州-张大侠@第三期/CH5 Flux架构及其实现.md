# Chapter 5 Flux架构及其实现
> React核心在于组件。但是当应用的复杂程度增加时，组件的state就会变得越来越复杂，除了view层级外，React还需要解决数据流向、state管理、路由解决方案等问题——Flux。

## 5.1 Flux
Flux是Facebook官方提出的一套前端应用架构模式。其更像是一种软件开发模式，而不是具体的一个框架，关键在于其内在的思想。

`单项数据流`是Flux的核心。

MVC这种软件架构，数据流动是双向的。controller是model和view之间交互的媒介，需要处理view的交互操作，通知model进行更新，同时在操作成功后通知view更新。——这种模式在model和view的对应关系越来越复杂时，便难以维护和调试。

Flux整个流程：
`Action`→`Dispatcher`→`Store`→`View`
可以参见“./demo/demo-flux”，将一些笔记加到了注释中，便于理解
- `Action`就是用来描述一个行为的对象，里面有相关的信息，比如一个创建文章的Action可以是：
		{
		    actionName: 'create-post',
		    data: {
		        content: 'new stuff'
		    }
		}

- `Dispatcher`是一个信息的分发中心，它也是Action和Store的连接中心，Dispatcher可以使用dispatch方法执行一个Action，并且可以用register方法注册回调，在回调方法中处理Store的内容。
- `Store`处理完毕之后，它可以使用emit方法向其他地方发送命名为“change”的广播，告知它们Store已经发生变更。
- `View`层监听change事件，一旦change事件被触发，那么该层可以调用setState来更新整个UI。

![](https://github.com/fezaoduke/zaoduhui/blob/master/React%E5%85%A8%E6%A0%88/%E6%9D%AD%E5%B7%9E-%E5%BC%A0%E5%A4%A7%E4%BE%A0@%E7%AC%AC%E4%B8%89%E6%9C%9F/img/flux%E6%95%B4%E4%B8%AA%E6%B5%81%E7%A8%8B.jpg?raw=true)

当用户在view上有一个交互时，Dispatcher广播（dispatch方法）一个action（就是一个Object对象，里面包含action的类型和要传递的数据），在整个程序的总调度台（Dispatcher）里面注册了各种类型的action类型，在对应的类型中，store（也是一个Object对象，实现了订阅-发布的功能）对这个action进行响应，对数据做相应的处理，然后触发一个自定义事件，同时，在view上注册这个store的事件回调，响应这个事件并重新渲染界面。

## 5.2 Redux
随着前端应用越来越复杂，应用的状态（state）也变得越来越复杂。状态其实就是应用运行的时候需要的各种各样的动态数据，他们可能是`来自服务端返回的数据`、`本地生成还没有持久化到服务器的数据`、`本地缓存数据`、`服务器数据加载状态`、`当前路由`等。 → state在何时、什么原因发生变化都变得无法预测。

Redux让state的变化可以预测。

**三大定律**
- 单一数据源

整个应用的state存储在一个JavaScript对象中，Redux用一个称为store的对象来存储整个state。例如：
```javascript
{
	posts:{
		isLoading: false,
		items:[
			{id:1, content:'Hello world'}
		]
	},
	user:{
		isLoading: false,
		userInfo: {
			name: 'zelda',
			email: 'ze.zh@hotmail.com'
		}
	}
}
```
- state只读

不能再state上面直接修改数据，改变state的唯一办法是触发action。确保其他操作无法修改state数据，整个修改都被集中处理，而且严格按顺序执行。
action只是一个信息载体，一个普通的JavaScript对象。
```javascript
//使用dispatch触发store的改变
store.dispatch({
	type: 'CREATE_POST',
	post: {id: 2, content: 'hello, zelda!'}
});

//使用getState方法返回当前的state
store.getState();
```

- 使用纯函数进行修改
为了描述action怎样改变state，需要编写**reducer**来规定修改的规则。
reducer是一个纯函数（好处是无副作用，仅仅依赖函数的输入，输入确定时输出也一定保持一致），接收先前的state和处理的action，返回新的state。reducer可以根据应用的大小拆分成多个，分别操纵state的不同部分
```javascript
//这就是一个reducer，负责处理action，返回新的state
function posts(state = [], action){
	switch(action.type){
		case 'CREATE_POST': 
			return [...state, action.post]
		default:
			return state;
	}
}
```

**组成**
- action

action是信息的载体，里面有action的名称和要传递的信息，然后可以被传递到store中去。
传递的方法是利用store的dispatch方法，action是store的唯一信息来源。

**action creator**是一个函数，用来创建不同的action，返回的还是一个对象。但在异步应用中有作用。
- reducer

action定义了要执行的操作，但是没有规定state怎样变化。reducer的任务就是定义整个程序的state如何响应。
在Redux中，整个程序的所有数据存储在**唯一**一个Object中。
reducer只是一个纯函数，接受两个参数，输入之前的state和action对象，返回新的state
- store
action不过是一个特殊的Object，它描述了一个特定的行为；
reducer就是一个函数，接收数据和action，返回唯一的值，它会根据这些不同的action更新对应的state值
store就是这两者的黏合剂，能够：
	- 保存整个程序的state
	- 可以通过getState()方法访问state的值
	- 可以通过dispatch()方法执行一个action
	- 还可以通过subscribe(listener)注册回调，监听state的变化。

**数据流**
总结Redux数据流分为这样几步：
- 调用store.dispatch(action)，来执行一个action
- store调用传入的reducer函数，store的来源就是reducer，const store=createState(rootReducer)。当前的state和action会传入到reducer这个函数中。
- reducer处理action并且返回新的state。在reducer这个纯函数中，可以根据传入的action，来生成新的state并且返回。
- store保存reducer返回的完整state。可以根据store.getState()来取得当前的state，也可以通过store.subscribe(listener)来监听state的变化。

**使用middleware**
中间件，在action被dispatch时触发，并提供了调用最终reducer之前的扩展能力。
middleware可以同时接触到action信息与store的getState、dispatch方法。
middleware可以在原有action的基础上创建一个新的action和dispatch（action装换，用于可异步action处理等），也可以触发一些额外的行为（如日志记录）。最后还可以通过next触发后续的middleware与reducer本身的执行。
>curry化的本质是在调用函数的时候传入更少的参数，而这个函数会返回另外一个函数并且汉能继续接收其他的参数。

