import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import firebase from './firebase'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Event from './Event'
import Landing from './Landing'
require('firebase/database');
require('dotenv').config()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: []
    }
  }

  render() {
    return (
      <Router>
        <div>
          <div>
          </div>
          <Route exact path='/' component={Landing} />
          <Route exact path='/event' component={Event} />
        </div>
      </Router>
    )
  }
}

export default App;
