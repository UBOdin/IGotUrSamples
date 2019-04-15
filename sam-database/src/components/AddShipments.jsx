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
                    <p style={{padding:30}}>Number of samples: {this.state.numbersamples}
</p>
                </Col>
               </Row>

                <div>
                    <ButtonGroup>
                        <Button variant="dark" size="lg" onClick={this.save}>
                            Save
                        </Button>
                    </ButtonGroup>
                </div>
                <Search />
                <Row>
                    <Col>
                       <CustomTable numCols={4} numRows={8} cols={['ID','Eval','Date','Aliquots']} />
                    </Col>
                    <Col md="auto">
                        <Button>Add to</Button><br/>
                        <Button>Remove</Button> 
                    </Col>
                    <Col>
                        <CustomTable numCols={4} numRows={8} cols={['ID','Eval','Date','Aliquots']} />
                    </Col>
                </Row> 
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
            treatments: '',
            foil: false,
            otherTreatments: '',
            alertVisibility: true,
        });
    }

    save = () => {
        //TODO: Send data via POST to database
        //TODO: Check for errors and post the right banner!
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
                treatments: '',
                foil: false,
                otherTreatments: '',
            });
        }
    }

    validateForms = () => {
        var numberFormat = /^\(?([0-9]{1})\)?[.]?([0-9]{1})$/;
        var errorString = ''
        var errors = false;
        
        if (this.state.id === '' || this.state.eval === ''|| this.state.date === '' || this.state.type === '' || this.state.aliquots === '' || this.state.initialstorageconditions === '') {
        errors = true;
        errorString += 'Please enter all required fields. ';
        } 

        if ((this.state.hb != '' && !this.state.hb.match(numberFormat)) || (this.state.pb != '' && !this.state.pb.match(numberFormat))) {
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

export default AddShipments;

