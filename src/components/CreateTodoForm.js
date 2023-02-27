import React, { Component } from 'react';
import './CreateTodoForm.css';
import { v4 as uuid } from 'uuid';
import { addTodo, getTodolist } from '../actions/todolistActions';

class CreateTodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoName: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        const { todoName } = this.state;
        const todo = {
            id: uuid(),
            name: todoName
        }
        if(todoName.trim() === '') return;
        dispatch(addTodo(todo, () => {
            dispatch(getTodolist());
            this.setState({ todoName: ''});
        }));
    }

    render() {
        const { todoName } = this.state;
        return (
            <form className="CreateTodoForm" onSubmit={this.handleSubmit}>
                <label htmlFor="todoName">Todo Name</label>
                <input type="text" name="todoName" value={todoName} onChange={this.handleChange}/>
                <button>Add Todo</button>
            </form>
        )
    }
}

export default CreateTodoForm;