# Ch.4 常用API及其实践

## 1. AppRegistry

RN程序的JavaScript运行入口就是AppRegistry

### 介绍

AppRegistry有如下方法：

- registerConfig(config: Array<AppConfig>): 注册配置
- registerComponent(appKey: String, getComponentFunc: ComponentProvider): 注册入口组件
- registerRunnable(appKey: string, func: Function): 注册函数监听
- getAppKeys(): 获取registerRunnable中注册的监听键
- runApplication(appKey: string, appParameters: any): 运行App，Native系统会在加载jsbundle文件后调用

### 示例

- 可以直接打印查看方法体
  * `alert(AppRegistry.runApplication)`
  * 程序启动时Xcode日志输出栏中的日志内容
- 可以注册appKey并获取

## 2. AsyncStorage

是一个简单的、具有异步特性的kv存储系统。

### 介绍

AsyncStorage的每个方法都有一个回调函数，其第一个参数都是错误对象。执行后都返回一个Promise对象。

- static getItem(key:string , callback:(error,result)): 根据键来获取值，获取的结果会在回调函数中。
- static setItem(key:string , value:string , callback:(error)): 设置键值对。
- static removeItem(key:string , callback:(error)): 将根据键移出一项
- static mergeItem:(key:string , value:string , callback:(error)): 合并现有的值和输入值。
- static clear(callback:(error)): 清除所有的项目。
- static getAllKeys(callback:(error)): 获取所有的键。
- static multiGet(keys,callback:(errors,result)):获取多项，其中keys是字符串数组。
- static multiSet(keyValuePairs,callback:(errors)):设置多项，其中keyValuePairs是字符串的二维数组。
- static multiRemove(keys,callback(errors)):删除多项，其中keys是字符串数组。
- static multiMerge(keyValuePairs,callback:(errors)):多个键值合并，其中keyValuePairs是字符串中的二维数组。

### 案例：购物车

- 因为是全局的存储系统，可以跨页面使用
- 可以添加特殊的前缀、后缀便于区分数据
- 使用guid来防止key重复
- 完整代码[见此](https://github.com/vczero/React-Native-Code/blob/0ada236b9580490d9fac11ca468459dbc9bfb664/%E7%AC%AC4%E7%AB%A0/4.2/index.ios.js)

## 3. AlertIOS

封装后的对话框。

### 介绍

提供两个静态方法：

- alert(title,message,buttons) ： 普通对话框，其中buttons是对象数组。
- prompt(title,value,buttons) : 提供输入的对话框，其中buttons是对象数组。

其中buttons的形式为:

```javascript
[{
     text: 'text',
     onPress:function(){
            // event
             }
 }];
```

### 应用

直接调用即可

## 4. ActionSheetIOS

是iOS中ActionSheet的封装

### 介绍
两个静态方法：

- showActionSheetWithOptions(options, callback): 弹出分类菜单
- showShareActionSheetWithOptions(options, failureCallback, successCallback): 分享弹出窗

### showActionSheetWithOptions应用

- options是一个对象
```
{
  options:['a', 'b'],
  cancelButtonIndex: 3,
  destructiveButtonIndex: 0
}
```

### showShareActionSheetWithOptions应用
- options也是一个对象
```
{
  url: 'https://code.fb.com'
}
```

## 5. PixelRatio

像素密度工具

### 介绍

- get: 获取像素密度
- getPixelSizeForLayoutSize: 获取元素的像素大小
- getFontScale: 字体比例

### 应用

- 最细边框: 1/PixelRatio.get()
- 自适应图片: PixelRation.getPixelSizeForLayoutSize(width)

## 6. AppStateIOS

可以得到App的状态信息，并在变化时得到通知

### 介绍

- currentState: 当前状态
- addEventListener(type, handler): 添加事件监听
- removeEventListener(type, handler): 删除事件监听

### 实例

- 监听改变
```javascript
 AppStateIOS.addEventListener('change', function() {});
```
- 监听内存报警
```javascript
 AppStateIOS.addEventListener('memoryWarning', function() {});
```

## 7. StatusBarIOS

可以改变状态栏

### 介绍

- setStyle(style, animated): 设置样式，其中style值可以为
  * default
  * light-content
- setHidden(hidden, animated): 是否隐藏状态栏
- setNetworkActivityIndicatorVisible(visible): 是否显示网络请求指示

## 8. NetInfo

获取网络状态

### 介绍

- isConnected: 是否联网
- fetch(): 获取网络状态，值为
  * none
  * wifi
  * cell
  * unknown
- addEventListener(eventName, handler)
- removeEventListener(eventName, handler)

## 9. CameraRoll

相册的封装

### 介绍

- saveImageWithTag(tag, successCallback, errorCallback): 保存图片到相册中。其中iOS中tag支持多种
  * url
  * assets-library
  * 内存图片
- getPhotos(params, callback, errorCallback): 获取相册图片

### 应用

- 保存成功的回调function会提供保存后的地址url
- 获取图片可以指定参数如起始index、相册种类、资源类型

### react-native-camera

RN提供的api不满足需求时可以安装第三方库。此库可用于调用摄像头。

- 安装时不能使用最新版，要配合书本版本使用
  * `npm install react-native-camera@0.3.8 --save`
- 添加到工程内
  * 添加node_modules下的.xcodeproj项目文件到Xcode中
  * 添加生成的静态文件到Link Binary With Libraries
  * 确保新加入项目的Header Search Paths正确

## 10. VibrationIOS

此API只有一个方法`vibrate()`让设备振动1秒

## 11. Geolocation

是地理定位服务的封装

### 介绍

- 需要开启应用的地理位置权限
- 提供静态方法如下
  * getCurrentPosition(successCallback, errorCallback, GeoOptions): 获取当前位置，GeoOptions支持timeout、maximumAge、enableHighAccuracy
  * watchPosition(successCallback, errorCallback, GeoOptions): 监测位置运动，参数同上
  * clearWatch(watchID)

## 12. 数据请求

遵循了浏览器的实现方式，实现了XMLHttpRequest API和Fetch API。示例代码[在此](https://github.com/vczero/React-Native-Code/blob/0ada236b9580490d9fac11ca468459dbc9bfb664/%E7%AC%AC4%E7%AB%A0/4.12/index.ios.js)

### XMLHttpRequest

和web相同，唯一区别在于RN中不存在跨域限制，是一个全局API

### Fetch

- 是一个封装程度更高的API，具体[参见此](https://fetch.spec.whatwg.org)

## 13. 定时器

和浏览器相同，可以使用以下方法（[示例代码见此](https://github.com/vczero/React-Native-Code/blob/0ada236b9580490d9fac11ca468459dbc9bfb664/%E7%AC%AC4%E7%AB%A0/4.13/index.ios.js)）

- setTimeout
- setInterval
- setImmediate
- requestAnimationFrame
