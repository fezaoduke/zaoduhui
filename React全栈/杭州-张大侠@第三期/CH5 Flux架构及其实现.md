# Chapter 5 Flux架构及其实现
> React核心在于组件。但是当应用的复杂程度增加时，组件的state就会变得越来越复杂，除了view层级外，React还需要解决数据流向、state管理、路由解决方案等问题——Flux。

## 5.1 Flux
Flux是Facebook官方提出的一套前端应用架构模式。其更像是一种软件开发模式，而不是具体的一个框架，关键在于其内在的思想。

`单项数据流`是Flux的核心。

MVC这种软件架构，数据流动是双向的。controller是model和view之间交互的媒介，需要处理view的交互操作，通知model进行更新，同时在操作成功后通知view更新。——这种模式在model和view的对应关系越来越复杂时，便难以维护和调试。

Flux整个流程：
`Action`→`Dispatcher`→`Store`→`View`
可以参见“demo-flux”，将一些笔记加到了注释中，便于理解
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
- state只读
- 使用纯函数进行修改

**组成**
- action
- reducer
- store

