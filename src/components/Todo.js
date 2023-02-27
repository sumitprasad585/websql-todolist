import React, { Component } from 'react';
import './Todo.css'; 

class Todo extends Component {
    render() {
        const { id, name } = this.props;
        return (
            <div className="Todo">
                <li>{name}</li>
            </div>
        )
    }
}

export default Todo;