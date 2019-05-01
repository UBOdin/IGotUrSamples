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
	}

	drawRows(rows) {
		for (var j = 0; j < this.props.numRows; j++) {
			rows.push(<Row numCols={this.props.numCols} key={j} number={j} checked={this.state.rowsCheckedState[j]} rowData={this.props.toPopulateWith[j]} headers={this.props.cols} checkCallback={this.isChecked}/>);
        }
	}	
	componentDidMount() {
			if (this.state.rowsCheckedState.length === 0) {
				var checked = [];
				for (var i = 0; i < this.props.numRows; i++) {
					checked.push({i:false});
				}

				this.setState({ rowsCheckedState: checked });
			}
	}
		
    render() {
        const headerCols = [];
		var rows = [];
        for (var i = 0; i < this.props.numCols; i++) {
            headerCols.push(<th key={i} number={i}>{this.props.cols[i]}</th>);
        }
		
		this.drawRows(rows);

        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th width="3%">
                            <Form.Check 
								id="selectall"
								checked={this.state.allChecked}
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
		var checkArray = [];
		for (var i = 0; i < this.props.numRows; i++) {
			checkArray.push({i:e.target.checked});
		}
		this.setState({ 
			allChecked: e.target.checked,
			rowsCheckedState: checkArray });
	};
}

export default CustomTable;
