##1.获取项目文件
克隆chapter3仓库并检出step1的代码
$ git clone https://github.com/ionic-in-action/chapter3.git
$ git checkout step1


##2.启动开发服务器
项目中的server.js文件中配置了基于Express.js框架开发的一个简单的RESTful服务器
运行$ npm install,npm会检查依赖列表（package.json）并从Github上下载依赖，执行完成可以启动服务器了。通过$ node server会启动服
器并监听3000端口的请求
服务器是基于Node开发而成，Node有模块机制，可以重用特性。本例中用到的Express是Node非常有名的一个模块。Express有许多内置的特性可以用
构建HTTP服务器。本例中使用文件系统模块把笔记列表保存到JSON文件中。在www.expressjs.com中学习关于更多Express的知识


##3.加载数据：使用控制器来加载数据并显示在视图中
要将数据载入应用，需要使用An的$http服务，这样就可以使用HTTP请求来从Node服务器加载数据。在控制器函数中可以给函数声明任意数量的参数，An
通过名字来定位服务并注入控制器，将$http服务注入控制器并用它加载数据，这种技术叫作依赖注入（DI），是An一个非常强大的特性，可以让你的控制
使用各种服务。PS：An的服务并不是全局的，必须先注入再使用。


##4.Angular和异步方法
处理异步函数有两种主要的方法：回调和promise。An使用promise来进行异步函数调用


##5.过滤器：转换视图中的数据
{{notes|orderBy:'title'|limitTo:10}}
通过管道符号来使用过滤器，过滤器可以串联（即可以同时添加多个过滤器），上面的表达式使用了orderBy过滤器对数组排序，用另一个过滤器来取出数
中的10个元素（limitTo:10）




