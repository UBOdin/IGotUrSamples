import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
        <div>
      <ButtonGroup>
        <Button variant="outline-dark" size="lg" href="/AddSamples">Add Samples</Button>
        <Button variant="outline-dark" size="lg" href="/ViewSamples">View Samples</Button>
        <Button variant="outline-dark" size="lg">Add Shipment</Button>
        <Button variant="outline-dark" size="lg">View Shipments</Button>
      </ButtonGroup>
        <hr />
        </div>
    );
  }
}

export default Header;
