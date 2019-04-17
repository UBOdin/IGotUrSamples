import React, { Component } from 'react';
import { Button, ButtonGroup, Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import CustomAlertBanner from './CustomAlertBanner'
import Search from './Search';
import CustomTable from './CustomTable'; 

class AddShipments extends Component {
	constructor(props) {
    	super(props);
        this.state = {
            id: '',
            date: '',
            from: '',
            to: '',
            numbersamples: '0',
            storageconditions: '',
            notes: '',
            alertVisibility: false,
            alertText: 'Please enter all required fields.',
            alertVariant: 'danger',
        }
    
        this.save = this.save.bind(this);
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
                                    <InputGroup.Text>ID:</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                	id="id" 
                                    value={this.state.id}
                                    onChange={e => this.setState({id: e.target.value})}/>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Date:</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    id="date"
                                    value={this.state.date}
                                    onChange={e => this.setState({date: e.target.value})}/>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>From:</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    id="from"
                                    value={this.state.from}
                                    onChange={e => this.setState({from: e.target.value})}/>
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
                        </Col>
                        <Col>
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
                    		<InputGroup>
                    			<InputGroup.Prepend>
                        			<InputGroup.Text>Notes:</InputGroup.Text>
                    			</InputGroup.Prepend>
                    			<Form.Control as="textarea" id="notes"
                        			value={this.state.notes}
                        			onChange={e => this.setState({notes: e.target.value})}/>
                    		</InputGroup>
                    		<p style={{padding:30}}>Number of samples: {this.state.numbersamples}</p>
                		</Col>
               		</Row>

                	<div>
                    	<ButtonGroup>
                        	<Button variant="dark" size="lg" onClick={this.save}>
                            	Save
                        	</Button>
                    	</ButtonGroup>
                	</div>

					<hr />

					<Search />
           
		   			<Row>
                    	<Col>
                       		<CustomTable numCols={4} numRows={8} cols={['ID','Eval','Date','Aliquots']} />
                    	</Col>
                    	<Col md="auto">
							<div style={{padding: 25}}>
                        		<Button as="input" value=">>" variant="dark"></Button><p/>
                        		<Button as="input" value="<<" variant="dark"></Button> 
                  			</div>
		    			</Col>
                    	<Col>
                        	<CustomTable numCols={4} numRows={8} cols={['ID','Eval','Date','Aliquots']} />
                    	</Col>
                	</Row> 
            	</div>
        	);
    	}

    	save = () => {
        	//TODO: Send data via POST to database
        	//TODO: Check for errors and post the right banner!
    	}

    	validateForms = () => {
		//TODO
		}
	}

export default AddShipments;

