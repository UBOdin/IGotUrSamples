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
			type: 'Blood',
            eval: '1',
            report: 'ID',
            eval_div_visible: true,
        }
        this.handleReportChange = this.handleReportChange.bind(this);
		this.evalField = this.evalField.bind(this);
	}

	componentDidMount() {
	}

	evalField() {
		if (this.state.eval_div_visible) {
			return (	
				<InputGroup className="mb-3">
              		<InputGroup.Prepend>
                   		<InputGroup.Text>Eval number:</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl 
                  		id="eval"
                  		value={this.state.eval}
                   		onChange={e => this.setState({eval: e.target.value})}/>
               	</InputGroup>
			);
		} else {
			return null;
		}
	}

	render() {
		return (
            <div>
            	<h3>Reports</h3>
                <Col>
                    <Row>
				        Report type: 
                        <Form.Group controlid="report">
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
						{this.evalField()}
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

		//Make the Eval field visible if the user selects "ID if Eval = " 
		var eval_visible = false;

        if (e.target.value === "ID if Eval =") {
            eval_visible = true;
		}
        
		this.setState({
			report: e.target.value,
			eval_div_visible: eval_visible,
		});
		
		console.log("e.target.value = " + e.target.value);
		console.log("this.state.report = " + this.state.report);
		console.log("Show div? " + this.state.eval_div_visible);
    }

    generateReport = () => {
        //call the right script
        var script_address = "https://cse.buffalo.edu/eehuruguayresearch/app/scripts/retrieve_reports_";

        if (this.state.report === 'ID') {
            script_address = script_address + "samples_x_child.php";
            this.setState({
                tableHeaders: ['ID','Frequency','Percent','Cumulative'],
                    });
        } else if (this.state.report === 'Eval') {
            script_address = script_address + "samples_x_eval.php";
            this.setState({
                tableHeaders: ['Eval','Frequency','Percent','Cumulative'],
                    });
        } else if (this.state.report === 'ID Eval') {
            script_address = script_address + "eval_x_child.php";
        } else if (this.state.report === "ID if Eval =") {
            script_address = script_address + "id_x_eval_equals.php";
            this.setState({
                tableHeaders: ['ID','Frequency','Percent','Cumulative'],
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
                console.log(script_address); 
                console.log(request.responseText);
                this.setState({
				records: JSON.parse(request.responseText),
               });

				var total = 0;
				var cumulativeTotal = 0;
				var count = [];
				var percent = []; 
				var cumulative = [];
				/* If the record calls for a percentage, start by taking a count of frequency */
				for (var headerIdx = 0; headerIdx < this.state.tableHeaders.length; headerIdx++) {
					if (this.state.tableHeaders[headerIdx] === 'Percent') {
						for (var record = 0; record < this.state.records.length; record++) {
							count[record] = +this.state.records[record]['frequency'];
							total = +total + +this.state.records[record]['frequency'];
							console.log("count = " + count[record]);
							console.log("total = " + total);
						}		
				
						/* Now that we have frequency counts, determine percentage and cumulative percentage for each record */
						for (var i = 0; i < count.length; i++) {
							cumulativeTotal += count[i];
							percent[i] = (count[i] / total);
							cumulative[i] = (cumulativeTotal / total);
						}

						/* Concatenate the percentages and cumulatives with the existing records */
						var records = this.state.records;
						for (var record = 0; record < records.length; record++) {
							records[record]["percent"] = Math.round(percent[record]*100);
							records[record]["cumulative"] = Math.round(cumulative[record]*100);
						}

						/* Add a row for totals. 
                           TODO: put this in a separate line below, as opposed to in the record. */
						records.push({id:"Total",frequency:cumulativeTotal, percent:records[records.length-1]["cumulative"], cumulative:records[records.length-1]["cumulative"]});
						this.setState({ records: records });
						console.log(this.state.records);
					}
				}



        		this.setState({
            		table: [<CustomTable getRows={this.getRowsDefault} numCols={this.state.tableHeaders.length} numRows={this.state.records.length} cols={this.state.tableHeaders} toPopulateWith={this.state.records} reset={false} click={this.clickRowCallback}/>]
        		});
			} else {
                console.error(request.statusText);
            	console.error(script_address);
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
