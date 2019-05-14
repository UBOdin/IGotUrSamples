import React, { Component } from 'react';
import { Button, ButtonGroup, Form, Row, Col, InputGroup, FormControl, Modal } from 'react-bootstrap';
import CustomAlertBanner from './CustomAlertBanner'
import CustomTable from './CustomTable'; 
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Filter from './Filter';

class AddShipments extends Component {
	constructor(props) {
    	super(props);
        this.state = {
            date: new Date(),
            to: '',
            storageconditions: '',
			shippingconditions: '',
			othershippingconditions: '',
			notes: '',
            alertVisibility: false,
            alertText: 'Please enter all required fields.',
            alertVariant: 'danger',
			samples: [],
			samplesvisible: [],
            samplesadded: [],
            tubes: [],
            tubesinshipments: [],
            shipments: [],
			minimumRowsInTable: 16,
			connectionMsg: '',
			samplesconnectionstatus: -1,
			tubesconnectionstatus: -1,
			aliquotSelectorsForModal: [],
			showModal: false,
			checkedRowsSamples: [],
			checkedRowsShipment: [],
			samplesToSelectAliquotsFrom: [],
			numberAliquotsSelectedForShipment: [],
			resetChecksSamples: false,
			resetChecksShipment: false,
			filters: [<Filter key={1} number={1} retVals={this.getFilterValues}/>],
			returnedFilterValues: [],
			connectMsg: '',
	}
    	this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
		this.removeFromShipment = this.removeFromShipment.bind(this);
		this.selectAliquotsForShipment = this.selectAliquotsForShipment.bind(this);
		this.addFilter = this.addFilter.bind(this);
		this.processFilter = this.processFilter.bind(this);
	    this.send = this.send.bind(this);
	}

	getDateFormat = (date) => {
		var formattedDate;
		var yyyy = date.getFullYear();
		var mm = String(date.getMonth() + 1).padStart(2, '0');
		var dd = String(date.getDate()).padStart(2, '0');
		formattedDate = yyyy + "-" + mm + "-" + dd;
		return formattedDate;
	}
	getFilterValues = (type, equality, value, key) => {
		var filterVals = this.state.returnedFilterValues;
		 
        console.log("Type is: " + type); 
        console.log("value is: " + value);
        
        if (type === "Date") {
            value = this.getDateFormat(value);
        }

        filterVals[key] = [type,equality,value];

		this.setState({ returnedFilterValues: filterVals});
		console.log(this.state.returnedFilterValues.toString());
	};

	addFilter() {
		var newFilterArray = this.state.filters.concat(<Filter key={this.state.filters.length + 1} number={this.state.filters.length + 1} retVals={this.getFilterValues}/>);
		this.setState({ filters: newFilterArray });
	};


	processFilter() {
		this.setState({ connectMsg: 'Reached processing method.'});

		var getQuery = '';
		//for each filter in the array, find the corresponding keyi
		for (var i = 1; i <= this.state.filters.length; i++) {

			if (i !== 1) {
				getQuery = getQuery + '&';
			}

			//if type's not null
			//if value's not null
			if (this.state.returnedFilterValues[i][0] !== '' &&
				this.state.returnedFilterValues[i][2] !== '') {

				getQuery = getQuery 
					+ 't' + i + '=' + this.state.returnedFilterValues[i][0] + '&'
					+ 'e' + i + '=' + this.state.returnedFilterValues[i][1] + '&'
					+ 'v' + i + '=' + this.state.returnedFilterValues[i][2];
			}
		}
				//make SQL query and retrieve all samples that match (or don't match?) filter
		this.setState({ connectMsg: 'Created GET query' });
		var filterReq;
		var getReq = "https://cse.buffalo.edu/eehuruguayresearch/app/dev/scripts/retrieve.php?" + getQuery;
		console.log(getReq)
		filterReq = new XMLHttpRequest();
		filterReq.open(
			"GET",
			getReq,
			true
		);
		filterReq.onload = function (e) {
			if (filterReq.readyState === 4 && filterReq.status === 200) {
				console.log("All clear");
				console.log(filterReq.responseText)
				this.setState({
					samples: JSON.parse(filterReq.responseText),
					connectionstatus: filterReq.status,
					connectMsg: filterReq.responseText
				});
			} else {
				console.error(filterReq.statusText);
				this.setState({
					connectMsg: filterReq.responseText,
					connectionstatus: filterReq.status,
				});
			}
		}.bind(this);
		this.setState({ connectMsg: 'About to send GET request' });
		filterReq.send();	
		}
	
	handleChange(date) {
		this.setState({
			date: date,
		});
	}

	componentDidMount() {
		var request;

		request = new XMLHttpRequest();

		request.open(
			"GET",
			"https://cse.buffalo.edu/eehuruguayresearch/app/dev/scripts/retrieve_all.php?table=Samples",
			true
		);
		
        request.onload = function (e) {
			if (request.readyState === 4 && request.status === 200) {
				console.log("All clear");
				this.setState({ 
					connectMsg: request.responseText,
					samples: JSON.parse(request.responseText),
					samplesconnectionstatus: request.status, 
				});

        		var request_tubes = new XMLHttpRequest();

				request_tubes.open(
					"GET",
					"https://cse.buffalo.edu/eehuruguayresearch/app/dev/scripts/retrieve_all.php?table=Tubes",
					true
				);
        
				request_tubes.onload = function (e) {
					if (request_tubes.readyState === 4 && request_tubes.status === 200) {
						console.log("All clear");
						this.setState({ 
							connectMsg: request_tubes.responseText,
							tubes: JSON.parse(request_tubes.responseText),
							tubesconnectionstatus: request_tubes.status, 
						});

			        //Now that both samples and tubes are loeaded, we need to remove any aliquots already in a shipment from consideration for a
			        //new shiment.

					var samples_excluding_shipped_tubes = this.state.samples;
					var samples_depleted_to_splice = [];

//        			for (var tube in this.state.tubes) {
//            			if (tube["in_shipment"]) {	
//            				for (var sample in samples_excluding_shipped_tubes) {
//                				var sample_id = sample["key_internal"];
//								var tube_sample_id = tube["sample_key_internal"];
//                    			if (sample_id === tube_sample_id) {
//                        			sample["aliquots"]--;
//									if (sample["aliquots"] == 0) {
//										samples_depleted_to_splice.push(sample["key_internal"]);
//									}
//                        			break;
//                    			}
//                			}
//						}
//					}

					//Finally, remove any sample records for which there are no available aliquots/tubes
					//Potential bug? I'm not sure counting backwards over the index prevents the index from shifting as the array is spliced. Maybe have to do this in two steps.
//					for (var i = (samples_excluding_shipped_tubes.length - 1); i > -1; i--) {
//						for (var id in samples_depleted_to_splice) {
///							if (samples_excluding_shipped_tubes[i]["key_internal"] === id) {
//								samples_excluding_shipped_tubes.splice(i, 1);
//							}
//						}
//					}


        			this.setState({ 
						samples: samples_excluding_shipped_tubes,
						samplesvisible: samples_excluding_shipped_tubes,
					});


					} else {
						console.error(request_tubes.statusText);
						this.setState({
							connectMsg: request_tubes.responseText,
							tubesconnectionstatus: request_tubes.status,
						});
					}
				}.bind(this);

        		request_tubes.send();
				
			} else {
				console.error(request.statusText);
				this.setState({
					connectMsg: request.responseText,
					samplesconnectionstatus: request.status,
				});
			}
		}.bind(this);

        request.send();	
	}

	

    render() {
        //This variable, and the following code, are necessary so that the
        //shipment table doesn't disappear when there are no samples added!
        var shippingTableRowData = [];

        for (var i = 0; i < this.state.samplesadded.length; i++) {
            shippingTableRowData.push(this.state.samplesadded[i]);
		}

        if (shippingTableRowData.length < this.state.minimumRowsInTable) {
            while (shippingTableRowData.length < this.state.minimumRowsInTable) {
                shippingTableRowData.push('');
            }
        } 



		this.state.samplesvisible.sort(function(a, b) {
			var keyA = a["key_internal"];
			var keyB = b["key_internal"];

			return keyB - keyA;
		});
		
		return (
            <div>
                {this.state.alertVisibility &&
                <CustomAlertBanner variant={this.state.alertVariant} text={this.state.alertText}/>
                }            
                <h3>Add shipments:</h3>
                    <Row>
                        <Col>
                        	<InputGroup className="mb-3">
                            <InputGroup.Prepend>
                            	<InputGroup.Text>Date:</InputGroup.Text>
                            </InputGroup.Prepend>
							<DatePicker 
								className="form-control"
								fixedHeight={false}
								selected={this.state.date}
								onChange={this.handleChange}
							/>
                        </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>To:</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    id="to"
                                    value={this.state.to}
                                    onChange={e => this.setState({to: e.target.value})}/>
                            </InputGroup>
                    		<InputGroup className="mb-3">
                    			<InputGroup.Prepend>
                        			<InputGroup.Text>Storage conditions:</InputGroup.Text>
                    			</InputGroup.Prepend>
                    			<Form.Control 
                        			id="storageconditions" 
                        			as="select"
                        			value={this.state.storageconditions}
                        			onChange={e => this.setState({storageconditions: e.target.value})}>
                        				<option>Room temperature</option>
                        				<option>4° C</option>
                        				<option>-20° C</option>
                        				<option>-80° C</option>
                    			</Form.Control>
                    		</InputGroup>
                        </Col>
                        <Col>
							<InputGroup className="mb-3">
								<InputGroup.Prepend>
									<InputGroup.Text>Shipping Conditions:</InputGroup.Text>
								</InputGroup.Prepend>
								<Form.Control
									id="shippingconditions"
									as="select"
									value={this.state.shippingconditions}
                        			onChange={e => this.setState({shippingconditions: e.target.value})}>
										<option>None</option>
										<option>Dry ice</option>
										<option>Ice packs</option>
								</Form.Control>
							</InputGroup>
							<InputGroup className="mb-3">
								<InputGroup.Prepend>
									<InputGroup.Text>Other shipping conditions:</InputGroup.Text>
								</InputGroup.Prepend>
								<Form.Control id="othershippingconditions"
									value={this.state.othershippingconditions}
                        		onChange={e => this.setState({othershippingconditions: e.target.value})}/>
							</InputGroup>
							<InputGroup>
                    			<InputGroup.Prepend>
                        			<InputGroup.Text>Notes:</InputGroup.Text>
                    			</InputGroup.Prepend>
                    			<Form.Control as="textarea" id="notes"
                        			value={this.state.notes}
                        			onChange={e => this.setState({notes: e.target.value})}/>
                    		</InputGroup>
                		</Col>
               		</Row>

					<p />

					<div>
					<hr />
                {this.state.filters}
                		<Row>
                    		<Col>
                        		<ButtonGroup>
				<Button variant="dark" size="lg" onClick={this.addFilter}>Add another filter</Button>
				<Button variant="dark" size="lg" onClick={this.processFilter}>Filter</Button>
                            		<Button variant="dark" size="lg" onClick={this.save}>
										Save
									</Button>
                        		</ButtonGroup>
                    		</Col>
				<hr />
                		</Row>
                    		<Col align="right">
                        		{this.state.samplesadded.length} samples in shipment
                    		</Col>
					</div>


           
		   			<Row>
                    	<Col>
                       		<CustomTable numCols={5} numRows={this.state.samplesvisible.length} cols={['ID','Eval','Date','Type','Aliquots']} toPopulateWith={this.state.samplesvisible} getRows={this.getCheckedStateFromSamplesTable} reset={this.state.resetChecksSamples}/>
                    	</Col>
                    	<Col md="auto">
							<div style={{padding: 25}}>
                        		<Button as="input" value=">>" variant="dark" onClick={this.selectAliquotsForShipment}></Button><p/>
                        		<Button as="input" value="<<" variant="dark" onClick={this.removeFromShipment}></Button> 
                  			</div>
		    			</Col>
                    	<Col>
                        	<CustomTable numCols={5} numRows={shippingTableRowData.length} cols={['ID','Eval','Date','Type','Aliquots']} getRows={this.getCheckedStateFromShipmentTable} toPopulateWith={shippingTableRowData} reset={this.state.resetChecksShipment}/>
                    	</Col>
                	</Row> 
					<Modal size="lg" show={this.state.showModal}>
						<Modal.Header>
							<Modal.Title>Add samples to shipment</Modal.Title>
						</Modal.Header>
						<Modal.Body>
						<p>Click 'Save' to add all aliquots for each sample you selected to your shipment. Or, specify the number of available aliquots to go to the shipment below.</p>
						{this.state.aliquotSelectorsForModal}	
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={this.handleCloseModal}>Cancel</Button>
							<Button variant="primary" onClick={this.moveAliquotsToShipment}>Save</Button>
						</Modal.Footer>
					</Modal>
            	</div>

			);
    	}

		handleCloseModal = () => {
			this.setState({ showModal: false });
		}

		getCheckedStateFromSamplesTable = (checkedRows) => {
			this.setState({ 
				checkedRowsSamples: checkedRows,
				resetChecksSamples: false,
			});
		}

		numberOfAliquotsSelectedForShipment = (key, number) => {
			var numberAliquots = this.state.numberAliquotsSelectedForShipment;
			numberAliquots[key] = number;

			this.setState({ numberAliquotsSelectedForShipment: numberAliquots });
			console.log("Sample #: " + key + " changed to " + number + " aliquots.");
		}

		getCheckedStateFromShipmentTable = (checkedRows) => {
			this.setState({ 
				checkedRowsShipment: checkedRows,
				resetChecksShipment: false,
			});
		}

		moveAliquotsToShipment = () => {
			var samples = this.state.samplesvisible;
            var indicesToSplice = [];
			var samplesToAdd = [];
			//Get aliquots for each sample allocated for shipment
			//REFACTOR: figure out how to use javascript array methods to reduce the n^2 time complexity here
			for (var i = 0; i < this.state.aliquotSelectorsForModal.length; i++) {

                //In this case, we're moving all aliquots for a given sample.
                if (this.state.numberAliquotsSelectedForShipment[i] === this.state.samplesToSelectAliquotsFrom[i]["aliquots"]) {
					for (var j = 0; j < samples.length; j++) {
						//can't compare objects for equality in javascript...
                        //have to get value.
                        var samplesKey = samples[j]["key_internal"];
                        var aliquotsKey = this.state.samplesToSelectAliquotsFrom[i]["key_internal"];

                        if (samplesKey === aliquotsKey) {
							indicesToSplice.push(j);
							samplesToAdd.push(samples[j]);
						} else {
						}
					}
				
				//...aand here we're dealing with a situation where only SOME aliquots from a given sample are going in the shipment
				} else if (this.state.numberAliquotsSelectedForShipment[i] < this.state.samplesToSelectAliquotsFrom[i]["aliquots"]
                    && this.state.numberAliquotsSelectedForShipment[i] > 0) {
                    
                    var remaining_aliquots = this.state.samplesToSelectAliquotsFrom[i]["aliquots"] - this.state.numberAliquotsSelectedForShipment[i];
                    for (var j = 0; j < samples.length; j++) {
                        var samplesKey = samples[j]["key_internal"];
                        var aliquotsKey = this.state.samplesToSelectAliquotsFrom[i]["key_internal"];
                        
                        if (samplesKey === aliquotsKey) {
                            samples[j]["aliquots"] = this.state.numberAliquotsSelectedForShipment[i];
                            samplesToAdd.push(samples[j]);
                            samples[j]["aliquots"] = remaining_aliquots;
                        }
                    }
                } else { } 
			    
            }
			
			//remove selected samples from the left table, from the highest index down to avoid slipping the values around
			for (var index = indicesToSplice.length; index > 0; index--) {
				samples.splice(indicesToSplice[index-1], 1);
			}
			
			var checkedSamples = this.state.checkedRowsSamples;
			for (var check in checkedSamples) {
				check = false;
			}

            this.setState({ 
				showModal: false,
				samplesToSelectAliquotsFrom: [],
				numberAlquotsSelectedForShipment: [],
				samplesvisible: samples,
				samplesadded: samplesToAdd,
				checkedRowsSamples: check,
				resetChecksSamples: true,
			});
			
		}

        selectAliquotsForShipment() {
			var areChecks = false;
			for (var checked in this.state.checkedRowsSamples) {
				if (checked) {
					areChecks = true;
				}
			}

			if (areChecks) {
				var checkedRows = this.state.checkedRowsSamples;
				var toAliquotForShipment = [];
			
				for (var i = 0; i < this.state.samplesvisible.length; i++) {
					if (checkedRows[i]) {
						toAliquotForShipment.push(this.state.samplesvisible[i]);
					}
				}
				console.log("Aliquots to select: " + toAliquotForShipment.toString());

				var aliquotSelectors = [];

				for (var j = 0; j < toAliquotForShipment.length; j++) {
					aliquotSelectors.push(<AliquotSelector key={j} number={j} data={toAliquotForShipment[j]} aliquotsCallback={this.numberOfAliquotsSelectedForShipment}/>);
				}
				console.log("length of aliquots object is: " + toAliquotForShipment.length);

				this.setState({
					aliquotSelectorsForModal: aliquotSelectors,
					samplesToSelectAliquotsFrom: toAliquotForShipment,
					showModal: true,
				});
        	}
		};

        removeFromShipment() {
			var areChecks = false;
			for (var checked in this.state.checkedRowsShipment) {
				if (checked) {
					areChecks = true;
				}
			}

			if (areChecks) {
				var indicesToSplice = [];
				var samplesUpdated = this.state.samplesvisible;
				var shipmentUpdated = this.state.samplesadded;
				
                for (var i = 0; i < this.state.samplesadded.length; i++) {
					if (this.state.checkedRowsShipment[i]) {
						indicesToSplice.push(i);
						samplesUpdated.push(this.state.samplesadded[i]);
					}
				}
			
				samplesUpdated.sort(function(a, b) {
					var keyA = a["key_internal"];
					var keyB = b["key_internal"];

					return keyB - keyA;
				});

				for (var j = indicesToSplice.length; j > 0; j--) {
					shipmentUpdated.splice(indicesToSplice[j-1],1);
				}
				
				this.setState({ 
					samples: samplesUpdated,
					samplesadded: shipmentUpdated,
					resetChecksShipment: true,
				});

			}
        }

    	save = () => {
			var errors = this.validateForms();

			if (!errors) {
                this.send();
                this.setState({
					date: new Date(),
					to: '',
					storageconditions: '',
					shippingconditions: '',
					othershippingconditions: '',
					notes: '',
                    samplesadded: [],
					alertVisibility: true,
				});
			}
		}

    	validateForms = () => {
		    var errorString = '';
		    var errors = false;

		    if (this.state.to === '') {
			    errors = true;
			    errorString = "Please enter the shipment's recipient in the 'To:' field."
		    }

            if (this.state.samplesadded.length === 0) {
                errors = true;
                errorString = "This shipment has no samples!"
            }

		    if (errors) {
			    this.setState({
				    alertVariant: 'danger',
				    alertText: errorString,
				    alertVisibility: true,
			    });
			    return true;
		    } else {
			    this.setState({
				    alertVariant: 'success',
				    alertText: 'Success!',
				    alertVisibility: true,
			    });

			    return false;
		    }
	    }
	    
        send() {
            //add to shipment
            
            var sampleIDQuery = "";
            var numberSamplesQuery = "";

            for (var i = 0; i < this.state.samplesadded.length; i++) {
                sampleIDQuery = sampleIDQuery + "id" + (i + 1) + "=" + this.state.samplesadded[i]["key_internal"];

                numberSamplesQuery = numberSamplesQuery + "num" + (i + 1) + "=" + this.state.samplesadded[i]["aliquots"];

                if (i < (this.state.samplesadded.length - 1)) {
                    sampleIDQuery = sampleIDQuery + "&";
                    numberSamplesQuery = numberSamplesQuery + "&"; 
            }
}
		    var getQuery =
                "date=" + this.getDateFormat(this.state.date) + "&" +
                //TODO: make from location specific to user
                "from=University at Buffalo&" + 
                "to=" + this.state.to + "&" + 
                "samples=" + this.state.samplesadded.length + "&" + 
                sampleIDQuery + "&" + 
                numberSamplesQuery;
			    //TODO: Add other queries to either shipment_batch table, or
                //shipment_tubes table (whichever makes sense)
		
		    var sendReq;
			var getReq = "https://cse.buffalo.edu/eehuruguayresearch/app/dev/scripts/addshipment.php?" + getQuery;
		    console.log(getReq)
		    sendReq = new XMLHttpRequest();
		    sendReq.open(
			    "GET",
			    getReq,
			    true
		    );
		    sendReq.onload = function (e) {
			    if (sendReq.readyState === 4 && sendReq.status === 200) {
				    console.log("All clear");
				    console.log(sendReq.responseText);
			    } else {
            	    this.setState({
               		    alertVariant: 'danger',
               		    alertText: "There was an error connecting to the database: " + sendReq.statusText,
               		    alertVisibility: true,
            	    });
				    console.log(sendReq.responseText);
			    }
		    }.bind(this);

		    sendReq.send();
	    };
}


class AliquotSelector extends Component {
	constructor(props) {
    	super(props);
        this.state = {
			selected: this.props.data["aliquots"],
		}
	}
	
	handleChange = (e) => {
		this.props.aliquotsCallback(this.props.number, e.target.value);
		this.setState({selected: e.target.value});
	}

	componentDidMount() {
		this.props.aliquotsCallback(this.props.number, this.state.selected);
	}

	render() {
		var options = [];

		for (var i = this.props.data["aliquots"]; i > 0; i--) {
			options.push(<option>{i}</option>);
		}

		options.push(<option>0</option>);

		return (
			<div>
                <Row>
                    <Col xs={6}>Sample #{this.props.number + 1}: Add up to {this.props.data["aliquots"]} aliquots of {this.props.data.type} (ID {this.props.data["id"]}, Eval {this.props.data["eval"]})</Col>
                    <Col>
                        <Form.Control 
                	        id="storageconditions" 
                            as="select"
                            value={this.state.selected}
                            onChange={this.handleChange}>
   	             	        {options}
				        </Form.Control>
                    </Col>
                </Row>
                <p/>
			</div>
		);
	}	
}


export default AddShipments;

