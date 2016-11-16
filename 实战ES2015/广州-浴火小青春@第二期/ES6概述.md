# ES6 概述
## ES6的好处很多，大致有以下几点：
 1.  ### js是一种只花了10天就被发明出来的语言，所以有很多不完善的地方。ES6完善了语法糖，让前端开发者获得了更好的开发体验。简化了一些语法，大大的提高了代码的简洁程度和可读性
 2.  ### 工程上的优势： 
     - 模块化：新增的对原生的模块的支持（虽然现在没有一个浏览器能够支持），现在的是通过其他的比如require.js，browserify,webpack等工具来实现
    
     - 组件化：把不同的功能区域封装成一个个组件，广义上的组件同时包含有**html**,**css**,**js**,就拿使用过的vuejs来说，在后缀为.vue的单文件里，同时含有**html**,**css**,**js**的代码
     
     - 内存安全 : “之前版本的js，因为只有变量但是没有常量的设计很容易导致内存不安全，数据丢失或者被恶意修改”

### 现在浏览器还没有完全支持ES6的许多特性 [查看支持度](https://kangax.github.io/compat-table/es6/)，ps:不过看各家的最新版本支持率已经在90%左右了，可喜可贺。所以我们需要工具把ES6转成ES5在浏览器中运行，我分享下我平常的开发配置。
```javascript
var gulp=require('gulp');
var uglify=require('gulp-uglify');
var minifyCSS=require('gulp-minify-css');
var less=require('gulp-less');
var sass=require('gulp-sass');
var livereload=require('gulp-livereload');
var gutil = require('gulp-util');
var plumber=require('gulp-plumber');// 错误处理
var connect=require('gulp-connect');
var babel=require('gulp-babel');
var browserify = require('browserify');
var source=require('vinyl-source-stream');


// 使用gulp-cache

// 监听html改动，实时刷新
gulp.task('html',function(){
	gulp.src('./*.html')
	    .pipe(connect.reload())
})

// 压缩脚本
gulp.task('script',function(){
	return gulp.src('src/js/*.js')
		.pipe(babel({
      		presets: ['es2015']
         }))
	    .pipe(uglify())
	    .pipe(gulp.dest('dist/js'))
	    .pipe(connect.reload())
})

// 压缩css,发布
gulp.task('css',function(){
	gulp.src('src/css/*.css')
	  	.pipe(plumber())
	    .pipe(minifyCSS())
	    .pipe(gulp.dest('dist/css'))
	    .pipe(connect.reload())
})

// 编译less，压缩，发布，自动刷新
gulp.task('less',function(){
	gulp.src('src/less/**.less')
	    .pipe(plumber())
		.pipe(less())
		.pipe(gulp.dest('src/css/'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('dist/css'))
	    .pipe(connect.reload())
})

// 编译sass，压缩，发布，自动刷新
gulp.task('sass',function(){
	return gulp.src('src/sass/**/*.scss')
		  .pipe(plumber())
		  .pipe(sass())
		  .pipe(gulp.dest('src/css/'))
		  .pipe(minifyCSS())
		  .pipe(gulp.dest('dist/css'))
		  .pipe(connect.reload())
})

gulp.task("browserify", function () {
    var b = browserify({
        entries: "dist/js/hello.js"
    });

    return b.bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("dist/js"));
});


//开启服务器
gulp.task('webserver',function(){
	connect.server({
		livereload:true
	});
})

gulp.task('auto',function(){
	gulp.watch('src/js/*.js',['script','browserify'])
	gulp.watch('src/css/*.css',['css'])
	gulp.watch('src/less/**.less',['less'])
	gulp.watch('src/sass/**/*.scss',['sass'])
	gulp.watch('./*.html',['html'])
})


gulp.task('default',['html','sass','less','css','script','auto','webserver','browserify'])
```

文件目录大概如下：
- dist
     - img
     - css 
     - js
- src
     - img
     - css 
     - js
     - sass
     - less   
- index.html
### 不过也有在线运行的环境
    [jsbin](http://jsbin.com/)
    [babel.io](https://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=es2015%2Creact%2Cstage-2&code=)

# 分享一下ES6的学习资源：
- [阮老师的ES6入门教程](http://es6.ruanyifeng.com/)
- [Understanding ECMAScript 6 (英)](https://leanpub.com/understandinges6/read)
- [es6 fiddle](http://www.es6fiddle.com/)