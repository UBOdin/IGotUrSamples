import React, { Component } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import CustomHeaderButton from './CustomHeaderButton.jsx';

class Header extends Component {
  render() {
    return (
        <div>
      		<ButtonGroup>
        		<CustomHeaderButton href="/AddSamples" text="Add Samples" />
        		<CustomHeaderButton href="/ViewSamples" text="View Samples" />
        		<CustomHeaderButton href="/AddShipments" text="Create Shipment" />
        		<CustomHeaderButton href="/ViewShipments" text="View Shipments" />
      		</ButtonGroup>

			<hr />
        
		</div>
    );
  }
}

export default Header;
