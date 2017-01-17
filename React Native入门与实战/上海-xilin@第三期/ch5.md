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

## 3. 构件Native UI组件
