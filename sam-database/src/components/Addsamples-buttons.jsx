import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Addsamples_buttons extends Component {
  render() {
    return (
        <div>
            <Button bsStyle="secondary">
                Duplicate
            </Button>
            <Button bsStyle="secondary">
                Save
            </Button>
        </div>
    );
    }
}

export default Addsamples_buttons;
