> 《深入react技术栈》笔记（三）

前言：

端组件化探索越来越深入，都快赶上后端了。但由于前端样式的特殊性一直没有很好的解决方案，目前项目中使用的是react+sass去实现前端组件化，这次学习了CSS Module的解决方案，能直击我之前的几个痛点。


特点 | CSS Modules | Sass
:---:|:---:|:---:
变量 | css、js共享变量 | sass独享变量
嵌套过深底 | 无嵌套 | sass简便的嵌套写法，导致样式类名层级过深
命名 | 混淆后非常短 | 由于嵌套问题类名无法压缩
全局污染 | 样式被局部化 | sass全局污染概率较低，但代价是增加嵌套
依赖彻底 | 由于样式转换成对象，依赖管理更彻底 | 引入的sass都会编译成css，引入较多，开销过大
复用 | 在js中import样式对象 | 在样式中引入其他样式文件，或者变量

### CSS Module起步

#### 启用
由于之前已经是React+webpack组合，我们给css的loader加上以下配置就可以启动CSS Modules
```javscript
css?modules&localIdentName=[name]_[local]-[hash-base64:5]
```
上面这行配置的意思是让节点的类名变成[组件名]-[类名]-[随机的hash值]

**之前:**
```html
/* Button.js 组件*/
import './Button.scss';
...
render(){
    return (
        <div className="button">
            <h3 className="button-title">...</h3>
        </div>
    )
}
```
```css
/* Button.scss 组件的样式文件 */

$root:button

.#{root} {
    ...
    &-title {
        ...
    }
}
```

**现在**
```html
/* Button.js 组件*/
import style from './Button.scss';
...
render(){
    return (
        <div className={style.root}>
            <h3 className={style.title}>...</h3>
        </div>
    )
}
```
```css
/* Button.scss 组件的样式文件 */

.root {
    ...
}
.title {
    ...
}
```
**生成节点：**
```html
 <div class="button-root-bas123">
    <h3 class="button-title-baw123">...</h3>
</div>
```
通过对比发现CSS Module有以下优点：
1.  样式无需嵌套很深
2.  经过hash处理后无需担心全局污染

#### 使用composes来组合样式
与sass import，mixin相比没有什么亮点，换一种写法而已。

#### class命名技巧
CSS Modules使用BEM命名规范，就是模块+节点+状态，如：module_confirm-button--highlight

### 实现变量共享给js

```css
/* css */
&primary-color:#f40;
:export{
    primaryColor:&primary-color
}
```
```js
/* js */
import style from './styles.scss';
console.log(style.primaryColor);//#f40;
```
