#### Redux
1. Redux:可预测的状态容器，Redux提供若干API让我们使用redux来创建store,并能更新store中的数据、获取store中的最新状态，Redux结合视图层实现及其他前端必备库组成了类Flux思想的前端应用；
2. Redux规则：
- 单一数据源：一个应用只有一个数据源，整个应用状态都保存在一个对象中
- 状态是只可读的，不修改状态，而是直接返回全新的状态定义一个reducer，根据当前应用的状态进行迭代；
- 状态修改均由纯函数完成，通过定义reducer来确定状态的修改，每个reducer都是纯函数，接收相同的输入必定得到相同输出；
3. Reducer核心API
- Reducer负责响应action和修改数据，本质上是一个函数，根据previousState和action计算出新的state,其函数签名为reducer(previousState, action) = > newState，需判断previuosState非空，因首次运行其为空，设置initialState初始化。
- 最核心API-createStore();

        import { createStore } from 'redux';
      const store = createStore(reducer);

   createStore( reducer, [initialState] )
   通过createStore创建了一个store对象，本身包含了4个方法：
   1. getState()获取store中当前状态；
   2. dispatch(action) 分发一个action，并返回着个action唯一能改变store中数据的途径
   3. subscribe(listener)注册一个监听者，在store改变时调用；
   4. replaceReducer(nextReducer)更新store中的Reducer;
4. react-redux提供一个组件和一个API帮助React和redux进行绑定，一个为<Provider /> 接收一个store作为参数作为整个Redux应用的顶层组件，一个为connect()提供了在整个React应用任意应用中获取store中数据的功能；
5. Redux middleware
分类处理action,检阅流过的每个action，挑拣出特定的类型的action执行相应的操作，每个middleware都处理相应的业务要求，通过串联不同的middleware实现多样的功能，增强dispatch；
