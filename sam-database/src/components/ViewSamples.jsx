import React, { Component } from 'react';
import { Button, Form, FormControl, InputGroup, Row, Col, Modal} from 'react-bootstrap';
import CustomTable from './CustomTable';
import CustomAlertBanner from './CustomAlertBanner';
import Filter from './Filter';
import DatePicker from 'react-datepicker'

class ViewSamples extends Component {
	constructor(props) {
		super(props);
		this.state = {
        	//8 is arbitrary here, just to tell the difference between nothing back from db vs. initial state
        	numRows: 8,
			connectMsg: '',
			samples: [],
			connectionstatus: -1,
			headers: ['ID','Eval','Date','HB','PB','Density','Type','Aliquots','Initial storage conditions','Additives','Other treatments','Foil wrapped','Unrestricted consent'],
			filters: [<Filter key={1} number={1} retVals={this.getFilterValues}/>],
			returnedFilterValues: [],
 		    modal: [],
        }
		this.addFilter = this.addFilter.bind(this);
		this.exportToCSV = this.exportToCSV.bind(this);
		this.processFilter = this.processFilter.bind(this);
	}

	getFilterValues = (type, equality, value, key) => {
		var filterVals = this.state.returnedFilterValues;
		filterVals[key] = [type,equality,value];

		this.setState({ returnedFilterValues: filterVals});
		console.log(this.state.returnedFilterValues.toString());
	};

	//This is a placeholder function so the table component doesn't throw an error when there is no function for the getRows prop. In a later refactoring, this should go away and instead the CustomTable component should set an empty function by default.
	getRowsDefault = () => {
	}

    clickRowCallback = (row) => {
		console.log("Entered callback method.");
		console.log(row);
        var modalArray = this.state.modal.concat(<SampleModal data={this.state.samples} number={row} visible={true}/>);
        this.setState({
            modal: modalArray,
        });
    }

	componentDidMount() {
		var request;

		request = new XMLHttpRequest();
		request.open(
			"GET",
			"https://cse.buffalo.edu/eehuruguayresearch/app/scripts/retrieve_all.php",
			true
		);
		request.onload = function (e) {
			if (request.readyState === 4 && request.status === 200) {
				console.log("All clear");
				console.log(request.responseText);
				this.setState({ 
					connectMsg: request.responseText,
					samples: JSON.parse(request.responseText),
					numRows: this.state.samples.length,
					connectionstatus: request.status, 
				});
			} else {
				console.error(request.statusText);
				this.setState({
					connectMsg: request.responseText,
					numRows: this.state.samples.length,
					connectionstatus: request.status,
				});
			}
		}.bind(this);

		request.send();	
		
	}

	render() {
		return (
            <div>
            	<h3>Filter and export</h3>
                {this.state.filters}
				<Button variant="dark" size="lg" onClick={this.addFilter}>Add another filter</Button>
				<Button variant="dark" size="lg" onClick={this.processFilter}>Filter</Button>
                <Button variant="dark" size="lg" onClick={this.exportToCSV}>Export</Button>
				<hr />
				<Row>
                    <Col align="right">
                        {this.state.samples.length} samples 
					</Col>
                </Row>
                <CustomTable getRows={this.getRowsDefault} numCols={5} numRows={this.state.samples.length} cols={['ID','Eval','Date','Type','Aliquots','Notes']} toPopulateWith={this.state.samples} reset={false} click={this.clickRowCallback}/>
				{this.state.modal}
			</div>
    	)
	};


	
    addFilter() {
		var newFilterArray = this.state.filters.concat(<Filter key={this.state.filters.length + 1} number={this.state.filters.length + 1} retVals={this.getFilterValues}/>);
		this.setState({ filters: newFilterArray });
	};

	exportToCSV() {
		var element = document.createElement('a');

		var data = 'ID,Eval,Date,HB,PB,Density,Type,Aliquots,Initial storage conditions,Additives,Other treatments,Foil wrapped,Unrestricted consent,Notes\n';

		for (var i = 0; i < this.state.samples.length; i++) {

			for (var key in this.state.samples[i]) {
				if (this.state.samples[i].hasOwnProperty(key)) {
					if (key !== "key_internal") {
						data = data + this.state.samples[i][key] + ', ';
					}
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

	processFilter() {
		this.setState({ connectMsg: 'Reached processing method.'});

		var getQuery = '';
		//for each filter in the array, find the corresponding keyi
		for (var i = 1; i <= this.state.filters.length; i++) {

			if (i !== 1) {
				getQuery = getQuery + '&';
			}

			//if type's not null (should never be!)
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
		var getReq = "https://cse.buffalo.edu/eehuruguayresearch/app/scripts/retrieve.php?" + getQuery;
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
					numRows: this.state.samples.length,
					connectionstatus: filterReq.status,
					connectmsg: filterReq.responseText
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

		
	
}

//REFACTOR: this modal is mostly reused from the AddSamples component, without
//an "add another" button and different save() function that updates an entry
//instead of adds one. This could probably be refactored since so much of it is
//reused.
class SampleModal extends Component {
	constructor(props) {
    	super(props);
        this.state = {
            visible: this.props.visible,
            id: this.props.data[this.props.number]["id"],
            eval: this.props.data[this.props.number]["eval"],
            date: this.props.data[this.props.number]["date"],
            hb: this.props.data[this.props.number]["hb"],
            pb: this.props.data[this.props.number]["pb"],
            density: this.props.data[this.props.number]["density"],
            type: this.props.data[this.props.number]["type"],
            aliquots: this.props.data[this.props.number]["aliquots"],
			initialstorageconditions: this.props.data[this.props.number]["initialstorageconditions"],
            bht: this.props.data[this.props.number]["bht"],
			edta: this.props.data[this.props.number]["edta"],
			heparin: this.props.data[this.props.number]["heparin"],
			mpa: this.props.data[this.props.number]["mpa"],
			foil: this.props.data[this.props.number]["foil"],
			othertreatments: this.props.data[this.props.number]["othertreatments"],
			consent: this.props.data[this.props.number]["consent"],
			alertVisibility: false,
            alertText: 'Please enter all required fields.',
            alertVariant: 'danger',
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
		console.log(this.props.data);
	}

    closeModal = () => {
        this.setState({
           visible: false, 
        });
    }
    
    render() {
        return (
            <Modal size="lg" show={this.state.visible} onHide={this.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit sample</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.alertVisibility &&
                    <CustomAlertBanner variant={this.state.alertVariant} text={this.state.alertText}/>
                    }            
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
	
                    </Modal.Body>
                    <Modal.Footer>
						<Button variant="secondary" size="lg" onClick={this.closeModal}>
                            Cancel
                        </Button>
                        <Button variant="primary" size="lg" onClick={this.save}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
        );
    }

    save = () => {
        var errors = this.validateForms();

        if (!errors) {
			this.send();
        }
    }

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

	send = () => {
		var getQuery =
            "key_internal=" + this.props.data[this.props.number]["key_internal"] + "&" + 
            "id=" + this.state.id + "&" +
			"eval=" + this.state.eval + "&" +
			"date=" + this.state.date + "&" +
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
			"unrestrictedconsent=" + this.state.consent;
		
		
		var sendReq;
		var getReq = "https://cse.buffalo.edu/eehuruguayresearch/app/scripts/editsample.php?" + getQuery;
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


export default ViewSamples;
