//Store是整个程序所需要的数据。
//Store是单例（Singleton）模式的，即在整个程序中，每种store都仅有一个实例。
//TodoStore存放了所有的文章列表
//不同类型的数据应该创建多个store，如程序中还存在用户信息，那么还可以新建一个UserStore.js

//Store是更新数据的唯一场所，这是Flux的重要概念
//action和Dispatcher并不和数据打交道，无法做数据操作

import EventEmitter from 'events';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/AppDispatcher';
import uuid from 'uuid';

//单件类型的一个JavaScript Object
const TodoStore = assign(   //使用assign方法把EventEmitter.prototype挂在到TodoStore上
    {},
    EventEmitter.prototype, //借助Node.js标准库EventEmitter实现"store发生变化时，通知view并展示新数据"
    {
        //存放所有文章的列表，里面有两条默认的数据
        todos: [{ id: uuid.v4(), content: 'first one' }, { id: uuid.v4(), content: '2nd one' }],
        getAll() {
            return this.todos;
        },
        addTodo(todo) {
            this.todos.push(todo);
        },
        deleteTodo(id) {
            this.todos = this.todos.filter(item => item.id !== id);
        },
        emitChange() {
            //store的变化使用emit方法广播出去---》view层会接收这个信号，同时更新UI
            this.emit('change');
        },
        addChangeListener(callback) {
            this.on('change', callback);
        },
        removeChangeListener(callback) {
            this.removeListener('change', callback);
        }
    }
    );

//Dispatcher的一个API方法，register，可以注册不同事件（对应actionType）的处理回调，并且在回调中对store进行处理
AppDispatcher.register((action) => {    //每个action对应dispatch传过来的action，包含actionType和对应的数据，参见../actions/TodoAction.js
    switch (action.actionType) {
        case 'CREATE_TODO':
            TodoStore.addTodo(action.todo);
            TodoStore.emitChange();
            break;
        case 'DELETE_TODO':
            TodoStore.deleteTodo(action.id);
            TodoStore.emitChange();
            break;
        default:
        //  nothing to do here

    }
});
export default TodoStore;