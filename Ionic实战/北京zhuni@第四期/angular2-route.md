### 路由指令

1. 在app.html中设置base地址
2. 从@angular／router中倒入热水相应模块
3. 路由对应的视图是放在<router-outlet></router-outlet>中

### locationstrategy

路由器导航到新的路由时，会改变地址栏的url，浏览器的history记录也会 变化。这个是用来html5的pushState来实现的。这个时候并不会像服务器发起请求，这个url其实是本地的。在老旧的浏览器中只要url变化就会向服务器发起请求，除非变化时位于#后面。如果没有非常特殊的需求，都应该采用html5的这种方式，这种策略也为服务端渲染预留了空间。默认的就是PathLocationStrategy，这种就是支持html5的。如果要使用HashLocationStrategy风格就在RouterModule.forRoot()的第二个参数传入{ useHash: true }

1. 在AppModule里面通过RouterModule.forRoot()来注册，在其余的特性模块中则是通过RouterModule.forChild()来单独注册自己的路由。


### 需要注意的地方
在自己的模块中写了路由，然后在appModule中注册的时候要注意顺序，因为如果在AppRouting中有写**匹配pageNotFound的话，如果把子模块路由放在app路由的后面，则会导致直接匹配到了404页面。会阻断子路由的匹配。

### 带参数的路由

它是用路由器router的navigate方法。如果想html链接，可以把相同的语法放在RouterLink中。

#### 在视图中获取路由的参数
路由器从URL中解析出路由参数，通过ActivatedRoute服务来把她提供给对应的componet

### 在子模块中还有路由插座的话

子模块的路由定义要放在children中

