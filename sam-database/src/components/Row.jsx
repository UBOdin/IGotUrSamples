import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

class Row extends Component {
	constructor(props) {
		super(props);
	}

    render() {
		const cols = [];
		const rowData = this.props.rowData;

		for (var i = 0; i < this.props.numCols; i++) {
			cols.push(<td>{rowData[this.props.headers[i].toLowerCase()]}</td>);
		}

        return (
            <tr>
                <td>
                    <Form.Check id={this.props.key}
						checked={this.props.checked}/>
                </td>
                { cols }
            </tr>
        )
    };
}

export default Row;           
