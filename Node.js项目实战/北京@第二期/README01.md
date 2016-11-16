###第一章 安装Node.js及相关知识点
    写在前面：个人使用Mac系统，所以后面的安装运行都在Mac环境，其他方法可自行查找。
####安装方法
>1. 一般情况下，系统已安装HomeBrew，可直接在命令行中运行以下命令
>>>brew install node 
>>>brew install npm  (npm为包管理工具，一般安装node时就安装了npm)
>2. 检查安装 
>>>npm -v   
>>>node -v  
>3. 进入node虚拟运行环境REPL
>>>node(可在此执行js和node.js代码)
>4. 加载node.js脚本 
####基础语法
***基本数据类型***(Boolean、String、Number、RegExp)
***特殊数据类型***
Buffer 做数据存储(如从文件系统中读取内容或者接受网络包内容等)
***对象字面量***
```js
var obj={
    color:'green',
    type:'auv',
    owner:{
        ...
    }
}
```
***函数*** 函数也是对象
    创建函数
    方法1. function f (){....}    可变量提升
    方法2. var f = function(){...}   只能先定义在调用
####node.js中的全局变量和保留字
> * process
> * global
> * module.exports和export

    访问进程相关信息 console.log(process.pid);
        导入和导出模块：导出：exports.mess=mess;
                     引用：var mess= require('./routes/messages.js');
                     推荐使用var mess = require(path.join(__dirname,'routes','messages'))    
####Node.js的核心模块
> * http
http是Node.js从HTTP服务器获取相应内容的主要模块
>> * http.createServer():返回一个新的Web服务器对象
>> * http.listen():在指定的主机名和端口上建立连接
>> * http.createClient():建立一个可以向其他服务器发送请求的客户端
>> * http.ServerRequest():将请求信息传递给request处理事件
>>> * data:消息题数据被接受时发出该事件
>>> * end:每次请求只会触发一次
>>> * request.method():字符串格式的请求方法
>>> * request.url():请求的URL字符串
>> * http.ServerResponse():作为请求处理事件输出内容
>>> * response.writeHead():想请求的客户端发送响应头
>>> * response.write():想请求的客户端发送相应内容