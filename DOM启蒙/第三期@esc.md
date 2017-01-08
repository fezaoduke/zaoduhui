《DOM启蒙》读书笔记

写在前面：
很高兴参加第三期活动，相信每个参加的人都想提升自己得到进步，那我也是。
在读这本书之前，最好有JS基础，因为这本书算是一本工具书。
如果你用了jquery，那么你不需要懂DOM内部的工作机制。js库的意义就在于抽象离开浏览器内部的API，并转而提供一个不同的。更好的API。
读书计划：
全部阅读，重点阅读第10、11章


第一章 节点概览
对象模型DOM，DOM目的：使用JS操作为文档提供接口。
节点对象类型提供规范的名称，通过继承自节点对象的子节点对象。
“节点的属性和方法在书中7-8页”熟悉了节点，就可以用JS创建元素和文本的节点
createElement()
createTextNode()
1.8、1.9、1.10、1.11、1.12中，可以跟着书中的代码练习一遍
（NodeList与HTMLCollenction）
在浏览过第一章发现第一章主要以理论为主，最好是看一遍之后跟着试一遍。


第二章 文档节点
构造函数HTMLDocument（从document继承）
获取html文档方法：
·doctype	
·documentElement
·implementation
·activeElement
·body head title
·lastModified
·referrer
·URL 
·defaultview
·compatMode
·ownerDoument
·hasFocus()
docu,ent.defaultView顶部对象捷径：
console.log(document.defaultView)



第三章 元素节点
·createElement()
·tagName
·children
·getAttribute()
·setAttribute()
·hasAttribute()
·removeAttribute
·classList()
·dataset
·attributes
从创建元素开始，element节点是浏览器解析一份html文档为我们实例化的，基于该文档内容简历了一个对应的dom树，除此之外，还可以用createElement()方法以变成的方式创建Element的节点。
这里我总结几个方法：
tagName 获取元素的标签名
attributes获取当前元素都Attr节点
getAttribute() setAttribute() removeAttribute()获取、设置、移除元素
验证一个元素是否有某属性：hassAttribute()
添加与移除类属性中的部分值 classlist.add() 、classlist.remove()
变换某个类属性值classList.toggle()
判断类属性值是否含某一特定值classList.contains()
获取与设置data-*属性   dataset

第四章  元素节点选取
选取特定元素节点
querySelector()返回首个元素
getElementById()返回指定的元素
创建/选取一个元素节点列表
querySelectorAll()
getElementByTagName()
getElementByClassName()
选取所有的直属子元素节点
.children
选取与上下文有关的元素
querySelector()、querSlelctorALL()、getElementsByTagName()、getElementByClassName()
预定义的元素节点选取/列表
all文档中所有元素  forms文档中所有<form>元素  images.HTML文档中<img>元素  script.HTML文档中所有<script>元素  links.文档中<a>元素 


第五章 元素节点几何量与滚动几何量
获取元素相对于offsetParent的offsetTop及offsetLeft值，他们以像素为单位.
使用getBoundingClientRect()获取元素相对于视区的Top.Right.Bottom以及Left边沿偏移量
获取元素在视区中的尺寸(边框+填充+内容)getBoundingClientRect()
获取元素在视区中的尺寸(填充+内容)不含边框clientWidth clientHeight
使用elementFromPoint()获取视区中某一特定点上最顶层元素
使用scrollHeight及scrollWidth获取滚动元素的尺寸
使用scrollTop及获取并设置从上、左边滚动的距离
使用scrolllntoView()滚动元素到视区
