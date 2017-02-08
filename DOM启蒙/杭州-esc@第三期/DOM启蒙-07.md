# 《Dom启蒙》读书笔记


## 第10章 DOM中的javaScript

 
function loadJs(id,url,callback){  
    var script = document.createElement('script');  
    script.type = 'text/javascript';  
    script.src = url;  
    script.id = id;  
    script.onload = script.onreadystatechange = function(){  
        alert(script.readyState);  
        if(script.readyState  && script.readyState != 'loaded' && script.readyState != 'complete') return ;  
        script.onreadystatechange = script.onload = null  
        if(callback) callback();  
    }  
    document.body.appendChild(script);       
}  


##使用async异步下载并执行外部js文件

 一：同步加载
我们平时使用的最多的一种方式。
<script src="http://yourdomain.com/script.js"></script>
<script src="http://yourdomain.com/script.js"></script>
同步模式，又称阻塞模式，会阻止浏览器的后续处理，停止后续的解析，只有当当前加载完成，才能进行下一步操作。所以默认同步执行才是安全的。但这样如果js中有输出document内容、修改dom、重定向等行为，就会造成页面堵塞。所以一般建议把<script>标签放在<body>结尾处，这样尽可能减少页面阻塞。
二：异步加载
异步加载又叫非阻塞加载，浏览器在下载执行js的同时，还会继续进行后续页面的处理。主要有三种方式。
方法一：也叫Script DOM Element
(function(){
    var scriptEle = document.createElement("script");
    scriptEle.type = "text/javasctipt";
    scriptEle.async = true;
    scriptEle.src = "http://cdn.bootcss.com/jquery/3.0.0-beta1/jquery.min.js";
    var x = document.getElementsByTagName("head")[0];
    x.insertBefore(scriptEle, x.firstChild);		
 })();
<async>属性是HTML5中新增的异步支持。此方法被称为Script DOM Element 方法。Google Analytics 和 Google+ Badge 都使用了这种异步加载代码
(function(){;
    var ga = document.createElement('script'); 
    ga.type = 'text/javascript'; 
    ga.async = true; 
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js'; 
    var s = document.getElementsByTagName('script')[0]; 
    s.parentNode.insertBefore(ga, s); 
})();
但是这种加载方式执行完之前会阻止onload事件的触发，而现在很多页面的代码都在onload时还执行额外的渲染工作，所以还是会阻塞部分页面的初始化处理。
方法二：onload时的异步加载
(function(){
	if(window.attachEvent){
    	window.attachEvent("load", asyncLoad);
    }else{
    	window.addEventListener("load", asyncLoad);
    }
    var asyncLoad = function(){
    	var ga = document.createElement('script'); 
        ga.type = 'text/javascript'; 
        ga.async = true; 
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js'; 
        var s = document.getElementsByTagName('script')[0]; 
        s.parentNode.insertBefore(ga, s);
    }
)();
这种方法只是把插入script的方法放在一个函数里面，然后放在window的onload方法里面执行，这样就解决了阻塞onload事件触发的问题。
注:DOMContentLoaded与load的区别。前者是在document已经解析完成，页面中的dom元素可用，但是页面中的图片，视频，音频等资源未加载完，作用同jQuery中的ready事件；后者的区别在于页面所有资源全部加载完毕。
方法三：其他方法
由于JavaScript的动态性，还有很多异步加载方法： XHR Injection、 XHR Eval、 Script In Iframe、 Script defer属性、 document.write(script tag)。
XHR Injection(XHR 注入)：通过XMLHttpRequest来获取javascript，然后创建一个script元素插入到DOM结构中。ajax请求成功后设置script.text为请求成功后返回的responseText。
    //获取XMLHttpRequest对象，考虑兼容性。
    var getXmlHttp = function(){
        var obj;
        if (window.XMLHttpRequest)
            obj = new XMLHttpRequest();
        else
            obj = new ActiveXObject("Microsoft.XMLHTTP");
        return obj;
    };  
    //采用Http请求get方式;open()方法的第三个参数表示采用异步(true)还是同步(false)处理
    var xmlHttp = getXmlHttp();
    xmlHttp.open("GET", "http://cdn.bootcss.com/jquery/3.0.0-beta1/jquery.min.js", true);
    xmlHttp.send(); 
    xmlHttp.onreadystatechange = function(){
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            var script = document.createElement("script");
            script.text = xmlHttp.responseText;
            document.getElementsByTagName("head")[0].appendChild(script);
        }
    }		
XHR Eval：与XHR Injection对responseText的执行方式不同，直接把responseText放在eval()函数里面执行。
    //获取XMLHttpRequest对象，考虑兼容性。
    var getXmlHttp = function(){
        var obj;
        if (window.XMLHttpRequest)
            obj = new XMLHttpRequest();
        else
            obj = new ActiveXObject("Microsoft.XMLHTTP");
        return obj;
    };  
    //采用Http请求get方式;open()方法的第三个参数表示采用异步(true)还是同步(false)处理
    var xmlHttp = getXmlHttp();
    xmlHttp.open("GET", "http://cdn.bootcss.com/jquery/3.0.0-beta1/jquery.min.js", true);
    xmlHttp.send(); 
    xmlHttp.onreadystatechange = function(){
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            eval(xmlHttp.responseText);
            //alert($);//可以弹出$,表明JS已经加载进来。click事件放在其它出会出问题，应该是还没加载进来
            $("#btn1").click(function(){
                alert($(this).text());
            });
        }
    }		
Script In Irame：在父窗口插入一个iframe元素，然后再iframe中执行加载JS的操作。
    var insertJS = function(){alert(2)};
    var iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    var doc = iframe.contentWindow.document;//获取iframe中的window要用contentWindow属性。
    doc.open();
    doc.write("<script>var insertJS = function(){};<\/script><body onload='insertJS()'></body>");
    doc.close();
GMail Mobile：业内JS内容被注释，所以不会执行，在需要的时候，获取script中的text内容去掉注释，调用eval()执行。
    <script type="text/javascript"> 
    /* 
    var ... 
    */ 
    </script>
HTML5新属性：async和defer属性
defer属性：IE4.0就出现。defer属声明脚本中将不会有document.write和dom修改。浏览器会并行下载其他有defer属性的script。而不会阻塞页面后续处理。注：所有的defer脚本必须保证按顺序执行的。
    <script type="text/javascript" defer></script>
async属性：Html5新属性。脚本将在下载后尽快执行，作用同defer，但是不能保证脚本按顺序执行。他们将在onload事件之前完成。
    <script type="text/javascript" defer></script>
Firefox 3.6、Opera 10.5、IE 9和最新的Chrome和Safari都支持async属性。可以同时使用async和defer，这样IE 4之后的所有IE都支持异步加载。
没有async属性，script将立即获取（下载）并执行，期间阻塞了浏览器的后续处理。如果有async属性，那么script将被异步下载并执行，同时浏览器继续后续的处理。
总结： 对于支持HTML5的浏览器，实现JS的异步加载只需要在script元素中加上async属性，为了兼容老版本的IE还需加上defer属性；对于不支持HTML5的浏览器(IE可以用defer实现)，可以采用以上几种方法实现。原理基本上都是向DOM中写入script或者通过eval函数执行JS代码，你可以把它放在匿名函数中执行，也可以在onload中执行，也可以通过XHR注入实现，也可以创建一个iframe元素，然后在iframe中执行插入JS代码。
三：延迟加载
有些JS代码在某些情况在需要使用，并不是页面初始化的时候就要用到。延迟加载就是为了解决这个问题。将JS切分成许多模块，页面初始化时只加载需要立即执行的JS，然后其它JS的加载延迟到第一次需要用到的时候再加载。类似图片的延迟加载。
JS的加载分为两个部分：下载和执行。异步加载只是解决了下载的问题，但是代码在下载完成后就会立即执行，在执行过程中浏览器处于阻塞状态，响应不了任何需求。
解决思路：为了解决JS延迟加载的问题，可以利用异步加载缓存起来，但不立即执行，需要的时候在执行。如何进行缓存呢？将JS内容作为Image或者Object对象加载缓存起来，所以不会立即执行，然后在第一次需要的时候在执行。
    1：模拟较长的下载时间：
    利用thread让其sleep一段时间在执行下载操作。
    2：模拟较长的JS代码执行时间
    var start = Number(new Date());
    while(start + 5000 > Number(new Date())){//执行JS}
    这段代码将使JS执行5秒才完成！
JS延迟加载机制(LazyLoad)：简单来说，就是在浏览器滚动到某个位置在触发相关的函数，实现页面元素的加载或者某些动作的执行。如何实现浏览器滚动位置的检测呢？可以通过一个定时器来实现，通过比较某一时刻页面目标节点位置和浏览器滚动条高度来判断是否需要执行函数。