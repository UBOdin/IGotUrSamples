import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

class Row extends Component {
    render() {
        const cols = [];

        for (var i = 0; i < this.props.numCols; i++) {
            cols.push(<td></td>);
        }

        return (
            <tr>
                <td>
                    <Form.Check id={this.props.key} />
                </td>
                { cols }
            </tr>
        )
    };
}

export default Row;           
