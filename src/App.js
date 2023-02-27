import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Navbar from "./components/ui/Navbar";
import Todolist from "./components/Todolist";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/todolist" />
          </Route>
          <Route
            exact
            path="/todolist"
            render={(routeProps) => <Todolist {...routeProps} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
