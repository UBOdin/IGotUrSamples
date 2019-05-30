import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
