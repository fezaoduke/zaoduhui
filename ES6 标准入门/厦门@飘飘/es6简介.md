es6简介

	babel转码器

	配置文件.babelrc

		存放项目根目录

		设置转码规则和插件

			presets

				设定转码规则

					es2015转码规则：babel-preset-es2015

					react转码规则：babel-preset-react

					es7不同阶段语法提案转码规则（共4个阶段）

						babel-preset-stage-0

						babel-preset-stage-1

						babel-preset-stage-2

						babel-preset-stage-3

			plugins

	命令行转码：babel-cli

		标准输出：babel xx.js

		写入一个文件：babel xx.js --out-file xx.js/babel xx.js -o xx.js

		整个目录输出：babel src --out-dir lib / babel src -d lib

		生成source map文件：babel src -d lib -s

	babel-node

		babel-cli自带babel-node

		提供一个支持es6的REPL环境，可直接运行es6

			REPL：交互式解析器

				退出：.exit/ctrl+c两次

		\_\_dirname：当前执行的JS所在的文件夹

		\_\_filename：当前执行的js所在的路径

		process.cwd()：当前执行node.exe的路径

	babel-register

		作用改成require命令

		每当使用require加载.js,.jsx,.es,.es6后缀文件，就会先用babel转码

		它是实时转码，适合在开发环境使用

		只会对require命令加载的文件转码，不会对当前文件转码

	babel-core

		需要调用babel的api进行转码，则需要core模块

	babel-polyfll

		默认只转换新的js语法，不转换新的api

	浏览器环境

		babel6.0开始，不再直接提供浏览器版本，只能通过构建工具构建出来

		实时转码，对性能会有影响，在生产环境中需要加载已经转码好的脚本

		babel-core@5.x版本

		babel-standalone

	与其他工具配合

		elsint，babel-eslint

		.eslintrc

	Traceur转码器

		script，type为module属性值

​
