import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import Create from './pages/create'

import Home from "./pages/home";
import Post from "./pages/post";
import NoMatch from "./pages/no-match";

function App() {
  return (
    <Router>
      <nav>
        <Link to='/'>
          <h2>
            React & Firebase Blog brought you by Sophia
            <span role='img' aria-label='tada'>
              🎉
            </span>
          </h2>
        </Link>
      </nav>
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/create' component={Create} />
          <Route path='/404' component={NoMatch} />
          <Route path='/:slug' component={Post} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
