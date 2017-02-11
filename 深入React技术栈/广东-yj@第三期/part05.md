#### Redux 与路由
1. 路由的基本原理：保证View与Url的同步，用户通过手动输入或与页面进行交互来改变Url，然后通过异步或同步的方式向服务器端发送请求获取资源，重新绘制UI;
2. React Router的特性：
    1. 声明式的路由；
    2. 嵌套路由和路径匹配；
    3. 支持多种路由切换方式；
3. React Router Redux:将路由的信息与Redux中的store绑定在一起；
    1. 将React Router与Redux store绑定
       API： syncHistoryWithStore,传入React Router中的History,以及Redux中的store,得到一个增强版的History对象；再将History对象传给React Router中的<Router>组件作为props，就给React Router Redux提供观察路由变化并改变store的能力

           import { browserHistory } from 'react-router'
           import { syncHistoryWithStore } from 'react-router-redux'
           import reducers from '<project-path>/reducers'

           const store = createStore(reducers);
           const history = syncHistoryWithStore(browserHistory, store);
    2. 用Reaux的方式改变路由
       路由状态作为应用状态数据，在Redux应用中需要改变路由时，亦需分发action;
       需对Redux的store增强：

           import { browserHistory } from 'react-router';
           import { routerMiddleware } from 'react-router-redux';

           const middleware = routerMiddleware(browserHistory);
           const store = create(reducers, applyMiddleware(middleware) );

        引入React-Router-Redux提供的routerMiddleware,routerMiddleare实际上是一个middleware工厂，根据传入history，返回一个真正的Redux middleware,创建Redux的store时候作再将其作为为参数传入，获得React Router Redux加工过的新的store;
        最后，用store.dispatch来分发一个路由变动的action

            import  { push } from 'react-router-redux';
            //切换路由至/home
            store.dispath(push('/home'));

#### Redux组件
1. 容器型组件：意为组件是怎么工作的，数据是怎么更新的。不包含任何Virtual DOM的修改和组合，亦不包含组件的样式，Redux中的connect组件，Flux中的与store绑定的组件；
2. 展示型组件：意为组件是怎么渲染的，包含了Virtual DOM的修改和组合，可包含组件的样式，不依赖任何形式的store，一般写成无状态函数不一定都是无状态组件，存在生命周期方法；
3. Redux中的组件

-              |     展示型组件                  |    容器型组件
---            |        ---                     |     ---
   目的        |     UI长什么样子（标签，样式）    |   干什么用的(获取数据，更新状态等)
是否感知Redux  |         否                      |   是
获取数据       |    this.props                   |  使用conne从Redux状态树中获取
改变数据       |调用从props中传入的action creator |  直接分发action
创建           | 开发者                          | 通过react redux 创建
