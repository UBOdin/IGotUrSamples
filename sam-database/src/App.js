import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Addsamples from './components/Addsamples';
import Navbar from './components/Navbar';

class App extends Component {
  render() {
    return (
        <Navbar />
        <Header />
        <Router>
            <div>
                <Route exact path="/" component={Addsamples} />
                <Route path="/Addsamples" component={Addsamples} />
            </div>
        </Router>
    );
  }
}

export default App;
