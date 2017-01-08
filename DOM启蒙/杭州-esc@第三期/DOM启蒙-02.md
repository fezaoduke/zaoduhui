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
