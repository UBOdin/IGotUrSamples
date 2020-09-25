import React, { Component } from 'react';
import { Button, Form, FormControl, InputGroup, Row, Col} from 'react-bootstrap';
import CustomTable from './CustomTable';
const phpServerURL = require('../config/serverconfig').phpServerURL;

/* On the 'Reports' page, a set of pre-defined reports based on the database can be generated and exported, per the clients request. */
class Reports extends Component {
	constructor(props) {
		super(props);
        this.state = {
			/* The raw records returned by the various SQL queries */
            records: [],
			
			/* Table information: the headers get defined by the type of report requested, and then the table is rendered as an HTML object in the table state */
			headers: [],
            table: [],

			/* Report parameters sent via GET to the php script that retrieves the appropriate data */
			type: 'All',
            eval: '1',
            report: 'ID',

			/* For one of the reports, the user specifies which eval cycle should be reported on. In other cases, this field is hidden */
            eval_div_visible: false,
        }
        this.handleReportChange = this.handleReportChange.bind(this);
		this.exportToCSV = this.exportToCSV.bind(this);
		this.evalField = this.evalField.bind(this);
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
								<option>All</option>
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
				<Button variant="dark" size="lg" onClick={this.exportToCSV}>Export</Button>
				<hr />
				<Row>
                    <Col align="right">
					</Col>
                </Row>
                {this.state.table}
			</div>
    	)
	};

	/* Render the eval field, if necessary) */
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
	
	//This is a placeholder function so the table component doesn't throw an error when there is no function for the getRows prop. In a later refactoring, this should go away and instead the CustomTable component should set an empty function by default.
	getRowsDefault = () => {
	}

	/* Change the state to reflect the correct report. Also, make the eval field visible if necessary */
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
    }

	/* Here is where the gruntwork is done in calling the right script, sending it the right information, parsing what comes back and building a table to display it. Because each report is different, there's a lot to unpack here... */
    generateReport = () => {

        //All the scripts start with this address:
        var script_address = phpServerURL+"/app/scripts/retrieve_reports_";

		//Based on the report selected, we'll need to call a specific script at the location above. We'll also need specific table headers for the information being displayed. Those both happen here: */
		var headers = [];

        if (this.state.report === 'ID') {
            script_address = script_address + "samples_x_child.php";
            headers = ['ID','Frequency','Percent','Cumulative'];
        } else if (this.state.report === 'Eval') {
            script_address = script_address + "samples_x_eval.php";
            headers = ['Eval','Frequency','Percent','Cumulative'];
        } else if (this.state.report === 'ID Eval') {
            script_address = script_address + "eval_x_child.php";
			//This header is tricky, because it needs to include x columns, where x is the number of eval cycles in the database. Thus, we need to retrieve and parse the information before we can complete it. For now, we just put the ID field:
			headers = ['ID'];
        } else if (this.state.report === "ID if Eval =") {
            script_address = script_address + "id_x_eval_equals.php";
            headers = ['ID','Frequency','Percent','Cumulative'];
        } else {
        }

		//Include any additional parameters in the GET request:
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
				records: JSON.parse(request.responseText),
               });

				// OKAY... now that we've successfully retrieved the necessary data, we need to do several things. First, the reports require additional information about totals, cumulative totals etc. We collect that using the variables below:
				var total = 0;
				var cumulativeTotal = 0;
				var count = [];
				var percent = []; 
				var cumulative = [];

				//If the user wants ID x Evals, then we need to produce a dynamic number of rows based on the number of eval cycles that have been conducted. These are where we store data to work that out.
				var eval_number = [];
				var data_by_eval = [];

				//The "ID Eval" report is a unique case... the table needs to know how many Evals there are in order to print the right number of columns. Here we organize the data from the database so that can easily be infered, and then from there build the headers
				if (this.state.report === 'ID Eval') {

					//When the data comes out of the database, every record for every eval for every ID is separate. We need to restructure this data so one object contains the id along with the count of records for that id for each eval. This gnarly bit of code iterates over this.state.records and reorders the data into data_by_eval, which will eventually replace this.state.records. 
					for (var current_record of this.state.records) {
						//Have we found a record with this ID yet?
						var foundIt = false;
						//As long as there are reordered records to check...
						if (data_by_eval.length > 0) {
							for (var new_record of data_by_eval) {
								var prop = "eval" + current_record.eval;
								if (current_record.id === new_record.id) {	
									if (typeof new_record[prop] === "undefined") {
										new_record[prop] = 1;
									} else {
										new_record[prop] += 1;
									}
									eval_number[current_record.eval] += 1;
									foundIt = true;
									total += 1;
									break;
								}
							}
						}
						//If no record for that id has already been created in data_by_eval... make one.	
						if (!foundIt) {
							var new_row = {id:current_record.id};
							new_row["eval" + current_record.eval] = 1;
							data_by_eval.push(new_row);
							total += 1;	
							eval_number[current_record.eval] += 1;
						}
					}
					
					//This is the row with the totals for each eval, plus the total of totals
					var total_row = ({id:"Total"});
					
					//add up totals and add 0s to empty evals
					for (var record of data_by_eval) {
						var total = 0;
						for (var i = 1; i < eval_number.length; i++) {
							if (typeof record["eval" + i] === "undefined") {
								record["eval" + i] = 0;
							} else {
								total += record["eval" + i];
								if (typeof total_row["eval" + i] === "undefined") {
									total_row["eval" + i] = 1;
								} else {
									total_row["eval" + i] += record["eval" + i];
								}
							}
						}
						record["total"] = total;
						if (typeof total_row["total"] === "undefined") {
							total_row["total"] = total;
						} else {
							total_row["total"] += total;
						}
					}


					//Add totals row
					data_by_eval.push(total_row);
					this.setState({records: data_by_eval});
					for (var i = 1; i < eval_number.length; i++) {
						headers.push("Eval" + i);
					}
					headers.push("Total");
				} else {
					//As long as the record selected wasn't "ID Eval", then the process is much easier. We just have to calculate singular and cumulative totals and append them to the records.
					var records = this.state.records;
					//Assuming there are records to count...
					if (this.state.records.length > 0) {
						for (var record = 0; record < this.state.records.length; record++) {
							count[record] = +this.state.records[record]['frequency'];
							total = +total + +this.state.records[record]['frequency'];
						}		
				
						/* Now that we have frequency counts, determine percentage and cumulative percentage for each record */
						for (var i = 0; i < count.length; i++) {
							cumulativeTotal += count[i];
							percent[i] = (count[i] / total);
							cumulative[i] = (cumulativeTotal / total);
						}
	
						/* Concatenate the percentages and cumulatives with the existing records */
						/* Unfortunately this second loop through the same data is necessary because previously we didn't have the totals! */
						for (var record = 0; record < records.length; record++) {
							records[record]["percent"] = (percent[record]*100).toFixed(2);
							records[record]["cumulative"] = (cumulative[record]*100).toFixed(2);
						}
					}	

					/* Add a row for totals. */
					var total_row = ({id:"Total",eval:"Total",frequency:cumulativeTotal});
					if (records.length === 0) {
						records[0] = total_row;
					} else {
						total_row["percent"] = records[records.length-1]["cumulative"];
						total_row["cumulative"] = records[records.length-1]["cumulative"];
						records.push(total_row);
					}
							
					this.setState({ records: records });
				}

				//Now we have the reordered data, with the appropriate totals information, and the headers to match. Let's build the table!
        		this.setState({
            		table: [<CustomTable getRows={this.getRowsDefault} numCols={headers.length} numRows={this.state.records.length} cols={headers} toPopulateWith={this.state.records} reset={false} click={this.clickRowCallback}/>],
        			headers: headers,
				});
			} else {
                console.error(request.statusText);
            	console.error(script_address);
			}
        }.bind(this);

        request.send();

    }

	/* Export data in this.state.samples to CSV. */
	exportToCSV() {
		var element = document.createElement('a');

		var data = '';
		for (var header of this.state.headers) {
			data = data + header + ',';
		}
		
		data = data + '\n';

		for (var i = 0; i < this.state.records.length; i++) {

			for (var key in this.state.records[i]) {
				if (this.state.records[i].hasOwnProperty(key)) {
					data = data + this.state.records[i][key] + ', ';
				}
			}
			
			data = data + '\n';
		}

		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
		element.setAttribute('download', 'export.csv');

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}
}

export default Reports;
