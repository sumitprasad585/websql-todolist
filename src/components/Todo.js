import React, { Component } from 'react';
import { deleteTodo, getTodolist } from '../actions/todolistActions';
import './Todo.css'; 

class Todo extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(e) {
        const { dispatch, firebaseID } = this.props;
        dispatch(deleteTodo(firebaseID, () => {
            dispatch(getTodolist());
        }));
    }

    render() {
        const { todo: {name} } = this.props;
        return (
            <div className="Todo">
                <li>{name} <button onClick={this.handleDelete}><i className="fa-solid fa-trash"></i></button></li>
            </div>
        )
    }
}

export default Todo;