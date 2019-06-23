import React, { Component } from 'react';
import { Table, Form } from 'react-bootstrap';
import Row from './Row';

/* Defines the tables used throughout the app. They take in information 
 * about the size of the table--the number of rows and columns--and the 
 * desired column headers via props, and interface with the Row components 
 * to return information about which rows are checked so information from 
 * tables can be processed by their parent components. See the ViewSamples, 
 * AddShipments and ViewShipments components for examples of the 
 * CustomTable at work. */
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

	/* Once the component is mounted, reset the checkboxes for each row. 
	 * This is necessary so that the "select all" functionality works properly. 
	 * This.props.getRows at the end is a callback to the parent component 
	 * that transfers the information about which rows are checked (in this case, 
	 * it tells the parent that NO rows are checked). */
	componentDidMount() {
		var checked = this.state.rowsCheckedState;
		for (var i = 0; i < this.props.numRows; i++) {
			checked[i] = false;
		}

		this.setState({ rowsCheckedState: checked });
		this.props.getRows(this.state.rowsCheckedState);
	}
		
    render() {
		/* The following code (before render()) generates the header columns 
		 * (from props) and draws the required rows for the table (see drawRows() 
		 * below). Finally, we check this.props.reset, which is true if an action has 
		 * been completed using the checked boxes by the parent, and resets the "select 
		 * all" state. */
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
                        {
							/* The 'select all' checkbox in the column header row is a 
							 * special case of row checkboxes that we handle from the Table 
							 * component. */
                         }
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

	/* Create a number of rows in the table equal to this.props.numRows, and populate each 
	 * row i with the data sent to the Table in this.props.toPopulateWith[i]. If the 
	 * this.props.reset flag has not been thrown by the parent component, use 
	 * this.state.rowsCheckedState[i] to track whether the row is supposed to be checked or not. */
	drawRows(rows) {
		for (var j = 0; j < this.props.numRows; j++) {
			var isChecked = false;
			if (!this.props.reset) {
				isChecked = this.state.rowsCheckedState[j];
			}
		
			rows.push(<Row numCols={this.props.numCols} key={j} number={j} checked={isChecked} rowData={this.props.toPopulateWith[j]} headers={this.props.cols} checkCallback={this.isChecked} click={this.clickRowCallback}/>);
        }
	}	

	/* This runs when the user checks the "select all" box. It effectively overwrites 
	 * this.state.rowsCheckedState so every row matches the "select all" box, and sets 
	 * this.state.allchecked to the corresponding state. */
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

	/* Callback method sent to Row components that collects information about whether the 
	 * Row is checked or not. Although each Row component in a Table has its own 'checked 
	 * state,' the Table itself tracks which rows are checked in this.state.rowsCheckedState, 
	 * in order to easily convey that information to the Table's parent component. */
	isChecked = (key, value) => {
		var checkedRows = this.state.rowsCheckedState;
		checkedRows[key] = value;

		this.setState({ rowsCheckedState: checkedRows });
		this.props.getRows(this.state.rowsCheckedState);
	}

	/* This is a sort-of pass-through callback method that retrieves a Row's updated checkbox 
	 * state, and sends it to the Table's parent for tracking there. */
	clickRowCallback = (row) => {
		this.props.click(row);
	}

}

export default CustomTable;
