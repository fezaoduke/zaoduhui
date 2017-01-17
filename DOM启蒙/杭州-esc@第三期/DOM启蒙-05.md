# 《Dom启蒙》读书笔记


## 第8章 DocumentFragment节点

> 行为与实时DOM树相仿，但仅在内存中存在，并且它的子节点可以简单地在内存中操作，而后附加到实时DOM

##使用createDocumentFragment()创建DocumentFragment
    

    <script>
      
        var docFrag = document.createDocumentFragment();

		["blue","green","red","blue","pink"].forEach(function(e){
			var li = document.createElement("li");
			li.textContent = e;
			docFrag.appendChild(li);
		}) 
		
		
        console.log(docFrag .textContent); //输出text()
      
    </script>

>使用文档片段在内存中创建节点结构，注入该文档片段到时实节点结构时，是极其高效的！！！
>
## 添加DocumentFragment到实时DOM
> appendChild()或insertBefore()方法时，文档片段的子节点将被传输成为调用这些方法的DOM节点的子节点。


##使用文档片段上的innerHTML
> 　关于文本节点，遇到最多的兼容问题是空白文本节点问题。IE8-浏览器不识别空白文本

##通过复制保留在内存中
> 使用cloneNode()并在附加文档片段时复制即可