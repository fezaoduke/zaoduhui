##第三章 ES2015新语法详解

####3.1 let、const和块级作用域

######3.1.1块级作用域
Web前端开发领域，初学者必经的坑是与作用域有着极强关系的循环绑定事件。即在某个页面中对一组按钮进行点击事件的绑定，比如4个按钮的值分别为A，B，C，D，点击分别输出A，B，C，D 。这时，我们想当然的以为可以直接用for循环对这个节点列表进行遍历，并对每一个节点进行事件绑定。
    for(var i = 0; i < buttons.length; i++){
      buttons[i].addEventListener('click', function(evt){
        output.innerText = buttons[i].innerText;
      },false)
    }
但这样的结果是：无论点击哪个按钮，输出的都是undefined。这是因为在调用addEventListener函数时，函数内部的buttons[i]会寻找变量 i ，而内层函数没有变量 i，所以会去上一层查找。在这里我们希望的是每次for循环会形成一个作用域，这样查找 i 时就会找到当前这次for循环下 i 的值。但是悲剧的是，JS的作用域只有全局作用域 和 函数作用域两种， 所以内层函数执行时去查找的其实是全局作用域中的变量 i ，这时 i 已经是for循环结束后的值了，即为4。

我们以为是这样，每次执行外面都有一层壳形成本次的作用域：
    {
      var i = 0;
      buttons[i].addEventListener('click', function(evt){
        output.innerText = buttons[i].innerText;
      },false)
    }
    {
      var i = 1;
      buttons[i].addEventListener('click', function(evt){
        output.innerText = buttons[i].innerText;
      },false)
    }
    {
      var i = 2;
      buttons[i].addEventListener('click', function(evt){
        output.innerText = buttons[i].innerText;
      },false)
    }
    {
      var i = 3;
      buttons[i].addEventListener('click', function(evt){
        output.innerText = buttons[i].innerText;
      },false)
    }
    {
      var i = 4;
    }

但其实是下面这样，那层作用域并不存在，并没有天使替我保护他们：

    var i = 0;
    var i = 1;
    var i = 2;
    var i = 3;
    var i = 4;

    buttons[i].addEventListener('click', function(evt){
      output.innerText = buttons[i].innerText;
    },false)

    ...

    buttons[i].addEventListener('click', function(evt){
      output.innerText = buttons[i].innerText;
    },false)

######3.1.2 let定义变量

let与var的区别在于：
let不能被提升，有重复定义检查，可被用于块级作用域。
针对3.1.1中的问题，我们只需要把for循环时定义i 的关键字改为 let即可拥有像我们希望的那样的块级作用域。

######3.1.3 const定义常量
要解释常量，首先要清楚变量，变量与内存之间的关系由3个部分组成：变量名、内存绑定和内存地址。当我们为变量重新赋值，引擎会重新从内存中分配一个新的内存空间以存储新的值，并将新的内存地址与变量进行绑定 。const则是在变量名与内存地址之间建立不可变的绑定，当尝试改变时，引擎便会抛出错误。