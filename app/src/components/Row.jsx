import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

/* Custom Row item that populates the tables used throughout the website. 
 * Receives the number of columns and data to populate itself with via props, 
 * and uses two callback methods (also received via props) to communicate with 
 * the parent table: this.props.click handles the event where a row is clicked, 
 * and this.props.checkCallBack handles instances where the row's checkbox is 
 * checked or unchecked. */
class Row extends Component {

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

	/* EVENT HANDLERS: */

	handleChange = (e) => {
		this.props.checkCallback(this.props.number, e.target.checked);
	}

	handleClick = (e) => {
		console.log("Clicked row #" + this.props.number);
		this.props.click (this.props.number);
	}
}

export default Row;           
