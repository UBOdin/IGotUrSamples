import React, { Component } from 'react';
import { Alert } from 'react-bootstrap'; 

class CustomAlertBanner extends Component {
	constructor(props) {
    	super(props);
    	this.state = {
    		};
  	}

	render() {
    	return (
        	<Alert variant={this.props.variant}>
          		<Alert.Heading>{this.props.text}</Alert.Heading>
        	</Alert>
      	);
    }
}


export default CustomAlertBanner;
