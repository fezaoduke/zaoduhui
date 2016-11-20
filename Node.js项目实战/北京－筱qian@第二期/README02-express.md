###util模块：提供调试用的工具方法
* util.inspect() 返回一个由对象转换而成的字符串
        
        util.inspect({name:'yyy',age:34,sex:'feman'})
         '{ name: \'yyy\', age: 34, sex: \'feman\' }'
         
* querystring模块处理查询字符串的工具

    url部分：protocol协议:http ;slashes:是否使用双斜杠；host 域名；port：端口；hostname:主机名；hash：锚点；query:发送给服务器的数据；path:路径；href:

1、url.parse('路径')   //解析成URL对象
    
    > url.parse('http://www.cnblogs.com/yxiaoqian/p/5809323.html')
    Url {
      protocol: 'http:',
      slashes: true,
      auth: null,
      host: 'www.cnblogs.com',
      port: null,
      hostname: 'www.cnblogs.com',
      hash: null,
      search: null,
      query: null,
      pathname: '/yxiaoqian/p/5809323.html',
      path: '/yxiaoqian/p/5809323.html',
      href: 'http://www.cnblogs.com/yxiaoqian/p/5809323.html' }

2、url.format({url对象})  //合成路径

3、url.resolve('url路径','url路径')      //合并路径

4、序列化对象：querystring.stringify({...},''/',')     //将对象序列化成 以&或，连接的字符串

    > querystring.stringify({name:'yyy',age:43,sex:'feman'})
    'name=yyy&age=43&sex=feman'

5、反序列化字符串：querystring.parse('',',')         //将字符串反序列化为对象

* fs主要处理文件系统相关的操作，读写文章等
    
1. fs.readFile():异步读取文件内容
2. fs.writeFile():异步写数据到文件中

        fs.readFile(path.join(__dirname,'../data/cus.csv'),{encoding:'utf-8'},function(err,data){
        if(err)throw err;
        console.log(data);
        });
        fa.writeFile('message.txt','Hello',function(err){
        if(err)thrpw err;
        console.log('Write is done.')
        })

* HTTP创建一个简单的服务器

        var http = require('http');
        http.creactServer(function(req,res){
        res.writeHead(200,{'Content-Type':'text/plain'});
        res.end('hello world')      
        }).listen(1337,'127.0.0.1');
        console.log('Server running at http://127.0.0.1:1337/');
        
###Express.js
是基于Node.js中的http模块和Connect组件的WEB框架，提供良好的结构（试图、路由、模型）
1. 全局安装 npm install express -g 
2. express XXXX
3. npm init     //创建package.json配置文件
4. npm install 依赖声明    中间件：包涵一些能够做的独立执行函数
5. node xxx.js  运行

* 解析app.js文件  
1. 引入依赖
    
        `var express = require('express');
        var http = require('http');
        var path = require('path');
        var app = express();     //实例化express对象
2. 设置相关配置

        `app.set('port',process.evn.PORT || 3000);
        app.set('views',path.join(__dirname,'views'));
        app.set('views enqine','jade');
3. 连接数据库
4. 定义中间件
5. 定义路由
6. 开启服务