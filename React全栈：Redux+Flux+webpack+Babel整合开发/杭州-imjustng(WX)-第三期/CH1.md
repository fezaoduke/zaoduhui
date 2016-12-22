# Chapter 1 现代前端开发
> Note：本章内容很重要，但是因为不是本书重点，所以介绍的很简单@zelda
从以下三个方面介绍现代前端开发技术：
- ES6——新一代的JavaScript语言标准
- Component组件和模块的发展历程
- 前端开发的常用工具：
	- 包管理器（Package Manager），用来下载和管理前端代码库
	- 任务流工具（Task Runner），用来执行一系列开发中的任务
	- 模块打包工具（Bundler），用来转换和合并前端代码的模式

## ES6 ——新一代的JavaScript语言标准
推荐《ECMAScript 6 入门》——阮一峰[http://es6.ruanyifeng.com/][1]
### 语言特性
1、`const`、`let`关键字
[http://es6.ruanyifeng.com/#docs/let][2]
2、函数
[http://es6.ruanyifeng.com/#docs/function][3]
- 箭头函数
> 可看做一种语法糖
> 箭头函数永远是匿名的
- this在箭头函数中的使用
- 函数默认参数
- Rest参数
3、展开操作符...
- 用于函数调用
- 用于数组字面量
- 对象的展开运算符
4、模板字符串
5、解构赋值
- 解构数组
- 解构对象
6、类class
> 原型链方式的一种语法糖
7、模块

### 使用Babel
一种多用途的JavaScript编译器，可把最新版本的JavaScript编译成当下可以执行的版本。
- 安装
	npm install babel-cli -g
- 配置
配置文件：.babelrc
Babel通过安装插件（plugin）或预设（preset，就是一组设定好的插件）来编译代码的。
	//.babelrc
	{
	   "presets": [],
	   "plugins": []
	}
总结：Babel的核心概念就是利用以一系列的Plugin来管理编译规则。


## 前端组件化方案
区分俩概念：模块（module）和组件（component）
`模块`：模块是语言层面的，在前端领域中，module一般都是指的是JavaScript Module，往往表现为一个单独的JS文件，对外暴露一些属性和方法。
`组件`：前端组件则更多是业务层面的概念，可以看做是一个可独立使用的功能实现，往往表现为一个UI部件（并不绝对）。
### JavaScript模块化方案
在ES6之前，JavaScript并没有原生的模块，通过各种约定或妥协实现了模块的特征。经历了如下阶段：全局变量+命名空间（namespace） → AMS&CommonJS → ES6模块
#### 第一阶段：全局变量+命名空间（namespace）
基于同一个全局变量，各模块按照各自的命名空间进行挂载。
经典案例：jQuery
> 如整个项目使用同一个全局变量window.foo，项目中所有模块都有其角色，模块内部一般通过简单的自执行函数实现局部作用于，避免污染全局作用域。
\_问题\_：
- 依赖全局变量，污染全局作用域的同时，安全性得不到保障
- 依赖约定命名空间来避免冲突，可靠性不高
- 需要依赖手动管理并控制执行顺序，容易出错
- 需要在最终上线前手动合并所有用到的模块

#### AMD&CommonJS
JavaScript模块化方案
- 仅仅需要在全局环境下定义require与define，不需要其他的全局变量
- 通过文件路径或模块自己声明的模块名定位模块
- 模块实现中声明依赖，依赖的加载与执行均由加载器操作
- 提供了打包工具自动分析依赖并合并

#### ES6模块
`tree shaking`

### 前端的模块化和组件化
基于命名空间的多入口文件组件 → 基于模块的多入口文件组件 → 单JavaScript入口组件 → Web Component

#### 基于命名空间的多入口文件组件
特点：
> 基于JavaScript“全局变量+命名空间”的模块化方案
> 不同资源分别手动引入（或手动合并）

#### 基于模块的多入口文件组件
特点：
> 一个AMD模块，为JavaScript实现
> 一个CSS（或LESS、SASS）文件，为样式内容
> 其他资源内容，往往不需要手动引入，组件会在其CSS视线中通过相对路径引入
我们使用时需要：
> 在JavaScript代码中require组件对应的模块
> 在样式代码中引入（CSS预处理器提供的import等方式）组件的样式内容

#### 单JavaScript入口组件（主流）
`browserify`、`webpack`

#### Web Component（浏览器支持不够）
主要包括：
- 自定义元素（Custom Element）
- HTML模板（HTML Template）
- Shadow DOM
- HTML的引入（HTML Import）


## 辅助工具
### 包管理器（Package Manager）
软件包管理器是指在计算机中自动安装、配置、卸载和升级软件包的工具组合。像Ubuntu的`apt-get`、Mac的`homebrew`、Python的`pip`、Ruby的\``Gem`，自从Nodejs出现以后，前端开发也有了许多的包管理器，`Bower`、`Component`、`Spm`以及_**`npm`**。_

#### 安装包
安装包有两种模式，一种是本地安装，一种是全局安装。
本地安装后会在当前目录生成一个`node_module`文件夹，并且将安装的包模块下载到这个文件夹中。
全局安装在全局中可以直接使用。
可以通过下面命令查看全局的包安装在什么位置。
> npm prefix -g

#### 使用package.json
当你的项目需要依赖多个包时，使用`package.json`是最好的办法。本质是一个JSON文件。
手工新建或者使用`npm init`命令填入各种信息生成`package.json`，一个`package.json `文件必须含有两个字段：“name”和“version”。

另外，在文件中可以定义两种类型的包：
- dependencies：在生产环境中需要依赖的包
- devDependencies：仅在开发和测试环节中需要依赖的包
> 使用npm install XXX —save可以安装XX并把它的信息自动写进package.json中的dependencies字段中
> 使用npm install XXX —save-dev可以安装XX并把它的信息自动写进package.json中的DevDependencies字段中
当执行`npm install`会自动寻找`package.json`，并安装项目所依赖的包。

#### 包和模块
包（package） vs 模块（module）
包是一个用package.json文件描述的文件夹或者文件
模块指的是任何可以被Node.js中require方法载入的文件

### 任务流工具（Task Runner）
#### Grunt
> npm install grunt-cli -g
有着非常完善的插件机制，插件是把各种工具和Grunt结合在一起的桥梁。
Grunt任务的配置是通过一个名为Gruntfile.js文件进行。
Grunt使用插件机制和Gruntfile.js实现了多任务的配置、组合和运行。

#### Gulp
> npm install -g gulp-cli
`gulpfile.js`
`Gulp`创新在于通过流的概念简化多个任务之间的配置和输出。

### 模块打包工具（Buldler）
#### browserify
#### webpack



[1]:	http://es6.ruanyifeng.com/
[2]:	http://es6.ruanyifeng.com/#docs/let
[3]:	http://es6.ruanyifeng.com/#docs/function