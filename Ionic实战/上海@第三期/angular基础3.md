#bootstrap布局
页面引入bootstrap,通过bootstap编写导航条和左侧菜单栏右侧内容区的网页布局。

#angular实现数据绑定及视图展示与交互
//编辑器控制器从服务加载笔记（js/editor.js）
    $http.get('/notes').success(function (data) {
        $scope.notes = data;
        }).error(function (err) {
        $scope.error = 'Could not load notes';
    });

//模板绑定An指令把数据从$scope中显示出来
    <div class="panel-body">
        <p ng-if="!notes.length">No notes</p>
        <ul class="list-group">
            <li class="list-group-item" ng-repeat="note in notes">{{note.title}}<br/>
            <small>{{note.date | date:'short'}}</small></li>
        </ul>
    </div>

//向笔记列表添加ngClick(index.html)
    <div class="panel-body">
        <p ng-if="!notes.length">No notes</p>
        <ul class="list-group">
            <li class="list-group-item" ng-repeat="note in notes" ng-click="view($index)">{{note.title}}<br/>
            <small>{{note.date | date:'short'}}</small></li>
        </ul>
    </div>
$index值被传入视图中，它是ngRepeat提供的一个特殊变量

//编辑器控制器中的view函数（js/editor.js）
    $scope.view = function (index) {//声明一个名为view的新$scope方法，接受被单击元素的下标
        $scope.editing = false;//把editing状态设置为false,让用户只能查看元素不能编辑
        $scope.content = $scope.notes[index];//给content模型设置一个新模型，包含被单击的笔记
    };

//修改模板，使其可以展示笔记（index.html）
    <div class="panel panel-default" ng-hide="editing">
        <div class="panel-heading">
            <h3 class="panel-title">{{content.title}}<botton class="btn btn-primary btn-xs pull-right">Edit</botton></h3>
        </div>
        <div class="panel-body">{{content.content}}</div>
        <div class="panel-footer">{{content.date|date:'short'}}</div>
    </div>
    <form name="editor" class="panel panel-default" ng-show="editing">
右侧有两个模块。使其同一时刻只显示一个。第一个模块是展示笔记用的，第二个模块是编辑笔记用的。设置的$scope.editing属性决定显示哪个版块。

//创建一个指令，用来解析Markdown格式的笔记,将markdown转换成HTML指令（js/app.js）
    angular.module('App1', []).directive('markdown',function () {
        var converter = new Showdown.converter();//创建showdown转换器
        return {//命令会返回一个对象，用来声明命令的设置
            scope:{
            markdown:'@'//声明自定义作用域，等待值被赋给maekdown属性
        },
        link:function (scope,element,attrs) {//声明link函数，它会把markdown转换成html
            scope.$watch('markdown',function () {//使用作用域观察器来同步模型改动
            var content = converter.makeHtml(attr.markdown);//把markdown转换成HTML并存入content变量
            element.html(content);//把转换好的html内容注入元素
            })
        }
    }
});



    






