##使用cordova插件

###安装
+ 查找插件命令 >例如查找消息通知插件  cordova plugin search notification
+ 安装插件 >例如消息提醒插件 cordova plugin add org.apache.cordova.dialogs 

###具体使用
   >在应用和插件没有初始化之前不能使用插件，deviceready事件在初始化完毕调用

   两种回调方式
   1. 用javascript原生的addEventListener方法
   2. 使用$ioicPlatform.ready方法


###Angular和Cordovar陷阱
Angular有一个digest loop的内容，，它是一个密闭系统。遇到的常见问题是如何让Angular知晓digest loop外围的更新情况。需要手动执行$scope.$apply()方法来强制Angular更新视图。

###ngCordova
创建了类cordova插件作为angular服务

1. ionic add ngCordova
2. <scrip src="lib/ngCordova/dist/ng-cordova.js">
3. angular.module('App',['ionic','ngCordova'])

*书上还有两个关于ngCordova的例子，有兴趣的自己去看看*

>到这里这本书理论上的知识就差不多了，接下来的时间打算将书上的例子，连接上真机来预览效果，
感觉要配置的东西好多。。。。