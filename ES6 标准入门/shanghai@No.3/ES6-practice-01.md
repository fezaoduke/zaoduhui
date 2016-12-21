自控力不好，所以，常会经历类似“计划赶不上变化”这样的事，大家都懂，废话不说了，看行动啦~~~~

#ES6入门
ES6模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS(服务器端)和AMD(浏览器端)模块，都只能在运行时确定这些东西。
####前言
1.检测本地是否支持ES6环境
简便方法：直接在浏览器调试工具下尝试输入Promise（ES6的新API，用于异步事件的处理），如果能打印出其构造函数，则支持。


####开始

##### modul 使用
//content.js

export default 'A cat'    
export function say(){
    return 'Hello!'
}    
export const type = 'dog' 


①  //index.js

import { say, type } from './content'  
let says = say()
console.log(`The ${type} says ${says}`)  //The dog says Hello

②
//index.js

import animal, { say, type } from './content'  
let says = say()
console.log(`The ${type} says ${says} to ${animal}`)  
//The dog says Hello to A cat

③
//index.js

import animal, { say, type as animalType } from './content'  
let says = say()
console.log(`The ${animalType} says ${says} to ${animal}`)  
//The dog says Hello to A cat

④//index.js

import animal, * as content from './content'  
let says = content.say()
console.log(`The ${content.type} says ${says} to ${animal}`)  
//The dog says Hello to A cat

##第一章
###let  & const

#####块级作用域存在的意义--》阻止内层变量可能会覆盖外层变量的情况出现；防止用来计数的循环变量泄露为全局变量；
let实际上为JavaScript新增了块级作用域。

let声明的变量只在它所在的代码块有效,ex:for(let i=0;i<9;i++){};且在改代码块内不允许重复生声明同一个变量，不论生命方式为"let"或"var"
let不存在变量提升，用let声明的变量，仅在当前区块内有效，从一开始就形成了封闭作用域，变量一定要在声明后使用。 如果声明在使用之后，则会"ReferenceError"
暂时性死区（temporal dead zone，简称TDZ）-->在代码块内，使用let命令声明变量之前，该变量都是不可用的,若此时对该变量使用typeof，则会报" ReferenceError"
let不允许在相同作用域内，重复声明同一个变量。
ex:
if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}

{{{{
  {let insane = 'Hello World'}
  console.log(insane); // 报错 not defined
}}}};  

{{{{
  let insane = 'Hello World';
  {let insane = 'Hello World'}
}}}};  //两个块内，正确
