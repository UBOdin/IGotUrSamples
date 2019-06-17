import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/* Creates a Button using props to determine the address being 
 * linked to and the message to be displayed on the button. */
class CustomHeaderButton extends Component {
    state = {
        variant: "outline-dark"
    }

    render() {
        return (
			<Link to={this.props.href}>
            	<Button variant={this.state.variant} size="lg">{this.props.text}</Button>
			</Link>
        );
    }
}

export default CustomHeaderButton;
