高阶函数在函数式编程中是个基本概念，它描述这样一个函数：
> 这种函数接受函数作为输入，或是输出一个函数。

常见的有数组的map,reduce,sort等都是高阶函数。实现高阶组件有以下两个方法：
* **属性代理（props proxy）** 高阶组件通过被包裹的React组建来操作props
* **反向继承（inheritance inversion）** 高阶组件继承于被包裹的React组件。

#### 属性代理
就如高阶函数的定义，传入函数，输出函数。在React中，函数可以是React组件，传入组件，输出组件，给组件添加一些定制化（拓展）的功能。
```javascript
import React,{Component} from 'React';

const MyContainer =(WrapComponent)=>{
    class extends Component {
        render (){
            return <WrapComponent {...this.props} />
        }
    }
}
```
如上述代码，可以非常简单的去使用这一个高阶组件
* 第一种使用方式:直接作为参数传入高阶组件
```javascript

class MyComponent extends Component {
    render (){
        ...
    }
}
export default MyContainer(MyComponent);
```
* 第二种使用方式：decorator修饰
```javascript
@MyContainer
class MyComponent extends Component {
    render (){
        ...
    }
}
export default MyComponent;
```
#### 高阶组件属性代理的作用
1. 高阶组件的生命周期

从低阶组件进入，从低阶组件出
> DidMount=>HOC DidMount=>HOC UnMount=>UnMount

2. 控制props

高阶组件非常重要的功能=>对props的控制，增删查改。
```javascript
import React,{Component} from 'React';

const MyContainer =(WrapComponent)=>{
    class extends Component {
        render (){
            const newProps={...}
            return <WrapComponent {...this.props} {...newProps}/>
        }
    }
}
```
3. 抽象state

在控制props的基础上，将高阶组件自身的state作为低阶组件的props传给低阶组件

```javascript
import React,{Component} from 'React';

const MyContainer =(WrapComponent)=>{
    class extends Component {
        render (){
            const newProps={
                value:this.state.value,
                onClick:this.onClick
            }
            return <WrapComponent {...this.props} {...newProps}/>
        }
    }
}
```
4. 增加元素

给低阶组件再外包一些组件，例如增加一个遮罩背景
```javascript
import React,{Component} from 'React';

const MyContainer =(WrapComponent)=>{
    class extends Component {
        render (){
            const newProps={
                value:this.state.value,
                onClick:this.onClick
            }
            return (
                <div className='mask'>
                    <WrapComponent {...this.props} {...newProps}/>
                </div>
            )
            
        }
    }
}
```