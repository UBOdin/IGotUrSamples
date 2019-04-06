import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import './Header.css';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
        <div>
      <ButtonGroup>
        <Button variant="outline-dark" size="lg">Add Samples</Button>
        <Button variant="outline-dark" size="lg">View Samples</Button>
        <Button variant="outline-dark" size="lg">Add Shipment</Button>
        <Button variant="outline-dark" size="lg">View Shipments</Button>
      </ButtonGroup>
        <hr />
        </div>
    );
  }
}

export default Header;
