# 《Dom启蒙》读书笔记

## 第7章 文本节点

- 7.1 文本对象概览
- 7.2 文本对象与属性
- 7.3 空白符创建文本节点
- 7.4 创建与注入文本节点
- 7.5 使用 .data 或 nodeValue 获取文本节点值
- 7.6 使用appendData()、deleteData()、insertData()、replaceData()及 subStringData() 操作文本节点
- 7.7 当有多个兄弟文本节点时
- 7.8 使用 textContent 移除文本标记并返回所有的子文本节点
- 7.9 textContent 与 innerText 的区别
- 7.10 使用 normalize() 合并兄弟文本节点成单个文本节点
- 7.11 使用 splitText() 分割文本节点

## 文本节点
> HTML文档中的文本表现为Text()构造函数的示例，当HTML被解析时，在HTML页面中与元素混杂在一起的文本就会被转换为文本节点 

![Alt text](./1483867242615.png)

    <p>hi</p>

    <script>
       //选取'hi'节点
        var textHI = document.querySelector('p').firstChild;

        console.log(textHI.constructor); //输出text()
        
        //输出text{textContent= 'hi',length=2,wholeText='H1',...}
        console.log(textHI)
    </script>

## 语法
> optionObject.text=sometext


##空白文本节点
> 　关于文本节点，遇到最多的兼容问题是空白文本节点问题。IE8-浏览器不识别空白文本节点，而其他浏览器会识别空白文本节点
> - wholeText
> wholeText属性将当前Text节点与毗邻的Text节点，作为一个整体返回。大多数情况下，wholeText属性的返回值，与data属性和textContent属性相同。但是，某些特殊情况会有差异
>-  length
> 　文本节点的length属性保存着节点字符的数目，而且nodeValue.length、data.length也保存着相同的值
##方法
> - createTextNode()
> - normalize()
> - plitText()
> - ppendData()
> - deleteData()
> - insertData()
> - replaceData()
> - substringData()
