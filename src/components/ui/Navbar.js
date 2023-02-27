import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <nav className="Navbar">
        <div className="container Navbar-container">
          <div className="Navbar-left">
            <header>
              <Link exact to="/" className="Navbar-brand">
                WebSQL Todolist
              </Link>
            </header>
            <ul className="Navbar-list">
              <li className="Navbar-list-item">
                <NavLink
                  exact
                  activeClassName="Navbar-active"
                  to="/todolist"
                  className="Navbar-link"
                >
                  Todolist
                </NavLink>
              </li>
              <li className="Navbar-list-item">
                <NavLink
                  exact
                  activeClassName="Navbar-active"
                  to="/upcoming"
                  className="Navbar-link"
                >
                  ACTION ITEM
                </NavLink>
              </li>
              <li className="Navbar-list-item">
                <NavLink
                  exact
                  activeClassName="Navbar-active"
                  to="/popular"
                  className="Navbar-link"
                >
                  ACTION ITEM
                </NavLink>
              </li>
              <li className="Navbar-list-item">
                <NavLink
                  exact
                  activeClassName="Navbar-active"
                  to="/top_rated"
                  className="Navbar-link"
                >
                  ACTION ITEM
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="Navbar-right">
            <div className="Navbar-search">
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;