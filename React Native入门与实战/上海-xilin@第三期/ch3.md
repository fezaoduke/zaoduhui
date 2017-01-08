# Ch.3 常用组件及其实践

## 1. View组件

View组件类似于Web开发中的div，是布局的基础。它是一个窗口组件，支持flexbox。

### 案例：九宫格实现

- 使用flexbox进行水平三栏布局
  * 使用相同的flex值即平分容器
- View组件默认使用纵向布局
- 定义样式时可以使用JS进行计算
  ```javascript
  lineLeftRight: {
    borderLeftWidth: 1/PixelRatio.get()  // PixelRatio.get可以获取设备的像素比，1/PixelRatio.get()就是最小线宽
  }
  ```

## 2. Text组件

Text组件主要用于显示文本，同时具有响应特性，可以设定触摸时是否高亮。支持多层嵌套，也可以继承样式。

### Text组件特性

- onPress
  * 在手指按下时执行该函数
- numberOfLines
  * 规定最多显示的行数
- onLayout
  * 可以获取元素布局的位置和大小，使用参数e.nativeEvent.layout获取

### 案例：网易新闻列表展示

- 完整代码[在此](https://github.com/vczero/React-Native-Code/blob/0ada236b9580490d9fac11ca468459dbc9bfb664/%E7%AC%AC3%E7%AB%A0/3.2)
- 根据应用的结构设计组件粒度
- 列表项可以复用组件
- Text在嵌套之后不会按照flexbox布局
- render方法内可以写完整的js逻辑，可以混写JSX
  ```javascript
  render: function() {
    var news = [];
    for (var i in this.props.news) {
      var text = (
        <Text onPress={this.show.bind(this, this.props.news[i])} numberOfLines={2}>
          {this.props.news[i]}
        </Text>
      );
      news.push(text);
    }
    return (
      <View>
        {news}
      </View>
    );
  }
  ```
- 运行截图

![preview3.2](http://ww2.sinaimg.cn/large/6e8cb483gw1fbjl74reyqj20ku112tcv.jpg)

## 3. NavigatorIOS组件

原生应用中最为重要的功能之一就是路由。RN提供了一个专门负责视图切换的组件NavigatorIOS。

### 组件介绍

NavigatorIOS本质上是对UIKit里navigation的包装。

- 路由是一个js对象，代表着一个页面组件
- 默认路由提供了initalRoute属性
  * component - 加载的视图组件
  * title - 标题
  * passProps - 页面间传递的数据
  * backButtonIcon - 图片对象，后退按钮图标
  * backButtonTitle - string, 后退按钮标题
  * leftButtonIcon - 图片对象，左边按钮图标
  * leftButtonTitle - string
  * onLeftButtonPress - function，左边按钮点击事件
  * rightButtonIcon
  * rightButtonTitle
  * onRightButtonPress
  * wrapperStyle - 样式
  ```javascript
  render: function() {
    return (
      <NavigatorIOS initialRoute={{
          component: MyView,
          title: 'Title',
          passProps: {myProp: 'foo'},
        }}
      />
    );
  }
  ```
- barTintColor
  * 导航条的背景颜色
- itemWrapperStyle
- navigationBarHidden
  * 是否隐藏导航条
- shadowHidden
  * 是否隐藏阴影
- tintColor
  * 导航栏上按钮颜色
- titleTextColor
- translucent
  * 是否半透明
- 在组件中可以用this.props.navigator获得navigator对象，其主要方法如下：
  * push 加载新页
  * pop 返回上一页
  * popN
  * replace 替换当前路由
  * replacePrevious  替换前一个视图并回退过去
  * resetTo - 重置最顶层路由并回退过去
  * popToTop

### 案例：列表页跳转详情页

- 完整代码[见此](https://github.com/vczero/React-Native-Code/blob/0ada236b9580490d9fac11ca468459dbc9bfb664/%E7%AC%AC3%E7%AB%A0/3.3/index.ios.js)
- 顶级组件即为NavigatorIOS
- Text组件onPress时触发push，在push时给出新导航条内容设定

## 4. TextInput组件

即文件框。提供了比较丰富的功能。

### 组件介绍

重要属性和事件如下：

- autoCapitalize
- multiline
- clearButtonMode
- returnKeyType
- onChangeText
- onChange
- onSubmitEditing

### 案例：搜索自动提示

- 完整代码[见此](https://github.com/vczero/React-Native-Code/blob/0ada236b9580490d9fac11ca468459dbc9bfb664/%E7%AC%AC3%E7%AB%A0/3.4/index.ios.js)
- 在onChangeText触发时更新下拉列表的值，选中下拉列表项时填充输入框内容

## 5. Touchable类组件

RN中不支持Web开发里给元素绑定click事件的方式。有3个组件来提供点击事件，分别是：

### TouchableHighlight 高亮触摸组件

点击时产生高亮效果。支持属性如下：

- activeOpacity
- onHideUnderlay
- onShowUnderlay
- underlayColor

### TouchableOpacity  透明触摸组件

点击时无背景色。只有一个属性：

- activeOpacity

## TouchableWithoutFeedback 无反馈性触摸组件

一般不建议使用。支持3个事件：

- onLonePress
- onPressIn
- onPressOut

## 6. Image组件

RN的Image组件支持网络图片、本地图片、相机图片等。

### 组件介绍

支持属性如下：

- resizeMode
  * cover
  * contain
  * stretch
- source
  * {uri:string} 网络图片
  * require('image!name') 本地图片
- defaultSource
- onLoad
  * 加载成功时触发
- onLoadEnd
  * 无论成功失败均触发
- onLoadStart
- onProgress

### 加载网络图片

- 代码[见此](https://github.com/vczero/React-Native-Code/blob/0ada236b9580490d9fac11ca468459dbc9bfb664/%E7%AC%AC3%E7%AB%A0/3.6/index.ios.js)
- 推荐使用`resizeMode="contain"`来自动缩放图片

### 加载本地图片

注意引用本地图片时应尽量在名称字符串中使用完整路径字符串而不是用逻辑拼接而成，以便于在后期打包时找出静态资源。

## 7. TabBarIOS组件

App主体的切换基本上使用TabBarIOS组件完成。其有一个附属组件TabBarIOS.Item。

### TabBarIOS组件介绍

主要属性如下：

- barTintColor
- tintColor 选中时Tab图标颜色
- translucent

### TabBarIOS.Item组件介绍

主要属性：

- badge
- icon
- onPress
- selected
- selectedIcon
- systemIcon
- title

### 案例：类QQ Tab切换

- 代码[见此](https://github.com/vczero/React-Native-Code/blob/0ada236b9580490d9fac11ca468459dbc9bfb664/%E7%AC%AC3%E7%AB%A0/3.7/index.ios.js)
  * 直接使用此代码需要自己导入图片资源
  * 也可以把icon换成`systemIcon='downloads'`使用系统图标，此时title无效
- 状态保存当前选中的tab名称，onPress时更新值，在selected中判断当前选中的tab

## 8. WebView组件

WebView组件常用于加载临时的活动页。

### 组件介绍

支持的属性如下：

- automaticallyAdjustContentInsets
- bounces
- contentInset
- html
- injectedJavaScript
  * 可注入js执行
- onNavigationStateChange
- renderError
- startInLoadingState
- renderLoading
- scrollEnabled
- onNavigationStateChange
- scalesPageToFit

### 案例：加载微博页面

- 使用`Dimensions.get('window').width`和`Dimensions.get('window').height`可以获得设备宽高

### 案例：进行微博OAuth认证

- 无需嵌入SDK，使用web方式获取数据
- 让WebView页加载获取认证的url
- 监听`onNavigationStateChange`在浏览器地址变化时截取事件
