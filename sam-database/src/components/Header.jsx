import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './Header.css';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div>
        <h1>
            SAM Research Database
        </h1>
        <Button bsStyle="secondary">
            Add Samples
        </Button>
        <Button bsStyle="secondary">
            View Samples
        </Button>
        <Button bsStyle="secondary">
            Add Shipment
        </Button>
        <Button bsStyle="secondary">
            View Shipments
        </Button>
      </div>
    );
  }
}

export default Header;
