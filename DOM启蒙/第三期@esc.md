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
