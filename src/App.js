import React from "react";
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import HowTo from "./How_To/HowTo";
import Landing from "./Landing/Landing"
import Game from './Game/Game'
import './App.css'

export default function App() {
  return (
    <Router>
      <div className="app">
      <nav className="nav-bar">
          <ul className="nav-bar-ul">
            <li className="nav-bar-li a">
              <Link to="/">Landing</Link>
            </li>
            <li className="nav-bar-li a">
              <Link to="/how">How to</Link>
            </li>
            <li className="nav-bar-li a">
              <Link to="/game">Game</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/how">
            <HowTo/>
          </Route>
          <Route path="/game">
            <Game/>
          </Route>
          <Route path="/">
            <Landing/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}