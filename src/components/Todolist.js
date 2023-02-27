import React, { Component } from "react";
import { connect } from "react-redux";
import "./Todolist.css";
import CreateTodoForm from "./CreateTodoForm";
import { getTodolist } from "../actions/todolistActions";
import Todo from './Todo';
import { openDB, syncData } from "../actions/websqlActions";

export class Todolist extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(openDB());
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getTodolist());
    const intervalID = setInterval(() => {
        dispatch(syncData());
    }, 60000);
  }

  render() {
    const { dispatch, todolist, sync } = this.props;
    const empty = todolist && todolist.length === 0;
    const { syncOn } = sync;
    return (
      <div className="Todolist">
        { syncOn && <div className="sync-block">Sync in progress. Please wait...</div> }
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
    sync: state.syncReducer
  };
};

// optional method as dispatch is mapped by default implementation
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todolist);
