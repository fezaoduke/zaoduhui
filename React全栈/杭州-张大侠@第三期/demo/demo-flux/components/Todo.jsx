import React from 'react';
import List from './List';
import CreateButton from './CreateButton';
import TodoStore from '../stores/TodoStore';
import TodoAction from '../actions/TodoAction';
import uuid from 'uuid';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: TodoStore.getAll()
    };
    this.createTodo = this.createTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);

    //组件初始化完成便监听store的change事件，这样在store触发这个事件的时候，就会触发回调
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    TodoStore.addChangeListener(this.onChange);
  }
  componentWillUnmount() {
    TodoStore.removeChangeListener(this.onChange);
  }
  onChange() {
    this.setState({
      todos: TodoStore.getAll()
    });
  }
  createTodo() {
  	//创建ToDo的事件回调
    TodoAction.create({ id: uuid.v4(), content: '3rd stuff' });
  }
  deleteTodo(id) {
  	//创建Todo的事件回调
    TodoAction.delete(id);
  }
  render() {
    return (
      <div>
        <List items={this.state.todos} onDelete={this.deleteTodo} />
        <CreateButton onClick={this.createTodo} />
      </div>
    );
  }
}

export default Todo;