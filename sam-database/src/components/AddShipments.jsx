import React, { Component } from 'react';
import { Button, ButtonGroup, Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import CustomAlertBanner from './CustomAlertBanner'
import Search from './Search';
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
			samplesadded: [],
			connectionMsg: '',
			connectionstatus: -1,
        }
    	this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
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

					<hr />

					<Search />
           
		   			<Row>
                    	<Col>
                       		<CustomTable numCols={4} numRows={this.state.samples.length} cols={['ID','Eval','Date','Type','Aliquots']} toPopulateWith={this.state.samples}/>
                    	</Col>
                    	<Col md="auto">
							<div style={{padding: 25}}>
                        		<Button as="input" value=">>" variant="dark"></Button><p/>
                        		<Button as="input" value="<<" variant="dark"></Button> 
                  			</div>
		    			</Col>
                    	<Col>
                        	<CustomTable numCols={4} numRows={this.state.samples.length} cols={['ID','Eval','Date','Type','Aliquots']} toPopulateWith={this.state.samplesadded}/>
                    	</Col>
                	</Row> 
            	</div>
        	);
    	}

    	save = () => {
        	//TODO: Send data via POST to database
			var errors = this.validateForms();

			if (!errors) {
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

export default AddShipments;

