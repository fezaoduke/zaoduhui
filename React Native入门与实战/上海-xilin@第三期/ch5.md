# Ch.5 Native扩展

Native扩展可以支持:

- 使用RN未封装的原生功能
- 重用已有的原生组件或第三方组件
- 多线程调用以及高性能要求的功能

## 1. 通信机制

老的Hybrid框架通常使用UIWebView的加载URL回调方法来截取js端发起的请求，并使用`stringByEvaluatingJavaScriptFromString`来执行js脚本传递数据。

在JavaScriptCore出现后提供了新的实现机制。RN就利用了它来实现了一套方便的通信机制。

### 模块配置映射

RN提供了一个模块配置映射表来方便调用时的查找，作为通信时JavaScript和Native的桥梁。

具体的实现类是`RCTBatchedBridge`，在`initModules`时扫描所有的注册类，实例化成`RCTModuleData`，缓存模块，生成索引ModuleID。

`RCTModuleData`中通过OC的runtime获取生成模块导出方法类`RCTModuleMethod`，缓存并生成MethodID。

最后生成一个模块配置表，包含模块名、JS方法、常量参数、ModuleID和MethodID。

### 通信流程

![JavaScript调用Native流程](http://blog.cnbang.net/wp-content/uploads/2015/03/ReactNative2.png)

通信流程如上图所示。

JS端维护有一个MessageQueue。调用模块时把调用解析成ModuleName/MethodName/Params。

MessageQueue也提供了4个接口供Native端调用:

- `processBatch`：获得js模块的调用
- `invokeCallbackAndReturnFlushedQueue`：调用js模块执行时传递的回调函数
- `callFunctionReturnFlushedQueue`：处理OC对js模块的功能调用
- `flushedQueue`：刷新队列

调用参数中若包含有回调函数，则会生成CallbackID并缓存在js端，native端接收到一个回调block。

需要注意的是js不会主动调用native模块，而是由native模块主动调用`MessageQueue`的`processBatch`接口依次处理缓存的调用信息。

Native端通过`[ModuleID, MethodID, Params]`查表定位到对应的native方法并执行。

数据是以JSON类型进行传递的，因此在native方法调用前需要对js传递的参数做类型转换处理。在`RCTModuleMethod`中会自动通过runtime方法获取参数类型信息调用`RCTConvert`对支持的类型做转换。也可以自定义扩展`RCTConvert`以支持更多类型。

若调用时带了回调方法，则`RCTModuleMethod`会调用`invokeCallbackAndReturnFlushedQueue`将`CallbackID`作为参数传给`MessageQueue`，在队列中查找缓存的js方法调用回调。

在js端也会生成一份本地模块配置`localModules`，native端可以通过`enqueueJSCall:args:`直接调用js模块方法。在底层是通过`MessageQueue`的`callFunctionReturnFlushedQueue`实现。在这个方法的基础上RN提供了js模块中对native模块事件的监听处理：即在js端注册响应函数后，通过native端发现事件通知，再在js端接收通知并执行对应的响应方法。

## 2. 自定义Native Api组件

### 模块和方法定义

模块必须在编译和运行时向系统注册，并上报可供调用的属性和方法。

- 实现`RCTBridgeModule`协议
- `RCT_EXPORT_MODULE` 注册模块
  * 模块名前缀若包含RCT，会在js中映射时被自动除去
- `RCT_EXPORT_METHOD` 暴露模块方法
- JS和OC通信时使用JSON类型传递数据，利用`RCTConvert`自动转换。支持如下数据类型：
  * string(NSString)
  * number (NSInteger, float, double, CGFloat, NSNumber)
  * boolean (BOOL, NSNumber)
  * array (NSArray)
  * map (NSDictionary)
  * function (RCTResponseSenderBlock)
  * 自动convert包括
    - NSDate/UIColor/UIFont/NSURL/NSURLRequest/UIImage
    - UIColorArray/NSNumberArray/NSURLArray
    - NSTextAlignment/NSUnderlineStyle
    - CGPoint/CGSize

### 回调函数

RN提供了以下几种block作为回调函数:
- `(^RCTResponseSenderBlock)(NSArray *)` 接收多个参数的回调函数
- `(^RCTResponseErrorBlock)(NSError *)` 接收错误参数的回调函数
- `(^RCTPromiseResolveBlock)(id result)` 处理Promise Resolve
- `(^RCTPromiseRejectBlock)(NSError *)` 处理Promise Reject

Native端可以缓存block并在合适的时机调用，但是要注意缓存后的生命周期管理，及时释放

### 线程

RN中默认所有Native模块都运行在各自独立的GCD串行队列上。若需要手动指定队列，需要重写`- (dispatch_queue_t)methodQueue`方法。若模块中的某些方法需要单独指定队列，可以正常使用GCD的`dispatch_async`方法进行指定。js的callback可以从native的任意线程和队列中进行调用。

### 常量导出

常量导出可以让native暴露枚举、常量等定义给js使用。通过重写`constantsToExport`实现，返回一个字典。常量在框架初始化时被导出到模块配置表中，并在生成js模块对象时合并进对象，运行时对该方法的修改不会生效。

还可以添加`RCTConvert`的分类方法实现枚举类型的自动类型转换。

### 事件

RN实现了一个低耦合的消息事件订阅系统，native通过`RCTEventDispatcher`向js端的`EventEmitter`模块发送事件消息，由该模块通知事件订阅者执行响应。

使用时在js端添加事件订阅处理:
```javascript
var {NativeAppEventEmitter} = require('react-native');
var subscription = NativeAppEventEmitter.addListener('EventReminder',
    (reminder) -> console.log(reminder.name));
```

当在Native模块发出通知时
```
[self.bridge.eventDispatcher sendAppEventWithName:@"EventReminder"
                             body:@{@"name":eventName}];
// 还有一个接口是sendDeviceEventWithName:body: 用于发送设备相关事件
```

最后，在合适的时候取消订阅`subscription.remove()`以防止内存泄露。

### 实战

代码[见此](https://github.com/vczero/React-Native-Code/tree/0ada236b9580490d9fac11ca468459dbc9bfb664/%E7%AC%AC5%E7%AB%A0/react-native-device-extension)。

功能是在js端订阅自定义的设备旋转扩展事件并在console输出。

当导出成第三方库给外部使用时，可以封装一层js wrapper方便别人使用。

## 3. 构件Native UI组件
