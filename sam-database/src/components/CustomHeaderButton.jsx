import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class CustomHeaderButton extends Component {
    state = {
        variant: "outline-dark"
    }

    render() {
        return (
            <Button variant={this.state.variant} size="lg" href={this.props.href}>{this.props.text}</Button>
        );
    }
}

export default CustomHeaderButton;
