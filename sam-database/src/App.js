import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Header from './components/Header';
import Addsamples from './components/Addsamples';

class App extends Component {
  render() {
    return (
        <div>
            <Navbar className="bg-light">
                <Navbar.Brand className="mr-auto"><h2>SAM Research Database</h2>
                </Navbar.Brand>
                <Nav className="justify-content-end">
                    <Nav.Link href="/login">Log in</Nav.Link>
                    <Nav.Link href="/help">Help</Nav.Link>
                </Nav>
            </Navbar>            
            <Container fluid="true">
            <Header /> 
           <Router>
                <div>
                    <Route exact path="/" component={Addsamples} />
                    <Route path="/Addsamples" component={Addsamples} />
                </div>
            </Router>
            </Container>
        </div>
    );
  }
}

export default App;
