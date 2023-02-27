import React, { Component } from "react";
import { connect } from "react-redux";
import "./Todolist.css";
import CreateTodoForm from "./CreateTodoForm";
import { getTodolist } from "../actions/todolistActions";
import Todo from './Todo';

export class Todolist extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getTodolist());
  }

  render() {
    const { dispatch, todolist } = this.props;
    const empty = todolist && todolist.length === 0;
    return (
      <div className="Todolist">
        <div>
          <header>
            <h1>Add a todo</h1>
          </header>
          <CreateTodoForm dispatch={dispatch} />
        </div>
        <div className="Todolist-todos">
            { empty ? <h2>No todos in the list</h2> : 
                todolist.map(current => {
                    return <Todo {...current} dispatch={dispatch} />
                })
            }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todolist: state.todolistReducer.todolist,
  };
};

// optional method as dispatch is mapped by default implementation
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todolist);
