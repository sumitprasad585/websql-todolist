import React, { Component } from "react";
import { connect } from "react-redux";
import "./Todolist.css";
import CreateTodoForm from "./CreateTodoForm";
import { getTodolist } from "../actions/todolistActions";
import Todo from './Todo';
import { openDB } from "../actions/websqlActions";

export class Todolist extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(openDB());
  }

  componentDidMount() {
    const { dispatch } = this.props;
    if(window.navigator.onLine) {
      dispatch(getTodolist());
    } else {
      // dispatch(getFromDB());
    }
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
                    return <Todo key={current.todo.id} {...current} dispatch={dispatch} />
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
