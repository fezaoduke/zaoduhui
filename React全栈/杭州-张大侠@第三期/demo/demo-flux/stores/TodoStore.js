//Store是整个程序所需要的数据。
//Store是单例（Singleton）模式的，即在整个程序中，每种store都仅有一个实例。
//TodoStore存放了所有的文章列表
//不同类型的数据应该创建多个store，如程序中还存在用户信息，那么还可以新建一个UserStore.js

import EventEmitter from 'events';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/AppDispatcher';
import uuid from 'uuid';

//单件类型的一个JavaScript Object
const TodoStore = assign({}, EventEmitter.prototype, {
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
        this.emit('change');
    },
    addChangeListener(callback) {
        this.on('change', callback);
    },
    removeChangeListener(callback) {
        this.removeListener('change', callback);
    }
});

AppDispatcher.register((action) => {
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