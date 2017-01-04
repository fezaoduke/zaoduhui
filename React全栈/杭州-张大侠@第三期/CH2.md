# Chapter 2 webpack
> Note：本章内容看的不是很明白，先记录@zelda

## webpack特点
webpack、RequireJS、browserify模块规范、非JavaScript模块支持、构建产物、使用等方面进行比较。
webpack特色：
- 代码拆分（code splitting）方案
- 智能的静态分析
- 模块热替换（Hot Module Replacement）

### 基于webpack进行开发
#### 安装
> npm install webpack -g //全局安装最新版本
> npm install webpack@1.12.14 -g //安装指定版本1.12.14
> npm install webpack —save-dev //安装到dev-dependencies中

#### 简单Hello World应用
1. hello模块——生成文本“Hello World!”（hello.js）
> module.exports = “Hello World!”;

2. index模块——打印文本（index.js）
> var text = require(“./hello”);
> console.log(text);

3. 页面内容（index.html）
> \<!DOCTYPE html\>
> \<html\>
> \<head\>
> \<meta charset="utf-8"\>
> \<title\>Hello\</title\>
> \</head\>
> \<body\>
> \<script src="./bundle.js"\>\</script\>
> \</body\>
> \</html\>

> web pack ./index.js bundles.js
webpack将index.js作为项目的入口文件进行构建，并将结果输出为bundles.js。

主要做两部分工作：
- 分析得到所有必须模块并合并
- 提供了让这些模块有序、正常执行的环境

#### 使用loader
loader作用于应用中资源文件的转换行为。
任何类型的模块（资源文件），理论上都可以通过被转化为JavaScript代码实现与其他模块的合并与加载。
![][image-1]
但需要注意的是这种方式添加的样式内容生效时间被延后。
#### 配置文件
webpack.config.js
	module.exports = {
	//configuration
	entry: path.join(—dirname, ‘index’), //项目的入口文件
	output:{
	path: —dirname, //输出目录
	filename: ‘bunde.js’, //输出文件名
	publicPath: ‘dist/’ //输出目录所对应的外部路径（从浏览器访问）
	},
	module: {
	loaders: [ //对于模块中的loader使用的配置
	{
	test: /\.css$/,
	loaders: [‘style’,’css’]
	}
	]
	},
	plugins: [
	    new HtmlWebpackPlugin({
	        title: 'use plugin'
	    })
	]
	}

#### 使用plugin
与loader专注于处理资源内容的转换不同，plugin可以看成是为了实现那些loader实现不了或不适合在loader中实现的功能，如自动生成项目的HTML页面、向构建过程中注入环境变量、向块（chunk）的结果文件中添加注释信息等。
#### 实时构建
	webpack --watch
webpack-dev-server辅助开发和测试




[image-1]:	http://webpack.github.io/assets/what-is-webpack.png