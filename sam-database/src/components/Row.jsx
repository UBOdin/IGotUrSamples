import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

class Row extends Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: false,
		}
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
	this.setState({ checked: this.props.checked });
	}

	handleChange(e) {
		this.setState({ checked: e.target.checked });
		this.props.checkCallback(this.props.key, this.state.checked);
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
						checked={this.state.checked}
						onChange={this.handleChange}/>
                </td>
                { cols }
            </tr>
        )
    };
}

export default Row;           
