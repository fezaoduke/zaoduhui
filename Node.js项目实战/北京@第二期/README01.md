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