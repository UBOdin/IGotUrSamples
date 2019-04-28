import React, { Component } from 'react';
import { Table, Form } from 'react-bootstrap';
import Row from './Row';

class CustomTable extends Component {
	constructor(){
		super();
		this.state = { allChecked: false }
		this.handleSelectAll = this.handleSelectAll.bind(this);
	}

    render() {
        const headerCols = [];
        const rows = [];

        for (var i = 0; i < this.props.numCols; i++) {
            headerCols.push(<th key={i} number={i}>{this.props.cols[i]}</th>);
        }
		
        for (var j = 0; j < this.props.numRows; j++) {
            rows.push(<Row numCols={this.props.numCols} key={j} number={j} checked={this.state.allChecked} rowData={this.props.toPopulateWith[j]}/>);
        }

        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th width="3%">
                            <Form.Check 
								id="selectall"
								checked={this.state.allChecked}
								onChange={this.handleSelectAll}
								/>
                        </th>
                        { headerCols }
                    </tr>
                </thead>
                <tbody>{ rows }</tbody>
            </Table>
        )
    };

	handleSelectAll(e) {
		this.setState({ allChecked: e.target.checked });
	};
}

export default CustomTable;
