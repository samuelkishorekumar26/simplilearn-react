import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import {Switch, Route, Link} from 'react-router-dom';
import Register from "./components/register";

function App() {
  return (
    <div className="App">
      <header>
          <Switch>
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
          </Switch>
          <Link to="/login">Login</Link> / <Link to="/register">Register</Link>
      </header>
    </div>
  );
}

export default App;
