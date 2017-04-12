####3.4.7DOM操作
######ref
>大多数情况下我们可以通过setState重新渲染UI，但有时候，我们需要访问一些DOM结构（例如表单）。我们可以才用refs获取DOM节点。

<pre>
//在render中定义ref的名称
render(){
        return (
            &lt;div&gt;
                &lt;input type="text" ref="hobby" /&gt;
                &lt;button onClick={this.addHobbyCallback}&gt;添加爱好&lt;/button&gt;
            &lt;/div&gt;
        );
    }
</pre>

<pre>
addHobbyCallback(){
        //用refs.name来获取DOM节点
        let hobbyInput = this.refs.hobby;
        //获取DOM节点的值
        let val = hobbyInput.value;

        if(val){
            let hobbies = this.state.hobbies;
            hobbies = [...hobbies,val];
            this.setState(hobbies,() => {
                hobbyInput.value = '';
            })
        }
    }
</pre>

PS:书本中 `this.setState({hobbies})`多写了`{}`

<pre>
//同样的，记得将addHobbyCallback回调绑定作用域
constructor(props){
        super(props);
        this.addHobbyCallback = this.addHobbyCallback.bind(this);
    }
</pre>





