import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

class Row extends Component {

	handleChange = (e) => {
		this.props.checkCallback(this.props.number, e.target.checked);
	}

	handleClick = (e) => {
		console.log("Clicked row #" + this.props.number);
		this.props.click (this.props.number);
	}

    render() {
		const cols = [];
		const rowData = this.props.rowData;

		for (var i = 0; i < this.props.numCols; i++) {
			cols.push(<td>{rowData[this.props.headers[i].toLowerCase()]}</td>);
		}

        return (
            <tr onClick={this.handleClick}>
                <td>
                    <Form.Check key={this.props.number} checked={this.props.checked} onChange={this.handleChange}/>
                </td>
                { cols }
			</tr>
        )
    };
}

export default Row;           
