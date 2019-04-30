import React, { Component } from 'react';
import { Button, ButtonGroup, Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import CustomAlertBanner from './CustomAlertBanner'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

class AddSamples extends Component {
	constructor(props) {
    	super(props);
        this.state = {
            id: '',
            eval: '',
            date: new Date(),
            hb: '',
            pb: '',
            density: '',
            type: 'Blood',
            aliquots: '',
			initialstorageconditions: 'Room temperature',
            bht: false,
			edta: false,
			heparin: false,
			mpa: false,
			foil: false,
			otherTreatments: '',
			consent: '',
			alertVisibility: false,
            alertText: 'Please enter all required fields.',
            alertVariant: 'danger',
        }
    	this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.saveAndAddAnother = this.saveAndAddAnother.bind(this);
    }

	handleChange(date) {
		this.setState({
			date: date,
		});
	}

    render() {
        return (
            <div>
                {this.state.alertVisibility &&
                <CustomAlertBanner variant={this.state.alertVariant} text={this.state.alertText}/>
                }            
                <h3>Add samples:</h3>
                <Row>
                	<Col>
                    	<InputGroup className="mb-3">
                        	<InputGroup.Prepend>
                        		<InputGroup.Text>ID:</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                            	id="id" 
                                value={this.state.id}
                                onChange={e => this.setState({id: e.target.value})}/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                            	<InputGroup.Text>Eval:</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl 
                                id="eval"
                                value={this.state.eval}
                                onChange={e => this.setState({eval: e.target.value})}/>
                        </InputGroup>

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
								<InputGroup.Text>Unrestricted consent for samples?</InputGroup.Text>
							</InputGroup.Prepend>
							<FormControl
								id="consent"
								as="select"
								onChange={e => this.setState({consent: e.target.value})}>
									<option></option>
									<option>Yes</option>
									<option>No</option>
							</FormControl>
						</InputGroup>
                    	<InputGroup className="mb-3">
                    		<InputGroup.Prepend>
                        		<InputGroup.Text>Type:</InputGroup.Text>
                    		</InputGroup.Prepend>
                    		<Form.Control 
                        		id="type" 
                        		as="select"
                        		value={this.state.type}
                        		onChange={e => this.setState({type: e.target.value})}>
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
                    	</InputGroup>
                    	<InputGroup className="mb-3">
                    		<InputGroup.Prepend>
                        		<InputGroup.Text>Aliquots:</InputGroup.Text>
                    		</InputGroup.Prepend>
                    		<FormControl 
                        		id="aliquots"
                        		value={this.state.aliquots}
                        		onChange={e => this.setState({aliquots: e.target.value})}/>
                    	</InputGroup>
                    	<InputGroup className="mb-3">
                    		<InputGroup.Prepend>
                        		<InputGroup.Text>Initial storage conditions:</InputGroup.Text>
                    		</InputGroup.Prepend>
                    		<Form.Control 
                        		id="initialstorageconditions" 
                        		as="select"
                        		value={this.state.initialstorageconditions}
                        		onChange={e => this.setState({initialstorageconditions: e.target.value})}>
                        			<option>Room temperature</option>
                        			<option>4° C</option>
                        			<option>-20° C</option>
                        			<option>-80° C</option>
                    		</Form.Control>
                    	</InputGroup>
                    	<InputGroup>
                    		<InputGroup.Prepend>
                        		<InputGroup.Checkbox 
                            		id="foil"
                            		value={this.state.foil}
                            		onChange={e => this.setState({foil: e.target.value})}/>
                    		</InputGroup.Prepend>
                    		<Form.Control value="Foil wrapping?" />
                    	</InputGroup>
					</Col>
                    <Col>
                    	<InputGroup className="mb-3">
                        	<InputGroup.Prepend>
                        		<InputGroup.Text>Hb:</InputGroup.Text>
                        	</InputGroup.Prepend>
                        	<FormControl
                        		id="hb"
                            	value={this.state.hb}
                                onChange={e => this.setState({hb: e.target.value})}/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                            	<InputGroup.Text>Pb:</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                            	id="pb"
                                value={this.state.pb}
                                onChange={e => this.setState({pb: e.target.value})}/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                        	<InputGroup.Prepend>
                            	<InputGroup.Text>Density:</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                            	id="density"
                                value={this.state.density}
                                onChange={e => this.setState({density: e.target.value})}/>
                        </InputGroup>
                    	<InputGroup className="mb-3">
                    		<InputGroup.Prepend>
                        		<InputGroup.Text>Additives:</InputGroup.Text>
                    		</InputGroup.Prepend>
						   	<InputGroup>
                    			<InputGroup.Prepend>
                        			<InputGroup.Checkbox 
                            			id="bht"
                            			value={this.state.bht}
                            			onChange={e => this.setState({bdt: e.target.value})}/>
                    			</InputGroup.Prepend>
                    			<Form.Control value="BHT" />
                    		</InputGroup>
						   	<InputGroup>
                    			<InputGroup.Prepend>
                        			<InputGroup.Checkbox 
                            			id="edta"
                            			value={this.state.edta}
                            			onChange={e => this.setState({edta: e.target.value})}/>
                    			</InputGroup.Prepend>
                    			<Form.Control value="EDTA" />
                    		</InputGroup>
						   	<InputGroup>
                    			<InputGroup.Prepend>
                        			<InputGroup.Checkbox 
                            			id="heparin"
                            			value={this.state.heparin}
                            			onChange={e => this.setState({heparin: e.target.value})}/>
                    			</InputGroup.Prepend>
                    			<Form.Control value="Heparin" />
                    		</InputGroup>
						   	<InputGroup>
                    			<InputGroup.Prepend>
                        			<InputGroup.Checkbox 
                            			id="mpa"
                            			value={this.state.mpa}
                            			onChange={e => this.setState({mpa: e.target.value})}/>
                    			</InputGroup.Prepend>
                    			<Form.Control value="MPA" />
                    		</InputGroup>
                    	</InputGroup>
						<p />
                    	<InputGroup>
							<InputGroup.Prepend>
                        		<InputGroup.Text>Other treatments:</InputGroup.Text>
                    		</InputGroup.Prepend>
                    		<Form.Control id="othertreatments"
                        		value={this.state.othertreatments}
                        		onChange={e => this.setState({othertreatments: e.target.value})}/>
                    	</InputGroup>
					</Col>
                </Row>

				<hr />
	
                <div>
                    <ButtonGroup>
                        <Button variant="dark" size="lg" onClick={this.saveAndAddAnother}>
                            Save and add another
                        </Button>
                        <Button variant="dark" size="lg" onClick={this.save}>
                            Save
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    }

    saveAndAddAnother = () => {
        this.validateForms();
        
        this.setState({
            showAlert: true,
            type: 'Blood',
            aliquots: '',
            initialstorageconditions: 'Room temperature',
            bht: false,
			edta: false,
			heparin: false,
			mpa: false,
            foil: false,
            otherTreatments: '',
            alertVisibility: true,
        });
    }

    save = () => {
        //TODO: Send data via POST to database
        var errors = this.validateForms();

        if (!errors) {
            this.setState({
                id: '',
                eval: '',
                date: '',
                hb: '',
                pb: '',
                density: '',
                type: 'Blood',
                aliquots: '',
                initialstorageconditions: 'Room temperature',
            	bht: false,
				edta: false,
				heparin: false,
				mpa: false,
                foil: false,
                otherTreatments: '',
				consent: '',
            });
        }
    }

    validateForms = () => {
        var numberFormat = /^\(?([0-9]{1})\)?[.]?([0-9]{1})$/;
        var errorString = '';
        var errors = false;
        
        if (this.state.id === '' || this.state.eval === ''|| this.state.date === '' || this.state.type === '' || this.state.aliquots === '' || this.state.initialstorageconditions === '' || this.state.consent === '') {
        	errors = true;
        	errorString += 'Please enter all required fields. ';
        } 

        if ((this.state.hb !== '' && !this.state.hb.match(numberFormat)) || (this.state.pb !== '' && !this.state.pb.match(numberFormat))) {
            errors = true;
        	errorString += 'Please enter Hb and Pb in the correct format (eg. 3.3).';
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

export default AddSamples;

