### 第四期活动

很幸运的参加了第四期的读书活动。今天大致翻了一下收到的书，这本书还是用的ionic1，所以决定在接下来的学习中对照着ionic的官网同时学习。

### create ionic2 

1. $ npm install -g ionic cordova
2. $ ionic start MyIonic2Project tutorial --v2(tutorial是这个项目的模版，--v2是告诉用ionic2来创建demo)
3. $cd MyIonic2Project
4. $ ionic serve就成功跑起来这个demo了


### 创建一个空白的项目

1. ionic start mydemo blank --v2
2. 



### angular2 

1. angular2中核心的三个部分 Route Module、component
2. angular2的组件构成一个组件树。
3. angular2采用的是单项数据流，这个是和angular1不同的。angular1中所有的组件的数据流是构成的图。
4. 如果在一个很大的项目中有很多的组件就会构成一个巨大的组件树，在angular1中是采用全局遍历的方式做脏值检测（变更检测），这个是效率很低的。在angular2中引入了一个不可变数据类型这个东西。当组件树的一个叶子结点的状态发生变化的时候，可以定位到这个组件到根组件的路径然后只刷新这条路径就可以。比遍历整个组件树的效率高多了。
5. 一个小工具，https://github.com/compodoc/ngd 这个可以生成angular2的组件树。当项目很大的时候，用这个来构建自己的项目的组件树会很方便。
6. https://angular.cn/docs/ts/latest/cookbook/ngmodule-faq.html 关于ngModule的相关问题。
7. angular2中路由是一个独立引入的。angular2中路由是由path和component来组成的。这样在打包的时候是会打包到一个js文件中。对于大型项目这样做肯定是不合理的。就需要用到异步路由。在angular2中异步路由是用ngModule和loadChildren来实现的。loadChildren是放对应的模块的。在没有进入对应module的时候就不去加载那一部分的东西。这样可以减少文件的体积。不过这样同时页多了http的请求。所以在组件划分的时候要权衡文件体积和http请求两者。
8. 在pipe里面是不让直接返回html标签的。因为angular2的安全机制，他会认为向html里面插入html标签是不安全的。
9. 路由守卫 通过canActive来实现。
10. form表单中有一个formbuild来创建表单。内置的数据校验规则有8种。自定义校验规则就是自己创建了一个directive。
11. 一个很强大的前端自动化测试工具 https://github.com/alibaba/f2etest


#### angular2的核心思想

 DI 依赖注入，angular2中是构造器注入。注射器本身也是一个树形结构。子注射器可以访问父注射器上面的方法。每一个HTML标签上面都会有一个注射器实例。@Ingectable是@Component的子类。
 
 ### Rxjs
 
 不严谨的说，Rxjs是promise的增强版。
 Rxjs可以处理一系列的值。
 
 #### 三个不同的核心点
 1. Observable是可以中途取消的，promise是做不到的。
 2. Rxjs可以连续发射很多值。 setInterval
 3. Observable提供了很多的工具函数，最常用的是filter和map