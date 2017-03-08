> 《深入react技术栈》笔记（一）

### 什么是React

> React 是 Facebook 在 2013 年开源在 GitHub 上的 JavaScript 库。

### React的特点是什么

react诞生在一个前端组件化方案萌发阶段，react试图通过一些规则和模板让组件化实现起来更轻松。当然这只是react所解决的问题之一。react更多的解决的是数据绑定的问题，也就是数据改变，UI该如何变化。从而解决MVC框架中频繁的手动去操作DOM节点的低效问题。这也就是MVVM框架所做的事，而react在UI渲染中也有非常大的突破，使用了Virtual DOM提升了React性能。同时Virtual DOM也是React Native渲染原生控件的关键之一。

总结：
* 快速实现前端组件化
* UI=fn(data);
* Virtual DOM的高效
* Write Once，Run Anywhere。

### React的API

> React 不像其他框架那样提供了许多复杂的概念与烦琐的 API，它以 Minimal API Interface 为目标，只提供组件化相关的非常少量的 API。同时为了保持灵活性，它没有自创一套规则，而是尽可能地让用户使用原生 JavaScript 进行开发。只要熟悉原生 JavaScript 并了解重要概念后，就可以很容易上手 React 应用开发。

《深入react技术栈》一书中，通过详细介绍如何构造组件Tab，对React组件的初始化，生命周期，数据流动等相关的API进行了非常深入的剖析。

作者介绍了2种组件组织方式，其中第二种让我大开眼界，非常灵活和简洁。（我一直以来都是用第一种方式去组织组件）：

1. > 在 Tabs 组件内把所有定义的子组件都显式展示出来。这种方式的好处在于非常易于理解，可自定义能力强，但调用过程显得过于笨重。React-Bootstrap 和 Material UI 组件库中的 Tabs 组件采用的是这种形式。调用方式近似如下形式：

```HTML
<Tabs classPrefix={'tabs'} defaultActiveIndex={0}>
  <TabNav>
    <TabHead>Tab 1</TabHead>
    <TabHead>Tab 2</TabHead>
    <TabHead>Tab 3</TabHead>
  </TabNav>
  <TabContent>
    <TabPane>第一个 Tab 里的内容</TabPane>
    <TabPane>第二个 Tab 里的内容</TabPane>
    <TabPane>第三个 Tab 里的内容</TabPane>
  </TabContent>
</Tabs>
```

2. > 在 Tabs 组件内只显示定义内容区域的子组件集合，头部区域对应内部区域每一个 TabPane 组件的 props，让其在 TabNav 组件内拼装。这种方式的调用写法简洁，把复杂的逻辑留给了组件去实现。Ant Design 组件库中的 Tabs 组件采用的就是这种形式。调用方式近似如下形式：

```HTML
<Tabs classPrefix={'tabs'} defaultActiveIndex={0}>
  <TabPane key={0} tab={'Tab 1'}>第一个 Tab 里的内容</TabPane>
  <TabPane key={1} tab={'Tab 2'}>第二个 Tab 里的内容</TabPane>
  <TabPane key={2} tab={'Tab 3'}>第三个 Tab 里的内容</TabPane>
</Tabs>
```
