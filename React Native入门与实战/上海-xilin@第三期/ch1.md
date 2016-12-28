// 脑图链接 http://naotu.baidu.com/file/f7ce1918151315c09f60214cc14b351d?token=5161448d6e1fcf32

# Ch1. RN简介

## 1. 环境搭建

<!--Note-->
#### 安装命令

```
// 指定node.js版本
nvm install v4.1.0
brew install watchman
brew install flow
// 指定rn-cli版本
npm install -g react-native-cli@0.1.4
// 创建项目时指定rn版本
npm i -g rninit
rninit init Hello --source react-native@0.15.0
```

#### 参考
*  [new-react-native-project-with-old-version-of-react-native](http://stackoverflow.com/questions/34211131/new-react-native-project-with-old-version-of-react-native)

<!--/Note-->

### NVM

### Node.js

### React Native

### Xcode编译

<!--Note-->
##### 编译错误修正
* [RCTWebSocket compile error](https://github.com/facebook/react-native/issues/8584)
  - 删除编译选项

* ['/bin/sh react-native command not found'](https://github.com/facebook/react-native/issues/3935)
  - 勾选`Run scripts only when installed`
<!--/Note-->

## 2. React

### JSX

#### React.render

#### React.createClass

##### getInitialState

##### componentDidMount

##### componentWillUnmount

##### render

##### this.state

##### this.setState

##### this.refs

### ES6

### Virtual Dom

## 3. React Native

### var {} = React

### 设计思路
![RN设计思路](http://ww4.sinaimg.cn/large/6e8cb483gw1fb6xtackxvj20km0ea75u.jpg)
