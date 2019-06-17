import React, { Component } from 'react';
import { Alert } from 'react-bootstrap'; 

/* CustomAlertBanner renders an Alert in bootstrap 
 * using props to determine the variant (success, 
 * warning etc.; see the react-bootstrap documentation) 
 * and message.*/

class CustomAlertBanner extends Component {
	constructor(props) {
    	super(props);
		/* this.props.variant: the style variant for the Alert 
		 ** (see the react-bootstrap documentation). */
		/* this.props.text: the message to be displayed in the Alert. */
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
