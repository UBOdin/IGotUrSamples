import React, { Component } from 'react';
import { Alert, Button, ButtonGroup, Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import AddSamplesAliquots from './AddSamplesAliquots'

class AddSamples extends Component {
    constructor(props) {
        super(props);
    this.state = {
    //change alert visibility to be property of custom banner 
       showAlert: false,
        id: '',
        eval: '',
        date: '',
        hb: '',
        pb: '',
        density: '',
        type: '',
        aliquots: '',
        initialstorageconditions: '',
        treatments: '',
        foil: false,
        otherTreatments: '',
    }
}

    render() {

        return (
            <div>
               {this.state.showAlert && 
                    <div id="alert-banner" isHidden="true">
                        <Alert variant="success">
                            Samples successfully saved!
                        </Alert>
                   </div>
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
                                <FormControl
                                        id="date"
                                        value={this.state.date}
                                        onChange={e => this.setState({date: e.target.value})}/>
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
                        </Col>
                </Row>
                       <hr />
                        <Row>
                <Col>
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
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>Treatments:</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control 
                        id="treatments" 
                        as="select" multiple
                        value={this.state.treatments}
                        onChange={e => this.setState({treatments: e.target.value})}>
                        <option>BHT</option>
                        <option>EDTA</option>
                        <option>Foil Wrapping</option>
                        <option>Heparin</option>
                        <option>MPA</option>
                    </Form.Control>
                    </InputGroup>
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
        this.setState({
            showAlert: true,
            type: '',
            aliquots: '',
            initialstorageconditions: '',
            treatments: '',
            foil: false,
            otherTreatments: ''
        });
    }

    save = () => {
        //TODO: Send data via POST to database
        //TODO: Check for errors and post the right banner!
        this.setState({
            showAlert: true,
            id: '',
            eval: '',
            date: '',
            hb: '',
            pb: '',
            density: '',
            type: '',
            aliquots: '',
            initialstorageconditions: '',
            treatments: '',
            foil: false,
            otherTreatments: ''
        });
    }
}
export default AddSamples;

