#Part01

###1.JSX语法
1. 定义标签时，最外层只允许一个根标签包裹；
2. 标签一定要闭合；
3. 组件元素的字母必须大写；
4. 元素属性中与标准规范除了class->className、for->htmlFor外都相同；
5. Boolean属性：省略时，JSX默认bool设置为true,传入false时，必须使用属性表达式；
   eg: `<Checkbox checkbox={true} />` 等同于 `<Checkbox checkbox />`
       `<Checkbox checkbox={false} />` 等同于 `<Checkbox />`
6. 自定义Htmml属性需要使用'data-'前缀；
7. JS属性表达式要用 {} 包裹；

###2.React组件
1. React组件的构建：
+ React.createClass eg:

        const Button = React.createClass({
          getDefaultProps(){
            return ({
              color : 'red',
              text : 'hello'
              });
          }
          render() {
            const { color, text } = this.props;
            return (
              <button className={`btn btn-${color}`}>
                <span>{text}</span>
              </button>
            );
          }
        });

React.createClass方法构建一个组件对象，当另一个组件调用时 <Button />,被解析为React.createElement(Button)方法来创建Button实例，  
每次调用Button方法都会创建Button实例。

+ ES6 class eg:

        import React, { Component } from 'react';
        class Button extends Component {
          constructor(props) {
            super(props)
            this.state = { }
          }
          static defaultProps = {
            color : 'blue',
            text : 'Confirm'
          }
          static propTypes = {}
          state = {}
          render() {
            <button className={`btn ${color}`}>
              <span>{text}</span>
            </button>
         };
      }
React的所有组件都继承自顶层类React.Component,它初始化了ReactComponent方法，声明了props、context、refs等，并在原型上定义了setState
和forceUpdate方法。

+ 无状态函数 ：无状态组件创建时'始终保持一个实例'，调用时不创建新的实例，只传入props和context两个参数，不存在state,没有生命周期法,defaultProps
  、propTypes可以通过设置静态属性的方法实现,组件本生相当于前两中方法的render方法；eg :

        function Button({ color = 'blue', text = 'hello' }) {
          return(
            <button className = { `btn btn-${color}` }>
              <span>{text}</span>
            </button>
          );
        }

###3.使用ES6重构React组件的区别
[使用 ES2015 重构 React 组件](http://www.tuicool.com/articles/niUJB3r)  
[React 使用ES6+语法时 事件绑定疑惑](https://segmentfault.com/q/1010000003763076)
###4.React数据流
>React的数据自顶向下单向流动,顶层组件初始化props，那么React会向下遍历整棵组件树，尝试重新渲染相关子组件组件，state只关注组件自己的内部状态；

1. setState: 调用该方法的组件会尝试重新渲染，setState方法为一部方法，一个生命周期内的所有setState方法会合并操作；
2. pros: props本身不可变，组件的props一定来自默认属性或父组件传递而来；
  + props的默认设置通过defaultProps静态变量的定义，当组件调用时，保证渲染后始终有值； eg:
        static defaultProps = {
          classPrefix : 'tabs'
        };
  + 子组件prop : this.props.children代表组件的子组件的集合，通过React.Children.map方法遍历子组件；
  + 组件props : 将子组件以props的形式传递
  + propTypes : 规范props的类型和必需的状态，在开发环境中对组件的props值的类型作检查。
