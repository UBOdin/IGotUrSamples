import React, { Component } from 'react';
import { Button, Form, FormControl, InputGroup, Row, Col, Modal} from 'react-bootstrap';
import CustomTable from './CustomTable';
import CustomAlertBanner from './CustomAlertBanner';
import Filter from './Filter';

class Reports extends Component {
	constructor(props) {
		super(props);
        this.state = {
            tableHeaders: [],
            records: [],
            returnedFilterValues: [],
            table: [],
            type: '',
            eval: '',
            report: '',
            eval_div_visibility: 'hidden',
        }
        this.handleReportChange = this.handleReportChange.bind(this);
	}

	componentDidMount() {
	}

	render() {
		return (
            <div>
            	<h3>Reports</h3>
                <Col>
                    <Row>
				        Report type: 
                        <Form.Group controlID="report">
                            <Form.Control as="select"
                                value={this.state.report}
                            onChange={this.handleReportChange}>
                                <option>ID</option>
                                <option>Eval</option>
                                <option>ID Eval</option>
                                <option>ID if Eval = </option>
                            </Form.Control>
                        </Form.Group>
                    </Row>
                    <Row>
                    Sample type for report:
					    <Form.Group controlId="type">
						    <Form.Control as="select"
							    value={this.state.type}
						    onChange={(e) => {this.setState({type: e.target.value})}}>
							    <option>Blood</option>
							    <option>Blood Spot</option>
                       		    <option>Dust</option> 
							    <option>Hair</option>
                    		    <option>Plasma</option>
                    		    <option>Serum</option>
                   			    <option>Soil</option>
                   			    <option>Urine</option>
                   			    <option>Water</option>
						    </Form.Control>
					    </Form.Group>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <div style={{visibility:this.state.eval_div_visibility}}>
                            Eval number: 
                            <Form.Group controlId="eval">
                            </Form.Group>
                        </div>
                    </Row>
                    <Row>
                    </Row>
                </Col>
                <Button variant="dark" size="lg" onClick={this.generateReport}>Report</Button>
				<hr />
				<Row>
                    <Col align="right">
					</Col>
                </Row>
                {this.state.table}
                <CustomTable getRows={this.getRowsDefault} numCols={this.state.tableHeaders.length} numRows={this.state.records.length} cols={this.state.tableHeaders} toPopulateWith={this.state.records} reset={false} click={this.clickRowCallback}/>
			</div>
    	)
	};


	/* FILTER METHODS: */	
	
	/* Check to see if the filter's Type and Value aren't empty. 
	 * ANOTHER REFACTORING OPPORTUNITY: this is the same processFilter() 
	 * method in AddShipments, so the two of them should probably be 
	 * moved to (and maintained in) just one location. */
	processFilter() {
        //TODO: Check if it's not type and throw an alert!
		var getQuery = 'type=' + this.state.returnedFilterValues[0][2];
		
		var filterReq;
		var getReq = "https://cse.buffalo.edu/eehuruguayresearch/app/scripts/retrieve.php?" + getQuery;
		filterReq = new XMLHttpRequest();
		filterReq.open(
			"GET",
			getReq,
			true
		);
		filterReq.onload = function (e) {
			if (filterReq.readyState === 4 && filterReq.status === 200) {
				this.setState({
					records: JSON.parse(filterReq.responseText),
				});
			} else {
				console.error(filterReq.statusText);
			}
		}.bind(this);
		filterReq.send();	
	}

    
	/*Callback method for filter components that sends the contents of the
    * filter to this.state.filterVals. POTENTIAL REFACTORING OPPORTUNITY: 
	* this method is the same as the one in AddShipments... perhaps it should
	* be maintained in only one location and imported where needed?
    */
	getFilterValues = (type, equality, value, key) => {
		var filterVals = this.state.returnedFilterValues;
		  
        if (type === "Date") {
            value = this.getDateFormat(value);
        } 
        filterVals[key] = [type,equality,value];

		this.setState({ returnedFilterValues: filterVals});
	};

	//This is a placeholder function so the table component doesn't throw an error when there is no function for the getRows prop. In a later refactoring, this should go away and instead the CustomTable component should set an empty function by default.
	getRowsDefault = () => {
	}

    handleReportChange(e) {
        this.setState({report: e.target.value});
        if (e.target.value === 'ID if Eval = ') {
            this.setState({eval_div_visibility: 'visible'});
        }
    }

    generateReport = () => {
        //choose the right headers
        //call the right script
        var script_address = "https://cse.buffalo.edu/eehuruguayresearch/app/scripts/retrieve_reports_";

        if (this.state.report === 'ID') {
            script_address = script_address + "samples_x_child.php";
            this.setState({
                headers: ['ID','Freq.','Percent','Cum.'],
                    });
        } else if (this.state.report === 'Eval') {
            script_address = script_address + "samples_x_eval.php";
            this.setState({
                headers: ['Eval','Freq.','Percent','Cum.'],
                    });
        } else if (this.state.report === 'ID Eval') {
            script_address = script_address + "eval_x_child.php";
        } else if (this.state.report === 'ID if Eval = ') {
            script_address = script_address + "id_x_eval_equals.php";
            this.setState({
                headers: ['ID','Freq.','Percent','Cum.'],
                    });
        } else {
        }

        script_address = script_address + "?type=" + this.state.type + "&eval=" + this.state.eval;

        //send the request
        var request;

        request = new XMLHttpRequest();
        request.open(
            "GET",
            script_address,
            true,
        );
        request.onload = function (e) {
            if (request.readyState === 4 && request.status === 200) {
               this.setState({
                reports: JSON.parse(request.responseText),
                });
            } else {
                console.error(request.statusText);
            }
        }.bind(this);

        request.send();

        //if ID eval, need to count number of evals and update the table
        //headers
        //erase any previous table
        //make the new table
    }
}

export default Reports;
