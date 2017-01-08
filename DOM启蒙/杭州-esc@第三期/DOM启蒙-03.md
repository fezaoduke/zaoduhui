# 《Dom启蒙》读书笔记

## 第1章 节点概览

2.1 文档节点概览
2.2 HTML 文档属性与方法（包括继承的）
2.3 获取 HTML Document 通用信息（标题、链接、提及者、最后修改时间及兼容模式）
2.4 文档子节点
2.5 document 提供的 <!DOCTYPE>、<html lang="en">、<head>及 <body> 捷径
2.6 使用 document.implementation.hasFeature() 探测 DOM 规范/特性
2.7 获取文档中当前聚焦/激活节点的引用
2.8 判断文档或者文档中任何节点得到焦点
2.9 document.defaultView 是个到顶部/全局对象的捷径
2.10 使用 ownerDocument 从某一元素取得文档的引用

## 元素节点

> 每个HTML 元素是元素节点 HTML 元素内的文本是文本节点 
### 代码演示
	
	＜html lang=""en""＞
		＜body＞
			<table>   
			  <tr>   
			    <td id="john" name="myname">John</td>   
			    <td>Doe</td>  
			    <td id="jack">Jack</td>   
			  </tr>   
            </table>
         <script>   
	  var d = document.getElementById("john").getAttributeNode("name");     
             alert(d.nodeType)   
             alert(d.nodeName)   
             alert(d.nodeValue)     
          </script>   
		＜/body＞
	＜/html＞



## 元素节点选取
> 选取特定元素节点
> - querySelector()
> - getElementById()
> 
> 选取/创建节点列表
> - querySelectorAll()
> - getElementsByTagName()
> - getElementByClassName()
> 
>选取子节点
>- children
> 
>选取上下文有关元素
>- querySelector()
>- querySelectorAll()
>- getElementsByTagName()
>- getElementsByClassName()方法
