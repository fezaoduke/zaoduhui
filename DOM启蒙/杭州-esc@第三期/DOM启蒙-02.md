# 《Dom启蒙》读书笔记

## 第1章 节点概览

- 1.1 文档对象模型（Document Object Model，亦称 DOM）是个由JavaScript节点对象组成- 的-层次结构/树
- 1.2 节点对象类型
- 1.3 继承自节点对象的子节点对象
- 1.4 用于与节点打交道的属性与方法
- 1.5 识别节点的类型与名称
- 1.6 获取节点的值
- 1.7 使用 JavaScript 方法来创建元素与文本节点
- 1.8 使用 JavaScript 字符串创建并向DOM中添加元素与文本节点
- 1.9 提取DOM树中的部分作为JavaScript字符串
- 1.10 使用 appendChild() 与 insertBefore() 向DOM中插入节点对象
- 1.11 使用 removeChild() 与 replaceChild() 来移除与替换节点
- 1.12 使用 cloneNode() 来复制节点
- 1.13 理解节点集合（即 NodeList 与 HTMLCollection）
- 1.14 获取所有直属子节点的列表/集合
- 1.15 将 NodeList 或者 HTMLCollection 转换成JavaScript 数组
- 1.16 遍历 DOM 中的节点
- 1.17 使用 contains() 与 compareDocumentPosition()验证节点在 DOM 树中的位置
- 1.18 判断两个节点是否相同

## 第2章 文档节点

- 2.1 文档节点概览
- 2.2 HTML 文档属性与方法（包括继承的）
- 2.3 获取 HTML Document 通用信息（标题、链接、提及者、最后修改时间及兼容模式）
- 2.4 文档子节点
- 2.5 document 提供的 <!DOCTYPE>、<html lang="en">、<head>及 <body> 捷径
- 2.6 使用 document.implementation.hasFeature() 探测 DOM 规范/特性
- 2.7 获取文档中当前聚焦/激活节点的引用
- 2.8 判断文档或者文档中任何节点得到焦点
- 2.9 document.defaultView 是个到顶部/全局对象的捷径
- 2.10 使用 ownerDocument 从某一元素取得文档的引用



## 通过F12查看开发工具

> DOM的目的是使用JS操作(删除、添加、替换、创建事件及修改)为当前文档提供一个变成接口
### 代码演示
	
	＜html lang=""en""＞
		＜body＞
			＜script＞
				　// 与如下代码相关的注释
				　var foo = ＇＇;
			＜/script＞
		＜/body＞
	＜/html＞

## DOM节点分为：文档节点、元素节点、属性节点和文本节点。

## 节点属性：
>nodeName：节点名称。
nodeValue：节点的值。
parentNode：节点的父节点。每个元素、属性和文本都有一个父节点。
childNodes：节点的孩子节点列表。对于HTML，该列表仅对元素有意义，文本节点和属性节点都没有孩子。
firstChild：仅仅是childNodes列表中第一个节点的快捷方式。
lastChild：另一种快捷方式，表示childNodes列表中的最后一个节点。
previousSibling：返回当前节点之前的节点。换句话说，它返回当前节点的父节点的 childNodes 列表中位于该节点前面的那个节点（如果感到迷惑，重新读前面一句）。
nextSibling：类似于previousSibling属性，返回父节点的childNodes列表中的下一个节点。
attributes：仅用于元素节点，返回元素的属性列表。

##节点方法：
> insertBefore(newChild, referenceNode)将newChild节点插入到referenceNode之前。注意，应该对newChild 的目标父节点调用该方法。
replaceChild(newChild, oldChild)用newChild节点替换oldChild节点。
removeChild(oldChild)从运行该方法的节点中删除oldChild节点。
appendChild(newChild)将newChild添加到运行该函数的节点之中。newChild被添加到目标节点孩子列表中的末端。
hasChildNodes()在调用该方法的节点有孩子时则返回true，否则返回false。
hasAttributes()在调用该方法的节点有属性时则返回true，否则返回false。
 
##文档节点：
> 也可使用document对象创建新节点，如下所示：
createElement(elementName)使用给定的名称创建一个元素。
createTextNode(text)使用提供的文本创建一个新的文本节点。
createAttribute(attributeName) 用提供的名称创建一个新属性。

##元素节点：
> 与属性处理有关的方法：
getAttribute(name)返回名为name的属性值。
removeAttribute(name)删除名为name的属性。
setAttribute(name, value)创建一个名为name的属性并将其值设为value。
getAttributeNode(name)返回名为name的属性节点。
removeAttributeNode(node)删除与指定节点匹配的属性节点。
与查找嵌套元素有关的方法：
getElementsByTagName(elementName)返回具有指定名称的元素节点列表。

##文本节点：
>appendData(text)将提供的文本追加到文本节点的已有内容之后。
insertData(position, text)允许在文本节点的中间插入数据。在指定的位置插入提供的文本。
replaceData(position, length, text)从指定位置开始删除指定长度的字符，用提供的文本代替删除的文本。

##DOM 节点类型定义了一些常量，比如：
>Node.ELEMENT_NODE 是表示元素节点类型的常量。
Node.ATTRIBUTE_NODE 是表示属性节点类型的常量。
Node.TEXT_NODE 是表示文本节点类型的常量。
Node.DOCUMENT_NODE 是表示文档节点类型的常量。
	
