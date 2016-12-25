## CH.2 RN开发基础

### 1. flexbox

#### 伸缩容器

##### 概念

###### 主轴 main axis

###### 交叉轴 cross axis

##### 属性

###### display

####### flex

####### inline-flex

###### flex-direction 主轴方向

####### row

####### row-reverse

####### column

####### column-reverse

###### flex-wrap 主轴是否换行

####### nowrap

####### wrap

####### wrap-reverse

###### flex-flow 缩写组合 : flex-direction flex-wrap

###### justify-content 主轴对齐方式

####### flex-start

####### flex-end

####### center

####### space-between

####### space-around

###### align-items 交叉轴对齐

####### flex-start

####### flex-end

####### center

####### baseline

####### stretch

###### align-content 交叉轴换行对齐 配合flex-wrap:wrap使用

####### flex-start

####### flex-end

####### center

####### space-between

####### space-around

####### stretch

#### 伸缩项目

##### 属性

###### order:integer 排列顺序，默认为0

###### flex-grow:number 项目放大比例，默认为0

###### flex-shrink:number 收缩能力，默认为1

###### flex-basis:length | auto 伸缩的手动尺寸

###### flex:flew-grow flex-shrink flex-basis

####### auto: 1 1 auto

####### none: 0 0 auto

###### align-self 项目在交叉轴上的对齐方式

####### auto 按自身设置的宽高显示，或由stretch决定

####### flex-start 向开始对齐

####### flex-end 向结束对齐

####### center 中心对齐

####### baseline 基线对齐（字体基线）

####### stretch 伸缩占满

#### 在RN中使用flexbox

##### 支持属性

###### alignItems

###### alignSelf

###### flex

###### flexDirection

###### flexWrap

###### justifyContent

##### 实例

###### 导出的模块名要和RCTRootView中使用的相同

###### 语法上与HTML5有所不同

####### 元素显示层级后面的比前面的高

####### 使用驼峰命名，以JSON形式声明

####### value值不带单位

###### 运行范例时显示效果不对

####### 2.1代码运行效果图
![snapshot_of_2_1](http://ww3.sinaimg.cn/large/6e8cb483gw1fb3g57cc0bj20ku112q4r.jpg)

####### 环境为Xcode 8.2.1 + iOS 8.1 模拟器

####### 两条dash线都无法显示

####### 整体位置偏右
