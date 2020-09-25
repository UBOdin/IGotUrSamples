import React, { Component } from 'react';
import { Button, ButtonGroup, Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import CustomAlertBanner from './CustomAlertBanner'

/* Note: DatePicker is an additional dependency, NOT included in
 * react-bootstrap! Documentation can be found at https://reactdatepicker.com/
 */
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
const phpServerURL = require('../config/serverconfig').phpServerURL;
/* AddSamples: this is the interface for entering new sample information into
 * the database.
 */
class AddSamples extends Component {
	constructor(props) {
    	super(props);
        this.state = {
            /* This is where sample data entered into the fields are tracked,
             * to be validated and sent to the database. The fields begin
             * empty.
             */
            id: '',
            eval: '',
            date: new Date(),
            hb: '',
            pb: '',
            density: '',
            type: '',
            aliquots: '',
			initialstorageconditions: '',
            bht: false,
			edta: false,
			heparin: false,
			mpa: false,
			foil: false,
			othertreatments: '',
			consent: '',
			/* These objects control the status of the alert banner at the top
             * of the frame. These change when a problem is detected in the
             * validate() method, or on a successful addition to the database
             * in send()
             */
            alertVisibility: false,
            alertText: 'Please enter all required fields.',
            alertVariant: 'danger',
        }
        this.save = this.save.bind(this);
        this.saveAndAddAnother = this.saveAndAddAnother.bind(this);
    }

    render() {
        return (
            <div>
                
                {
                /* Alert banner (begins invisible) */
                }
                
                {this.state.alertVisibility &&
                <CustomAlertBanner variant={this.state.alertVariant} text={this.state.alertText}/>
                }            

                {
                /* Sample data fields */
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
								onChange={e => this.setState({date: e})}
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
                        			<option></option>
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
                        			<option></option>
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
                            		checked={this.state.foil}
                            		onChange={e => this.setState({foil: e.target.checked})}/>
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
                            			checked={this.state.bht}
                            			onChange={e => this.setState({bht: e.target.checked})}/>
                    			</InputGroup.Prepend>
                    			<Form.Control value="BHT" />
                    		</InputGroup>
						   	<InputGroup>
                    			<InputGroup.Prepend>
                        			<InputGroup.Checkbox 
                            			id="edta"
                            			checked={this.state.edta}
                            			onChange={e => this.setState({edta: e.target.checked})}/>
                    			</InputGroup.Prepend>
                    			<Form.Control value="EDTA" />
                    		</InputGroup>
						   	<InputGroup>
                    			<InputGroup.Prepend>
                        			<InputGroup.Checkbox 
                            			id="heparin"
                            			checked={this.state.heparin}
                            			onChange={e => this.setState({heparin: e.target.checked})}/>
                    			</InputGroup.Prepend>
                    			<Form.Control value="Heparin" />
                    		</InputGroup>
						   	<InputGroup>
                    			<InputGroup.Prepend>
                        			<InputGroup.Checkbox 
                            			id="mpa"
                            			checked={this.state.mpa}
                            			onChange={e => this.setState({mpa: e.target.checked})}/>
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
	
                {
                /*The main difference between 'Save' and 'Save and add another' is that 'Save and add another' leaves a few select fields still filled in after sending to the database, so other samples with shared information can be quickly added afterward.
                 */
                }

                <div>   
                        <Button variant="outline-dark" size="lg" onClick={this.clearFields}>
                            Clear
                        </Button>
                        <Button variant="outline-dark" size="lg" onClick={this.saveAndAddAnother}>
                            Save and add another
                        </Button> 
                        <Button variant="primary" size="lg" onClick={this.save}>
                            Save
                        </Button>
                </div>
            </div>
        );
    }
    
    /* This handles the special case where the researcher has another sample
     * with similar values to enter afterward. It does the same things as
     * Save() but leaves some of the fields uncleared afterward.
     */
    saveAndAddAnother = () => {
        var errors = this.validateForms();
        
		if (!errors) {
			this.send();
	
            /* This is a custom requested reset of only SOME fields, so the
             * user can add another, similar sample without having to re-enter
             * everything.
             */
        	this.setState({
            	showAlert: true,
            	type: '',
            	initialstorageconditions: '',
            	bht: false,
				edta: false,
				heparin: false,
				mpa: false,
            	foil: false,
            	othertreatments: '',
                aliquots: '',
            	alertVisibility: true,
        	});
		}
    }

    /* Validate the forms, then send data to the database and clear the fields
     * for another entry.
     */
    save = () => {
        var errors = this.validateForms();

        if (!errors) {
			this.send();
            this.clearFields();
        }
    }

    /*This method checks the fields for invalid entries, displays a message by
     * alerting the alert banner's message and visibility, and returns true if
     * any errors are found. This should invariably be called and should return
     * false BEFORE sending any data to the database.
     */
    validateForms = () => {
        const numberFormatOneDigit = /^\(?([0-9]{1})\)?[.]?([0-9]{1})$/;
        const numberFormatTwoDigits = /^\(?([0-9]{2})\)?[.]?([0-9]{1})$/;
        const numberFormatThreeDigits = /^\(?([0-9]{3})\)?[.]?([0-9]{1})$/;
		const pbBelowDetectable = '<';
        var errorString = '';
        var errors = false;
        
        if (this.state.id === '' || this.state.eval === ''|| this.state.date === '' || this.state.type === '' || this.state.aliquots === '' || this.state.initialstorageconditions === '' || this.state.consent === '') {
        	errors = true;
        	errorString += 'Please enter all required fields. ';
        } 

		if (this.state.hb !== '' && 
			(!this.state.hb.match(numberFormatOneDigit) &&
			!this.state.hb.match(numberFormatTwoDigits))) {
				errors = true;
				errorString += 'Please enter correct format for Hb (typcal range between 7.0 - 19.0).';
			}

		if (this.state.pb !== '' &&
			(!this.state.pb.match(numberFormatOneDigit) &&
			!this.state.pb.match(numberFormatTwoDigits) &&
			!this.state.pb.match(numberFormatThreeDigits))) {
				if (!this.state.pb[0] === pbBelowDetectable &&
					(!this.state.pb.match(numberFormatOneDigit) &&
					!this.state.pb.match(numberFormatTwoDigits) &&
					!this.state.pb.match(numberFormatThreeDigits))) {
						errors = true;
						errorString += 'Please enter correct format for Pb (typically ranges from  <3.3 to 15).';
				}
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

    /* Send: creates a GET array with the (validated!) entries from the fields,
     * and calls the addsamples.php script.
     */
	send = () => {
		var getQuery =
			"id=" + this.state.id + "&" +
			"eval=" + this.state.eval + "&" +
			"date=" + this.getDateFormat(this.state.date) + "&" +
			"hb=" + this.state.hb + "&" +
			"pb=" + this.state.pb + "&" +
			"density=" + this.state.density + "&" +
			"type=" + this.state.type + "&" +
			"aliquots=" + this.state.aliquots + "&" +
			"initialstorageconditions=" + this.state.initialstorageconditions + "&" +
			"bht=" + this.state.bht + "&" +
			"edta=" + this.state.edta + "&" +
			"heparin=" + this.state.heparin + "&" +
			"mpa=" + this.state.mpa + "&" +
			"foilwrapped=" + this.state.foil + "&" +
			"othertreatments=" + this.state.othertreatments + "&" +
			"unrestrictedconsent=";
			
			if (this.state.consent === "Yes") {
				getQuery = getQuery + "1";
			} else {
				getQuery = getQuery + "0";
			}
		
		var sendReq;
		var getReq = phpServerURL+"/app/scripts/addsamples.php?" + getQuery;
		console.log(getReq)
		sendReq = new XMLHttpRequest();
		sendReq.open(
			"GET",
			getReq,
			true
		);
		sendReq.onload = function (e) {
			if (sendReq.readyState === 4 && sendReq.status === 200) {
			} else {
            	this.setState({
               		alertVariant: 'danger',
               		alertText: "There was an error connecting to the database: " + sendReq.statusText,
               		alertVisibility: true,
            	});
			}
		}

		sendReq.send();	
	};
	
    /* Converts the Date object from the DatePicker field into a format that
     * can be stored in the SQL database.
     */
    getDateFormat = (date) => {
		var formattedDate;
		var yyyy = date.getFullYear();
		var mm = String(date.getMonth() + 1).padStart(2, '0');
		var dd = String(date.getDate()).padStart(2, '0');
		formattedDate = yyyy + "-" + mm + "-" + dd;
		return formattedDate;
	}
    
    /* Full reset of the fields. */
    clearFields = () => {
        this.setState({
            id: '',
            eval: '',
            date: new Date(),
            hb: '',
            pb: '',
            density: '',
            type: '',
            aliquots: '',
            initialstorageconditions: '',
        	bht: false,
			edta: false,
			heparin: false,
			mpa: false,
            foil: false,
            othertreatments: '',
			consent: '',
        });
    }
}

export default AddSamples;

