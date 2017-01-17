#bootstrap布局
页面引入bootstrap,通过bootstap编写导航条和左侧菜单栏右侧内容区的网页布局。

#angular实现数据绑定及视图展示与交互
###编辑器控制器从服务加载笔记（js/editor.js）

    $http.get('/notes').success(function (data) {
        $scope.notes = data;
        }).error(function (err) {
        $scope.error = 'Could not load notes';
    });

###模板绑定An指令把数据从$scope中显示出来

    <div class="panel-body">
        <p ng-if="!notes.length">No notes</p>
        <ul class="list-group">
            <li class="list-group-item" ng-repeat="note in notes">{{note.title}}<br/>
            <small>{{note.date | date:'short'}}</small></li>
        </ul>
    </div>

###向笔记列表添加ngClick(index.html)

    <div class="panel-body">
        <p ng-if="!notes.length">No notes</p>
        <ul class="list-group">
            <li class="list-group-item" ng-repeat="note in notes" ng-click="view($index)">{{note.title}}<br/>
            <small>{{note.date | date:'short'}}</small></li>
        </ul>
    </div>
$index值被传入视图中，它是ngRepeat提供的一个特殊变量

###编辑器控制器中的view函数（js/editor.js）

    $scope.view = function (index) {//声明一个名为view的新$scope方法，接受被单击元素的下标
        $scope.editing = false;//把editing状态设置为false,让用户只能查看元素不能编辑
        $scope.content = $scope.notes[index];//给content模型设置一个新模型，包含被单击的笔记
    };

###修改模板，使其可以展示笔记（index.html）

    <div class="panel panel-default" ng-hide="editing">
        <div class="panel-heading">
            <h3 class="panel-title">{{content.title}}<botton class="btn btn-primary btn-xs pull-right">Edit</botton></h3>
        </div>
        <div class="panel-body">{{content.content}}</div>
        <div class="panel-footer">{{content.date|date:'short'}}</div>
    </div>
    <form name="editor" class="panel panel-default" ng-show="editing">
右侧有两个模块。使其同一时刻只显示一个。第一个模块是展示笔记用的，第二个模块是编辑笔记用的。设置的$scope.editing属性决定显示哪个版块。

###创建一个指令，用来解析Markdown格式的笔记,将markdown转换成HTML指令（js/app.js）

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
An渲染过程中使用link函数。这个函数会用到$scope.$watch特性，后者可以监听markdown内容的变化。当它检测到改动时，纯文本内容会被传入showdown转换器，然后把HTM
内容插入元素。作用域中的原内容还是纯文本版本，显示出来的是转换后的HTML。

###使用指令

    <div class="panel-body" markdown="{{content.content}}"></div>
把content.content模型赋值给markdown属性，这样就可以把模型的内容传入指令的独立作用域

###使用模型来管理内容编辑
编辑器有两个主要功能：编辑现有笔记和创建新笔记。左侧“New”按钮创建新笔记，添加create()方法

    $scope.create = function () {
        $scope.editing = true;
        $scope.content = {//使用空值重置content模型
            title:'',
            content:''
        }
    };

“Edit”按钮更新editing模型并将其设置为true
    
    <h3 class="panel-title">{{content.title}}<button class="btn btn-primary btn-xs pull-right" ng-click="editing = true">Edit</button></h3>

使用模型更新编辑器

    <div class="col-sm-6">
        <h3>Editor</h3>
        <textarea class="form-control editor" rows="10" ng-model="content.content" placeholder="Note Content" required></textarea>
    </div>
    <div class="col-sm-6">
        <h3>Preview</h3>
        <div class="preview" markdown="{{content.content}}"></div>
    </div>

###保存和删除笔记
添加save()方法
    
    $scope.save = function () {
        $scope.content.date = new Date();//把日期设置成这个笔记最后一次被编辑的日期
        if($scope.content.id){//检查这个笔记，从而判断是该更新已有笔记还是创建新笔记
            $http.put('/notes/'+$scope.content.id,$scope.content).success(function (data) {//发送put请求来更新笔记并在完成之后关闭编辑模式
            $scope.editing = false;
        });
        }else{
            $scope.content.id = Date.now();//创建新笔记，基于当前时间戳给它一个独一无二的id
            $http.post('/notes',$scope.content).success(function (data) {//发送post请求来创建一个新笔记，然后把新笔记加入笔记列表，最后关闭编辑模式
                $scope.notes.push($scope.content);
                $scope.editing = false;

            });
        }
    };
使用Angular表单进行验证
表单中有一个required属性，An会自动查找这个属性并在作用域中设置一些值来追踪表单是否有效。本例中，笔记需要标题和内容，如果其中之一为空，整个表单都是无效的。
本例中使用常规的表单元素并给它命名为editor，会给作用域中添加一个同名的新属性，如$valid、$invalid、$dirty和$pristine,这些值可以判断输入框是否有效或者是否被修改过。

    <button class="btn btn-primary" ng-click="save()" ng-disabled="editor.$invalid">Save</button>

删除笔记的方法remove()

    $scope.remove = function () {
        $http.delete('/notes/'+$scope.content.id).success(function (data) {//删除请求
            var found = -1;
            angular.forEach($scope.notes,function (note,index) {//遍历笔记数组，找到要删除笔记的下标
            if(note.id === $scope.content.id){
                found = index;
            }
        });
        if(found >= 0){
            $scope.notes.splice(found,1);//如果找到笔记，从An应用的笔记列表中删除
        }
        $scope.content = {//重置content模型，为下一个笔记做准备
            title :'',
            content :''
        }
        }).error(function (err) {
            $scope.error = 'Could not delete note';
        })
    }






    






