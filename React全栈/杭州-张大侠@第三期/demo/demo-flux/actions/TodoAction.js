//action可以看做是应用程序的各种交互动作，而每一个动作产生后（例如新建或者删除）都会交给Dispatcher这个调度中心来处理

import AppDispatcher from '../dispatcher/AppDispatcher';

const TodoAction = {
  create(todo) {
    AppDispatcher.dispatch(//Dispatcher的一个API方法dispatch()，交给Dispatcher。这个方法触发对应事件类型的回调
    	
	    //Action本质是一个普通的JavaScript Object
	    {	
	      actionType: 'CREATE_TODO',	//actionType字段表明这个action的用途
	      todo: todo	//另一个字段表明它所传递的信息
	    }
    );
  },
  delete(id) {
    AppDispatcher.dispatch({	//交给Dispatcher
      actionType: 'DELETE_TODO',
      id: id
    });
  }
};

export default TodoAction;