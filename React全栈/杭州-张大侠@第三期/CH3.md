	CH3
# Chapter 3 初识React
React三大颠覆性特点：
- 组件：
	- React的一切都是基于组件的，其最重要的特性是基于组件的设计流程。
	- Web世界的构成是基于**各种HTML标签**的组合，这些标签天生就是_语义化组件_的表现，还有一些内容是这些**标签的组合**，比如说一组幻灯片、一个人物简介界面、一组侧边栏导航，可以称之为_自定义组件_。
	-JSX：
	- JavaScript的一种语法糖
	- 支持在JavaScript中直接使用HTML的语法，JSX编译器会把类似HTML的结构编译成JavaScript
- Virtual DOM
	- 一种对于HTML DOM节点抽象的描述，可以看成是一种用JavaScript实现的结构，且不需要浏览器的DOM API支持，所以在Node.js中也可以使用
	- 和DOM的一大区别就是其更为高效的渲染方式，组件的DOM结构映射到Virtual DOM上，当需要重新渲染组件时，React在Virtual DOM上实现了一个`diff`算法，可以在渲染时只修改实际需要修改的DOM节点上，避免整个DOM的渲染。

## 使用React与传统前端开发的比较（前端工程师的日常）

> 实现一个可选列表（单选）
### 传统实现
	//列表容器
	const wrapper = $('#list-wrapper');
	//列表所需数据
	const data:{
		list: [1, 2, 3],
		activeIndex: -1
	};
	//初始化行为
	function init(){
		wrapper.on('click', 'li', function(){
			activate();
		});
	}


