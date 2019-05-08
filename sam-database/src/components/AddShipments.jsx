import React, { Component } from 'react';
import { Button, ButtonGroup, Form, Row, Col, InputGroup, FormControl, Modal } from 'react-bootstrap';
import CustomAlertBanner from './CustomAlertBanner'
import CustomTable from './CustomTable'; 
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

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
			samplesadded: ['','','','','','','',''],
			connectionMsg: '',
			connectionstatus: -1,
			aliquotSelectorsForModal: [],
			showModal: false,
			checkedRowsSamples: [],
			checkedRowsShipment: [],
			samplesToSelectAliquotsFrom: [],
			checkedRowsInShipment: [],
			numberAliquotsSelectedForShipment: [],
	}
    	this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
		this.selectAliquotsForShipment = this.selectAliquotsForShipment.bind(this);
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
			"https://cse.buffalo.edu/eehuruguayresearch/scripts/retrieve_all.php",
			true
		);
		request.onload = function (e) {
			if (request.readyState === 4 && request.status === 200) {
				console.log("All clear");
				this.setState({ 
					connectMsg: request.responseText,
					samples: JSON.parse(request.responseText),
					connectionstatus: request.status, 
				});
			} else {
				console.error(request.statusText);
				this.setState({
					connectMsg: request.responseText,
					connectionstatus: request.status,
				});
			}
		}.bind(this);

		request.send();	
		
	}

    render() {
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
                		<Row>
                    		<Col>
                        		<ButtonGroup>
                            		<Button variant="dark" size="lg" onClick={this.save}>
										Save
									</Button>
                        		</ButtonGroup>
                    		</Col>
                    		<Col align="right">
                        		{this.state.samplesadded.length} samples in shipment
                    		</Col>
                		</Row>
					</div>


           
		   			<Row>
                    	<Col>
                       		<CustomTable numCols={4} numRows={this.state.samples.length} cols={['ID','Eval','Date','Type','Aliquots']} toPopulateWith={this.state.samples} getRows={this.getCheckedStateFromSamplesTable}/>
                    	</Col>
                    	<Col md="auto">
							<div style={{padding: 25}}>
                        		<Button as="input" value=">>" variant="dark" onClick={this.selectAliquotsForShipment}></Button><p/>
                        		<Button as="input" value="<<" variant="dark" onClick={this.removeFromShipment}></Button> 
                  			</div>
		    			</Col>
                    	<Col>
                        	<CustomTable numCols={4} numRows={this.state.samplesadded.length} cols={['ID','Eval','Date','Type','Aliquots']} getRows={this.getCheckedStateFromShipmentTable} toPopulateWith={this.state.samplesadded}/>
                    	</Col>
                	</Row> 
					<Modal show={this.state.showModal}>
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
			this.setState({ checkedRowsSamples: checkedRows });
		}

		numberOfAliquotsSelectedForShipment = (key, number) => {
			var numberAliquots = this.state.numberAliquotsSelectedForShipment;
			numberAliquots[key] = number;

			this.setState({ numberAliquotsSelectedForShipment: numberAliquots });
			console.log("Sample #: " + key + " changed to " + number + " aliquots.");
		}

		getCheckedStateFromShipmentTable = (checkedRows) => {
			this.setState({ checkedRowsShipment: checkedRows });
		}

		moveAliquotsToShipment = () => {
			console.log("number of aliquots selected for shipment: " + this.state.numberAliquotsSelectedForShipment);

			//Get aliquots for each sample allocated for shipment
			//REFACTOR: figure out how to use javascript array methods to reduce the n^2 time complexity here
			for (var i = 0; i < this.state.aliquotSelectorsForModal.length; i++) {
				if (this.state.numberAliquotsSelectedForShipment[i] === this.state.samplesToSelectAliquotsFrom[i]["aliquots"]) {
					for (var j = 0; j < this.state.samples.length; j++) {
						if (this.state.samples[j]["key_internal"] === this.state.samplesToSelectAliquotsFrom[i]["key_intenal"]) {
							//REFACTOR: this is anti-pattern!
							this.state.samples.remove(this.state.samples[j]);
							console.log("Correctly identifies a matching record with the same number of aliquots.");
						} else {
							console.log("Samples number " + j + "is not the sample you're looking for!");
						}
					}
				} else {
					console.log("didn't find a sample with same number of aliquots!");
				}
			}

			this.setState({ 
				showModal: false,
				samplesToSelectAliquotsFrom: [],
				numberAlquotsSelectedForShipment: [],
			});
			//If aliquots to ship matches total aliquots, remove record from this.state.samples
			//Else, decrement aliquots in samples by number of aliquots in shipment
			//In either case, add the samples to the shipment array/table
			
		}

        selectAliquotsForShipment() {
	
			var checkedRows = this.state.checkedRowsSamples;
			console.log("checkedRows: " + checkedRows);
			
			var toAliquotForShipment = [];
			
			for (var i = 0; i < this.state.samples.length; i++) {
				if (checkedRows[i]) {
					toAliquotForShipment.push(this.state.samples[i]);
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
			console.log("aliquotSelectors (local var): " + aliquotSelectors);
			console.log("aliquotSelectorsForModal (state): " + this.state.aliquotSelectorsForModal);
			console.log("samplesToSelectAliquotsFrom: " + this.state.samplesToSelectAliquotsFrom);	
        };

        removeFromShipment = () => {
            //new modal
            //for each selected sample, select number of aliquots
            //remove record from samplesadded
        }

    	save = () => {
        	//TODO: Send data via POST to database
			var errors = this.validateForms();

			if (!errors) {
                //add sample records to shipment database and mark appropriate
                //parent and child id
                //
                //add new shipment record to database
                this.setState({
					date: '',
					to: '',
					numbersamples: '0',
					storageconditions: '',
					shippingconditions: '',
					othershippingconditions: '',
					notes: '',
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

		options.push(<option>Remove</option>);

		return (
			<div>
				<p>Sample #{this.props.number}: ID {this.props.data["id"]}, Eval {this.props.data["eval"]}, Type: {this.props.data["type"]}}</p>
				<br/>Number of aliquots to add to shipment:
                <Form.Control 
                	id="storageconditions" 
                    as="select"
                    value={this.state.selected}
                    onChange={this.handleChange}>
   	             	{options}
				</Form.Control>
			</div>
		);
	}
}

export default AddShipments;

