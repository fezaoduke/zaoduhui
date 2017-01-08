# Ch.2 RN开发基础

## 1. flexbox布局

flexbox布局由**伸缩容器**和**伸缩项目**组成。项目是容器的子元素。与传统的CSS布局不同，flexbox主要按照伸缩流的方向进行各种布局。

### 伸缩容器

容器由两个方向的轴组成：主轴 main axis;交叉轴 cross axis。每根轴都有各自的开始和结束方向。

mozilla上有一个比较完整的[示例教程](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)。

![flexbox](http://yanni4night.com/images/flex/flexbox.png)

#### 属性

伸缩容器支持的属性如下：

##### display

- flex

- inline-flex

##### flex-direction 主轴方向

- row

- row-reverse

- column

- column-reverse

##### flex-wrap 主轴是否换行

- nowrap

- wrap

- wrap-reverse

##### flex-flow 缩写组合

- flex-direction flex-wrap

##### justify-content 主轴对齐方式

- flex-start

- flex-end

- center

- space-between

- space-around

##### align-items 交叉轴对齐

- flex-start

- flex-end

- center

- baseline

- stretch

##### align-content 交叉轴换行对齐 配合flex-wrap:wrap使用

- flex-start

- flex-end

- center

- space-between

- space-around

- stretch

### 伸缩项目

#### 属性

伸缩项目支持的属性如下：

##### order

- integer 排列顺序，默认为0

##### flex-grow

- number 项目放大比例，默认为0

##### flex-shrink

- number 收缩能力，默认为1

##### flex-basis

- length | auto 伸缩的手动尺寸

##### flex

- flew-grow flex-shrink flex-basis
- 两种等价取值
  * auto: 1 1 auto
  * none: 0 0 auto

##### align-self

- 项目在交叉轴上的对齐方式

  *  auto 按自身设置的宽高显示，或由stretch决定

  * flex-start 向开始对齐

  * flex-end 向结束对齐

  * center 中心对齐

  * baseline 基线对齐（字体基线）

  * stretch 伸缩占满

### 在RN中使用flexbox

RN直接支持使用flexbox进行布局。主要支持属性如下：

#### 支持属性

- alignItems

- alignSelf

- flex

- flexDirection

- flexWrap

- justifyContent

#### 实例

[代码见此](https://github.com/vczero/React-Native-Code/blob/0ada236b9580490d9fac11ca468459dbc9bfb664/%E7%AC%AC2%E7%AB%A0/2.1/ReactNative/index.io.js)

##### 注意点

- 导出的模块名要和RCTRootView中使用的相同，否则找不到

- 语法上与HTML5有所不同

  * 元素显示层级后面的比前面的高

  * 使用驼峰命名，以JSON形式声明

  * value值不带单位

- 12/25/2016 运行范例时显示效果不对

  * 环境为Xcode 8.2.1 + iOS 8.1 模拟器

  * 两条dash线都无法显示

  * 整体位置偏右

![snapshot_of_2_1](http://ww3.sinaimg.cn/large/6e8cb483gw1fb3g57cc0bj20ku112q4r.jpg)


## 2. React中的JSX

React由ReactJS和React Native组成（存疑）。RN是ReactJS在native上的体现。View都是通过JSX来实现的。

### JSX入门

JSX是一个语法糖，允许开发者在JS里书写HTML语法。实际上最后都会翻译成JS代码执行。

#### 环境

运行时需要加载：

- ReactJS

- JSXTransformer

#### 载入方式

- 内联

```javascript
<script type="text/jsx">
  React.render(...);
</script>
```

- 外联

```html
<script type="text/jsx" src="hello.jsx"></script>
```

#### 可以自定义标签

- React.createClass
- 首字母必须大写

#### 转换

- React.createElement(String/ReactClass type, [object props], [children ...])

#### 执行JS表达式

- {variable}

#### 注释

- 和JS一样的单行和多行注释

#### 在标签上使用属性

```javascript
var msg = <h1 width="10px">Hello, ReactJS!</h1>;
// 等价于
var msg = React.createElement("h1", {width: "10px"}, "Hello, ReactJS!");
```

#### 支持部分ES6语法

- 可以使用`...`这样的延展属性语法

#### 自定义属性

- 需要以data-开头

#### 可以使用`_html`显示HTML

#### 样式使用style属性，传入JSON对象

```
<h1 style={{color: '#ff0000', fontSize: '14px'}}>Hello, ReactJS!</h1>
```

#### 事件绑定

- 同普通的HTML元素事件
- 需要使用驼峰命名
- 用bind方法绑定元素

```
function testClick() {
    alert('hi');
}
var app = <button onClick={testClick.bind(this)}>Hello</button>
```

### JSX实战之ReactJS

核心思想是组件化。各个组件按功能封装，维护各自的状态和UI。状态变化时自动重新渲染。

- API分类
  * 顶层api: React.createClass/React.render
  * 组件api: 组件内部的render/getDefaultProps等方法

- 生命周期
  * state是状态记录的变量，通过setState来触发更新

![ReactJS lifecycle](https://staminaloops.github.io/undefinedisnotafunction/images/react-lifecycle.jpg)

- 组件通信
  * 子组件调用父组件：使用this.props
  * 父组件调用子组件：使用this.ref

- Virtual DOM
  * 是一个代表真实DOM的JSON数据结构
  * 是React.createElement生成的对象
  * 可以用浏览器的MutationObserver功能来监听元素改变，观察Virtual DOM的效果
  * 给组件添加key属性可以减少更新成本
  * [Diff算法](http://calendar.perfplanet.com/2013/diff/)

- [实例](https://github.com/vczero/React-Native-Code/blob/0ada236b9580490d9fac11ca468459dbc9bfb664/%E7%AC%AC2%E7%AB%A0/2.2/ReactJS/index.html)

### JSX实战之RN

RN也是通过组件化来构建应用的，生命周期和ReactJS一致。不过RN中没有dom只有组件，无法使用HTML标签和DOM操作。

- [实例](https://github.com/vczero/React-Native-Code/blob/0ada236b9580490d9fac11ca468459dbc9bfb664/%E7%AC%AC2%E7%AB%A0/2.2/ReactNative/index.io.js)
  * 运行时仍然显示不全
  * 使用View、Text来显示视图，用StyleSheet来创建样式，AppRegistry注册组件

## RN开发向导

### 配置文件

- 环境配置
  * 见第一章笔记
- 入口文件
  * AppDelegate.m
  ```
  // debug
  jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];
  // release
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  ```
  * index.ios.js
    * RN开发的入口文件
- 运行
  * 使用Xcode运行项目，将自动启动开发服务器
  * 若要修改默认端口，需要修改 packager.js/AppDelegate.m/RCTWebSocketExecutor.m 中对应的端口号
- 调试
  * cmd+d可以打开调试菜单，比较重要的有Reload（刷新）、Debug in Chrome（使用Chrome DevTool调试合并后的JS）、Inspect Element（在模拟器中审查元素）
  * 书上说可以用react-developer-tools来调试RN的view，实际上根本看不到= =。FB官方给的建议是:
    > It is currently not possible to use the "React" tab in the Chrome Developer Tools to inspect app widgets. You can use Nuclide's "React Native Inspector" as a workaround.
  * 真机调试需要按照修改端口的方法把server地址localhost改为开发机器的IP
- 内部发布
  * jsCodeLocation指向bundle
  * 使用curl从开发服务器下载bundle文件并放到项目目录下
  * 或者使用命令`react-native bundle`来打包生成
    > 书上的命令不全，需要输入
    >
    > `react-native bundle --entry-file index.ios.js --bundle-output index.ios.bundle`
  * 使用发布包运行时不能打开chrome debug，否则会[一直卡在加载阶段](https://segmentfault.com/a/1190000004189538)

