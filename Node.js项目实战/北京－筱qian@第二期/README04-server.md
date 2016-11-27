写在前面：这次笔记要补一下前面的一个重点；还要检讨一下，笔记是记了，可是没往脑子里记多少，以后还是要多长长脑子；最后还要说一下，后面的笔记改变策略，不会通篇记下来了，会挑重点，可圈点的地记。。
###express的入口文件app.js开一个server
步骤顺序

1. 引入依赖
2. 设置相关配置
3. 连接数据库（可选）
4. 定义中间件
5. 定义路由
6. 开启服务

A 首先，引入依赖：
    
    var express = require('express');
    var http = require('http');
    var path = require('path);
B 然后，实例化express.js对象

    var app = express();
C 其次，定义配置

    //port:设置服务器应该监听的端口号；访问环境变量中提供的端口号：process.evn.PORT
    app.set('port',process.evn.PORT || 3000);  
    //views：试图模版的绝对路径
    app.set('views',path.join(__dirname,'views'));
    //所使用的模版引擎：jade,ejs...
    app.set('views engine','jade');
    
D 接下来，是中间件，框架中的主干部分现在还不太懂，第六章具体介绍
E 下一模块是定义路由：其方式是在app.WERB(url,fn1,fn2...)中，而VERB的值有以下
    
    * all: 捕获每一个请求
    * get: 捕获GET请求
    * post: POST请求
    * put:  PUT请求
    * del:  捕获DELETE请求（dledte 删除对象的属性   ）
    
    
    app.all('*',function(req,res){
        res.render('index',{msg:'welcome to the practical Node.js'      })
    )
res.render(viewName,data,callback(error,html))其中如下，render()相当于调用res.end()，会结束响应，在render后的中间件中的链不会进行任何处理

* viewName :带有文件名扩展的模版名或未设置宽展的模版引擎
* data ： 一个由locals传递的可选对象，如jade中msg
* callback：回调函数，由错误或者HTML绘制完成后调用

F 启动服务

    http.creactServer(app)
        .listen(
            app.get('port'),
            function(){
            console.log('start')
        );
        



###模版引擎 jade、handlebars
模版引擎是一个库，或是一个使用一定规则／语言来解释数据或渲染试图的框架。
这里主要介绍jade，1是因为jade相对的简化，2是个人接触过 比较好理解

####jade语法

1. 标签
一行开头的人和文本都会被解析成HTML标签，jade主要优势是为HTML元素同时渲染闭合和开始标签，标签后面的文本和空格会被解析成内连HTML文本的内容

        Body
            div
                h1 Practical Node.js
                p The only book modt people will ever need
            div
                footer &copy; Apress
            
    上面的模版会输出：
    
        <body>
            <div>
                <h1>Practical Node.js</h1>
                <p>The only book modt people will ever need</p>
            </div>
            <div>
                <footer>&copy; Apress</footer>
            </div>
        </body>
        
2. 变量／数据
locals：传给jade模版的数据称为locals。要输出的一个变量的值，使用等号＝。

        h1= title
        p= body
        (locals):
        {
            title:'Express.js Guide',
            body:'The Comprehensive Book on Express.js;
        }
    输出的html
    
        <h1>Express.js Guide</h1>
        <p>The Comprehensive Book on Express.js</p>
        
    
3. 属性
属性紧跟在标签的名字之后，用括号括起来，格式是name=value,多个以，隔开。

        a(href='http://expressjsquide.com',title='express.js guide')
有时一个属性的名字必须是动态的，只需要使用该变量的名字，符号｜允许我们在新的一行里写HTML节点的内容

        a(href=url,data-active=isActive)
        lable
            input(type='checkbox',checked=isChecked)
            | yes / no
        (locals):
        {
            url:'/logout',
            isActive:true,
            isChecked:false
        }
上面的模版输出

        <a href='/logout' data-active=true></a>
        <lable>
            <input type='checkbox' checked=false>
            yes/no
            </input>
        </lable>
        
4. 字面量
可直接在标签名之后写类和ID，如果没有写标签名，则默认是div标签

        div#content
            p.lead.center
                | this is content
                #side-bar.pull-right
5. 文本

        | this is content
6. style和script块
style.  script.
        
        script.
            console.log(this is function)
            
7. 如果要在模版编译时使用JavaScript代码，可用-开始，或标签后跟=、!=连接。

        － var arr = ['a','b','c']
        ul
            - for (var i = 0;i<arr.length;i++)
                li
                    span= i
                    span!= 'unescaped:' + arr[i] + 'vs'
                    span= 'escaped:' + arr[i]
                    
    生成以下
        
        <ul>
            <li>
                <span>0</span>
                <span>unescaped a vs</span>
                <span>escaped a</span>
            </li>
            <li>
                <span>1</span>
                <span>unescaped b vs</span>
                <span>escaped b</span>
            </li>
            <li>
                <span>2</span>
                <span>unescaped c vs</span>
                <span>escaped c</span>
            </li>
        </ul>
    
8. 注释 
如果要在页面里面输出，就用//;若不想输出，就用//-

        //content goes here
        //- todo change this to a class
    
9. 读取变量
读取变量的值是通过#{name}来实现的。注：不要在javascript(-)里使用它。

        - var title= 'express.js Guide'
        p Read the #{title} in PDF,MOBI and EPUB
        
10. mixin
类似scss里的，就是声明 mixin name(param,param1...),调用时+name(data)

        mixin row(items)
            tr
                each item,index in items
                    td= item
            
        mixin table(tabelData)
            table
                each row,index in tabelData
                    +row(row)
                    
        - var node = [{},{},{}]
        +table(node)
11. include
把逻辑提取到单独文件里，让多个文件重用它。自顶向下

        include ./includes/header
        
12. extend
自底向上，包含的文件他要替换掉哪一部分，格式是extend filename和block blockname;

        在文件file_a里：
        block header
            p some default text
        block content
            p Loading ...
        block footer
            p copyright
        在file_b文件里：
        extend file_a
        block header
            p very specific text
        block content
            .main-content
终于end了。。。。