import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Header from './components/Header';
import AddSamples from './components/AddSamples';
import ViewSamples from './components/ViewSamples';

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
           <Router basename=".">
                <div>
            <Header />
			<Switch>
                    <Route path="/" exact={true} component={AddSamples} />
                    <Route path="/AddSamples" component={AddSamples} />
                    <Route path="/ViewSamples" component={ViewSamples} />
			<Redirect to="/" />
			</Switch>
                </div>
            </Router>
            </Container>
        </div>
    );
  }
}

export default App;
