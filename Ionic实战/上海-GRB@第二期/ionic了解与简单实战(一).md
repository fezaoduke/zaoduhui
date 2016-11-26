##第五章主要是介绍了选项卡，高级列表和表单组件

###选项卡
 1. 主要是ionTabs和ionTab两个选项卡组件,title属性是必要的。
 2. 需要使用ionNavView来加载组件，填充选项卡。只能有一个ionNavView是未命名的,为默认视图
 3. 每个选项卡有一个ui-sref属性，将选项卡图标转换为按钮，实现选项卡之间的切换，ui-sref与正常的href属性类似，会基于名字链接到相应的状态
```
<ion-tabs class="tabs-icon-top tabs-positive">

	  <ion-tab title="Rates" icon-on="ion-social-bitcoin" icon-off="ion-social-bitcoin-outline" ui-sref="tabs.rates">
	    <ion-nav-view name="rates-tab"></ion-nav-view>
	  </ion-tab>

	  <ion-tab title="History" icon-on="ion-ios-analytics" icon-off="ion-ios-analytics-outline" ui-sref="tabs.history">
	    <ion-nav-view name="history-tab"></ion-nav-view>
	  </ion-tab>

	  <ion-tab title="Currencies" icon-on="ion-ios-cog" icon-off="ion-ios-cog-outline" ui-sref="tabs.currencies">
	    <ion-nav-view name="currencies-tab"></ion-nav-view>
	  </ion-tab>

</ion-tabs>
```


###ui-router的嵌套路由特性，要么回来声明带层级的状态
```
angular.module('App', ['ionic', 'highcharts-ng'])

.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tabs', {
      url: '/tabs',
      abstract: true,//将选项卡的状态改成抽象，因为你要使用它的子选项卡
      templateUrl: 'views/tabs/tabs.html'
    })
    .state('tabs.rates', {
      url: '/rates',//实际映射的url为/tabs/rates
      views: {
        'rates-tab': {//视图的名字必须与ionNavView的名字一致
          templateUrl: 'views/rates/rates.html',
          controller: 'RatesController'
        }
      }
    })
    .state('tabs.history', {
      url: '/history?currency',
      views: {
        'history-tab': {
          templateUrl: 'views/history/history.html',
          controller: 'HistoryController'
        }
      }
    })
    .state('tabs.currencies', {
      url: '/currencies',
      views: {
        'currencies-tab': {
          templateUrl: 'views/currencies/currencies.html',
          controller: 'CurrenciesController'
        }
      }
    })
    .state('tabs.detail', {
      url: '/detail/:currency',
      views: {
        'rates-tab': {
          templateUrl: 'views/detail/detail.html',
          controller: 'DetailController'
        }
      }
    });

  $urlRouterProvider.otherwise('/tabs/rates');
})
```

###下拉刷新组件
+ ionRefresher：实现下拉刷新
```
    <ion-refresher on-refresh="load()" pulling-text="Pull to Refresh"></ion-refresher>
```    
组件本身不知道何时数据加载完毕，不会自动隐藏，需要广播事件通知ionRefresher加载完毕
```
 $scope.load = function () {
    $http.get('https://api.bitcoinaverage.com/ticker/all').success(function (tickers) {
      angular.forEach($scope.currencies, function (currency) {
        currency.ticker = tickers[currency.code];
        currency.ticker.timestamp = new Date(currency.ticker.timestamp);
      });
    }).finally(function () {
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
```
+ ionPopverView:显示帮助信息,弹出页面占据一部分屏幕
```
<ion-popover-view>
  <ion-header-bar>
    <h1 class="title">About Bitcoin</h1>
  </ion-header-bar>
  <ion-content>
    <div class="padding">This shows the last bitcoin transaction price for a currency and compares it to the 24 hour rolling average rate.</div>
    <div class="padding">Data is available up to once a minute.</div>
    <div class="padding">The data for this application is from the <a href="https://bitcoinaverage.com/api">Bitcoin Average</a> API.</div>
  </ion-content>
</ion-popover-view>
```

声明弹出框url并把父作用域设置为它的作用域
```
 $ionicPopover.fromTemplateUrl('views/rates/help-popover.html', {
    scope: $scope,
  }).then(function (popover) {
    $scope.popover = popover;
  });
```

当视图销毁时会广播,防止内存泄露，需要销毁弹出框，
```
 $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
```  
###Hightcharts以及angular封装的highcharts-nd库的使用
>之前公司用过，我就不详细介绍了
主要是用hightchart标签,配置信息以及数据放在$scope.chart来设置
```
<highchart config="chart"></highchart>
```
###重新排序和开关组件
ionReorderButton支持重新排序，只能用在ionList指令，设置reordering的状态true或false显示隐藏重新排序图标
```
<ion-nav-buttons side="primary">
    <button class="button" ng-click="state.reordering = !state.reordering">Reorder</button>
</ion-nav-buttons>


 <ion-reorder-button class="ion-navicon" on-reorder="move(currency, $fromIndex, $toIndex)"></ion-reorder-button>
```  
ionToggle给列表元素添加开关,使用复选框来记录开关值，开关的css样式覆盖复选框的样式
```
 <ion-item class="item-toggle" ng-repeat="currency in currencies">
        {{currency.code}} - {{currency.text}}
        <label class="toggle toggle-balanced">
        <input type="checkbox" ng-model="currency.selected">
          <div class="track">
            <div class="handle"></div>
          </div>
        </label>....
```        

###其他知识点
+ angular.foreach的用法遍历数据
+ ngIf用来针对多种情况显示不同的视图
+ factory注册数据服务来实现数据的共享
+ ionFooterBar组件放在ionContent后面，会自动固定在选项卡上面
+ 标记的用法：给元素加上badge和不同的badge-[color]类来标记不同的数据
+ $stateParams可以获取页面间状态传递的参数
+ $state.go方法和模板中的ui-sref作用一样，可以用来切换状态
+ 缓存起来的数据对应一个url，容易赞成视图错乱，通过监听$ionicView.enter时间重置数据模型可以解决问题
```
 $scope.$on('$ionicView.beforeEnter', function() {
    $scope.history = {
      currency: $stateParams.currency || 'USD'
    };
  });
```
+ 状态间传递参数的形式（get请求）
参数放在路径传递：'/detail/:currency'
参数作为params传递：'/history/?currency'  
+ 切换选项卡时会触发$stateChangeStart事件

>总感觉自己写的好乱，文笔太差，有待提高！

