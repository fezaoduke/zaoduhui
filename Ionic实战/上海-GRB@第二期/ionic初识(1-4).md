#ionnic的初步认识

##生态系统：angular和cordova

cordova将web应用嵌入原生应用，cordova应用包装器加载webview,webview加载index.html,angular加载默认视图，渲染ionic组件用作UI

##环境的搭建

+ node的安装
+ 安装ionic CLI和cordova（可能由于国外服务器的原因，速度慢，建议用淘宝镜像cnpm） 
+ ionic start创建新项目，我本地生成的目录结构缺少ionic.config.json配置文件，需要自己添加
+ ionic serve可以启动预览项目,端口号8100
>配置模拟器，SDK等比较复杂，目前自己先在浏览器中预览效果

##angular的学习
  >由于angular自己在项目中用到，就不详细介绍了。

  控制器controller加载数据，数据绑定到$scope上，与视图绑定。

  将markdown格式的纯文本转换成HTML的指令的编写，需要引入Showdown库
  >具体指令的编写需要进一步的学习，指令是angular比较核心的部分

##ionic导航和核心组件

1. 配置导航,引入第三方路由框架ui-router，是导航的核心

导航和路由的区别：导航指的是用户在应用内部移动的动作；路由指应用内部的过程，控制导航时的具体行为
ionic的导航组件：ionNavBar(标题栏)和ionNavView（载入不同的视图）ionNavBackButton标题栏返回按钮
```
<ion-nav-bar class="bar-positive">
      <ion-nav-back-button class="button-clear">
        <i class="icon ion-ios-arrow-left"></i> Back
      </ion-nav-back-button>
    </ion-nav-bar>

    <ion-nav-view></ion-nav-view>
```
状态是ui-router的概念，状态对应当前需要显示的视图，包括视图对应的url，视图控制器的名字和视图对应的模板。
$stateProvider用来声明状态，$urlRouterProvider在请求无效时被使用。
```
angular.module('App', ['ionic'])

.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'views/home/home.html'
    })
    .state('reservation', {
      url: '/reservation',
      controller: 'ReservationController',
      templateUrl: 'views/reservation/reservation.html'
    })
    .state('weather', {
      url: '/weather',
      controller: 'WeatherController',
      templateUrl: 'views/weather/weather.html'
    })
    .state('restaurants', {
      url: '/restaurants',
      controller: 'RestaurantsController',
      templateUrl: 'views/restaurants/restaurants.html'
    });

  $urlRouterProvider.otherwise('/home');

})
```
2. 构建主视图
+ ionContent内容容器
+ 使用css组件并添加一个简单的链接列表
+ 给列表元素添加图标
```
<ion-view view-title="Aloha Resort" hide-back-button="true">
  <ion-content>
    <div class="list">
      <a href="#/reservation" class="item item-icon-left">
        <i class="icon ion-document-text"></i> See your reservation
      </a>
      <a href="#/weather" class="item item-icon-left">
        <i class="icon ion-ios-partlysunny"></i> Current weather
      </a>
      <a href="#/restaurants" class="item item-icon-left">
        <i class="icon ion-fork"></i> Nearby restaurants
      </a>
    </div>
  </ion-content>
</ion-view>
```
3. 其他子视图模板用差不多的方法
###一些小的知识点总结
   + 加载指示器$ionicLoading(show和hide方法)服务
   + $http加载外部数据
   + $scope.$broadcast广播事件
   + 无限滚动组件ion-infinite-scroll
   + 幻灯片组件ion-slide-box作为容器，ion-silide作为元素



*是第一次好好地写自己的读书笔记，再给自己点鸡汤，希望自己可以坚持下来，哈哈！*
