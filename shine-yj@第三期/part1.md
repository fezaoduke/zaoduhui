第一章 初入React世界

##1.2 jsx语法
#1、定义标签时，最外层只允许一个标签；
#2、标签一定要闭合；
#3、组件元素首字母大写；
#4、元素属性：class属性改为classNmae , for改为htmlFor;,Boolean为bool；
#5、利用ES6 rest/spread展开元素属性；
   eg : const data = { name : 'foo', value : 'bar'};
        const Component = <Component {...data} />;
#6、自定义Html属性，使用data-前缀；
#7、js表达式用{}转换；

##1.3 React组件
#1、React组件的构建方式：
1.React.createClass，每次调用创建新的实例;
2.es6 classl，每次调用创建新的实例;
3.无状态函数：无状态组件，只传入props和context，不存在state,没有生命周期，组件本身即render方法；
#2、React数据流
1.react数据单向，自顶向下流动，顶层组件初始化props，react会遍历整棵组件树，更新渲染所有相关的子组件，state每个组件的内部状态；
2.setState:使用该方法的组件会尝试重新渲染，setState是一个异步方法，一个生命周期内所有setState方法会合并操作；
3.props:react单向数据流的主要管道，组件的props一定来自默认设置或父组件传递而来；
4.props的默认设置： getDefaultProps () {}, static defaultProps = {} ->es6写法；
5.子组件prop:代表组件的字组件集合，通过React.Children.map方法遍历子组件；
6.propTypes: static propTypes = { app : React.PropTypes.string/number/bool/func.isRequired };

##1.5 React生命周期
#1.挂载和卸载
1.挂载：主要是组件状态的初始化,componentWillMount会在render方法前执行componentDidMount在之后，
        初始化过程包括读取初始props和state以及两个生命周期方法componentWillMount和componentDidMount,这些都在组件的初始化运行一次；
2.卸载：componentWillUnmount卸载前状态，常执行一些清理方法
#2.数据更新过程
#1.如果组件的state更新了，会依次执行shouldComponentUpdate,componetWillUpdate,render,componetDidUpdate.
