####3.4.3组件生命周期
######2.组件props更新
当组件收到新的props的时候，会执行以下方法。
- componentWillPeceiveProps(object nextProps)，在组件接收新的props时被触发。参数是传入的新的props。我们可以用来跟this.props比较，来决定是否用this.setState实现重新渲染。
- shouldComponentUpdate 渲染之前调用
- componentWillUpdate 渲染之前调用
- render 渲染
- componentDidUpdate 渲染完成后调用

######3、组件卸载
componentWillUnmount 在组件被卸载或者销毁之前调用的方法。

####3.4.4组合组件
一个组件可以包含其他的组件。
特别地，如果包含的组件需要循环，则需要为每个循环组件添加唯一的key值。

####3.4.5无状态函数式组件
没有内部state，不需要组件生命周期函数。  
只根据输入生成组件，无其他作用。  
这种组件是用途十分广泛的组件。  

####3.4.6state设计原则
最小化-让大多数的组件都是无状态的。  
数据精简-state中应该包含组件的事件回调函数可能引发的UI更新的这类数据。  
避免出现可以在render方法通过计算得到的数据。



