> 《深入react技术栈》笔记（二）

### 事件机制

> React基于虚拟DOM实现了一个合成事件层。在React底层，主要对合成事件做了两件事：`事件委托`和`自动绑定`。
#### React事件委托

React事件委托是把所有事件绑定到结构的最外层，使用一个统一的事件监听器，组件挂载和卸载时，只是在这个监听器上插入或删除一些对象。

#### 自动绑定

React中，每个方法的上下文都为当前组件实例，即this指向当前组件。但是**当我们使用ES6 classes或者无状态函数（纯函数）来构建组件时，React的自动绑定将失效，此时需要我们手动绑定this**。
有以下3类方法实现对this的绑定:
1. `bind`方法绑定

    <div onClick={this.handleClick.bind(this,'test')}/>这种绑定方式的好处是可以在绑定时传入参数，但每次都会生成一个新的函数。

2. 在构造器内声明

    ```javascript
    class App extends Component {
        constructor(props){
            super(props);
            this.handleClick=this.handleClick.bind(this);
        }
    }
    ```
    优点是只需要在实例化时执行一次绑定，不需要每次调用都绑定一次
    
3. 箭头函数

    ```HTML
    <div onClick={()=>this.handleClick()}/>
    ```
    箭头函数天生不需要使用bind方法去绑定this。
    
#### 原生事件

原生事件需要用到DOM节点，可以在componentDidMount中进行调用，但要记得在组件移除时取消事件监听

#### 合成事件、原生事件混用

通常，我们应该尽量避免在React中混用合成事件与原生事件，由于合成事件是绑定在最外层，我们不能在组件上去使用合成事件去阻止原生事件的冒泡。但**在原生事件中却可以阻止React合成事件冒泡**，这是需要注意的。

#### 合成事件、原生事件区别

1. 事件传播和阻止事件传播
    1. DOM原生事件分为三个阶段：事件捕获，事件处理，事件冒泡
    2. React合成事件仅仅支持事件冒泡机制。

2. 事件类型
    React合成事件类型是JavaScript事件类型的子集

3. 事件绑定方式
    
    React是直接在JSX中进行绑定，原生事件除了直接作为DOM属性，还可以使用事件监听 addEventListener

4. 事件对象
    React合成事件系统中不存在IE的兼容问题，在事件处理函数中可以得到一个合成事件对象