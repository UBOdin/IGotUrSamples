import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Addsamples from './components/Addsamples';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
            <Route exact path="/" component={Navbar} />
            <Route path="/Navbar" component={Navbar} />
            <Route path="/Addsamples" component={Addsamples} />
        </div>
      </Router>
    );
  }
}

export default App;
