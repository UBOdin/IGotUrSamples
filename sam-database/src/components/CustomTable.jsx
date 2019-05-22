//TODO: implemented this.props.getCheckedStateFromTable

import React, { Component } from 'react';
import { Table, Form } from 'react-bootstrap';
import Row from './Row';

class CustomTable extends Component {
	constructor(){
		super();
		this.state = { 
			allChecked: false,
			rows: [],
			rowsCheckedState: [],
		}

		this.handleSelectAll = this.handleSelectAll.bind(this);
		this.drawRows = this.drawRows.bind(this);
	}


	isChecked = (key, value) => {
		var checkedRows = this.state.rowsCheckedState;
		checkedRows[key] = value;

		this.setState({ rowsCheckedState: checkedRows });
		this.props.getRows(this.state.rowsCheckedState);
	}

	drawRows(rows) {
		for (var j = 0; j < this.props.numRows; j++) {
			var isChecked = false;
			if (!this.props.reset) {
				isChecked = this.state.rowsCheckedState[j];
			}
		
			rows.push(<Row numCols={this.props.numCols} key={j} number={j} checked={isChecked} rowData={this.props.toPopulateWith[j]} headers={this.props.cols} checkCallback={this.isChecked} onClick={this.props.click}/>);
        }
	}	
	
	componentDidMount() {
				var checked = this.state.rowsCheckedState;
				for (var i = 0; i < this.props.numRows; i++) {
					checked[i] = false;
				}

				this.setState({ rowsCheckedState: checked });
				this.props.getRows(this.state.rowsCheckedState);
	}
		
    render() {
        const headerCols = [];
		var rows = [];
        for (var i = 0; i < this.props.numCols; i++) {
            headerCols.push(<th key={i} number={i}>{this.props.cols[i]}</th>);
        }
		
		this.drawRows(rows);

		var isCheckedAll = false;

		if (!this.props.reset) {
			isCheckedAll = this.state.allChecked;
		}
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th width="3%">
                            <Form.Check 
								id="selectall"
								checked={isCheckedAll}
								onClick={this.handleSelectAll}
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
		var checkArray = this.state.rowsCheckedState;
		for (var i = 0; i < this.props.numRows; i++) {
			checkArray[i] = e.target.checked;
		}
		this.setState({ 
			allChecked: e.target.checked,
			rowsCheckedState: checkArray });	

		this.props.getRows(this.state.rowsCheckedState);
	};
}

export default CustomTable;
