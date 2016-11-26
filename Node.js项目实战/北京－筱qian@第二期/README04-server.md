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
        
