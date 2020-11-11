import './App.css';

import React, { Component } from 'react';
import { BrowserRouter as Router, 
  Route, Switch, Link } from "react-router-dom";
import Login from './Login.js';
import Home from './Home.js';
import SignUp from './SignUp.js';
import Todos from './Todos.js';
import PrivateRoute from './PrivateRoute.js'

export default class App extends Component {
  state = {
    username: localStorage.getItem('USERNAME') || '',
    token: localStorage.getItem('TOKEN') || '',
  }

  changTokenAndUsername = (bemis1, bemis2) => {
    localStorage.setItem('TOKEN', bemis2);
    localStorage.setItem('USERNAME', bemis1);
    
    this.setState({
      username: bemis1,
      token: bemis2
    })
  }


  logOut = () => {
    localStorage.setItem('TOKEN', '');
    localStorage.setItem('USERNAME', '');
    
    this.setState({
      username: '',
      token: ''
    })
  }


  render() {
    return (
      <div>
        <Router>
          <ul>
            {
            this.state.token 
            ? <div>
              {this.state.username}
              <button onClick={this.logOut}>Log out</button>
            </div>
          : <>
           <Link to="/login"><div>log in</div></Link>
            <Link to="/signup"><div>sign up</div></Link>
            </>}
          </ul>
          <Switch>
            <Route exact path='/' render={(routerProps) => <Home {...routerProps} />} />
            <Route exact path='/login' render={(routerProps) => 
                <Login 
                  {...routerProps} 
                  changeTokenAndUsername={this.changeTokenAndUsername} 
              />
              } 
            />
            <Route 
              exact 
              path='/signup' 
              render={(routerProps) => 
                  <SignUp  
                    {...routerProps} 
                    changeTokenAndUsername={this.changeTokenAndUsername} 
                    />
                } 
              />
            <PrivateRoute 
              token={this.state.token} 
              exact 
              path='/todos' 
              render={(routerProps) => <Todos {...routerProps} token={this.state.token} />} />

          </Switch>
        </Router>
        
      </div>
    )
  }
}

