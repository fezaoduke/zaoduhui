##3、初识React

#####1、创建第一个页面
我们在根目录创建app文件夹，在app中创建第一个React页面
<pre>
import React from 'react';
import ReactDOM from 'react-dom';
function App() {
    return (
        &lt;div className="container"&gt;
            &lt;h1>Hello React!&lt;/h1&gt;
        &lt;/div&gt;
    );
}
const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<App />, app);
</pre>

#####2、添加组件热加载功能
由于我们的webpack-dev-server配置了hot功能：只要修改代码，整个项目都会重新编译刷新页面。在项目比较复杂的情况下会比较消耗时间。`组件热加载`就是更新代码后，只更新局部组件。

<pre>
npm install babel-preset-react-hmre --save-dev
</pre>

配置一下.babelrc文件
<pre>
{
	"presets":["es2015","react"],
	"env":{
		"development":{
			"presets":["react-hmre"]
		}
	}
}
</pre>

#####3、组件
>组件是React的基石，所有的React应用程序都是基于组件。

下面贴出简单的一个组件

<pre>
//path:app/compontents/Profile.jsx
import React from 'react';

export default class Profile extends React.Component {
    render(){
        return (
            &lt;div&gt;
                &lt;h1&gt;我的名字叫 {this.props.name}&lt;/h1&gt;
                &lt;h2&gt;我今年 {this.props.age} 岁&lt;/h2&gt;
            &lt;/div&gt;
        );
    }
}
</pre>

app.js文件
<pre>
//path:app/app.jsx
import React from 'react';
import { render } from 'react-dom';
import Profile from './components/Profile';

const ele = document.createElement('div');
document.body.appendChild(ele);
const props = {
    name: 'viking',
    age: 20
};
render(&lt;Profile {...props} /&gt;, ele);
</pre>

Tips:书本中 class 错写成 Class 了。


######组件属性

>React可以让用户自定义组件属性的变量类型

上面的代码案例可以看出，React支持传入变量
<pre>
const props = {
    name: 'viking',
    age: 20
};
</pre>

就是要传入组件的属性。当我们的需求需要传入数组等复杂类型的变量时，需要我们给不同的变量进行指定数据类型。

<pre>
import {ProTypes} from 'react';
const proTypes {
	//验证不同变量的JavaScript
    optionalArray:ProTypes.array,
    //可以是组件实例
    //可以一组值中的其中一个
    //可以规定是一组类型中的一个
    //可以在最后加上isRequired，表明是必须属性
}
</pre>

######state状态
>state是组件内部的属性。组件本身可以理解为状态机。根据state来渲染不同的UI。

<pre>
import React from 'react';

export default class Profile extends React.Component {
    constructor(props){
    	//必须要继承的super();
        super(props);
        //定义状态机
        this.state = {
            liked:0
        };
        //将likedCallback()函数绑定到到实例上。
        this.likedCallback = this.likedCallback.bind(this);
    }
    likedCallback(){
        let liked = this.state.liked;
        liked++;
        this.setState({
            liked
        });
    }
    render(){
        return (
            &lt;div&gt;
                &lt;h1&gt;我的名字叫 {this.props.name}&lt;/h1&gt;
                &lt;h2&gt;我今年 {this.props.age} 岁&lt;/h2&gt;
                &lt;button onClick={this.likedCallback}&gt;点赞&lt;/button&gt;
                &lt;h2&gt;总点赞数：{this.state.liked}&lt;/h2&gt;
             &lt;/div&gt;
        );
    }
}
</pre>

结合`angular`可以将`state`简单理解为 [数据绑定] 状态机中的值改变会是的UI中相关的值重新渲染。

######组件生命周期
1. 组件首次加载
2. 组件props更新
3. 组件卸载
