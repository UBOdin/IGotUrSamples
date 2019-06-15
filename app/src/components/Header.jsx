import React, { Component } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import CustomHeaderButton from './CustomHeaderButton.jsx';

class Header extends Component {
  render() {
    return (
        <div>
      		<ButtonGroup>
        		<CustomHeaderButton href="/AddSamples" text="Add Samples" />
        		<CustomHeaderButton href="/ViewSamples" text="Filter and Export" />
        		<CustomHeaderButton href="/AddShipments" text="Create a Shipment" />
        		<CustomHeaderButton href="/ViewShipments" text="See Shipments" />
      		</ButtonGroup>

			<hr />
        
		</div>
    );
  }
}

export default Header;
