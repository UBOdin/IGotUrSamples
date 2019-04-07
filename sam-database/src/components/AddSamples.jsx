import React, { Component } from 'react';
import { Alert, Button, ButtonGroup, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import AddSamplesAliquots from './AddSamplesAliquots'

class AddSamples extends Component {
    state = {
        numAliquots: 1,
        showAlert: false
    }

    render() {
        const aliquots = [];

        for (var i = 0; i < this.state.numAliquots; i++) {
            aliquots.push(<AddSamplesAliquots key={i} number={i} aliquots='3'/>);
        }

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
                                    <InputGroup.Text id="id">ID:</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="eval">Eval:</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="date">Date:</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl />
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="hb">Hb:</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="pb">Pb:</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="density">Density:</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl />
                            </InputGroup>
                        </Col>
                    </Row>
                { aliquots }
                <div>
                    <ButtonGroup>
                        <Button variant="dark" size="lg" onClick={this.duplicateAliquots}>
                            Duplicate
                        </Button>
                        <Button variant="dark" size="lg" onClick={this.save}>
                            Save
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    }

    duplicateAliquots = () => {
        //This may be bad practice... basically I'm doing this so the alert will disappear if you're adding new samples
        this.setState({
            numAliquots: this.state.numAliquots + 1,
            showAlert: false
        });
    }

    save = () => {
        //TODO: Send data via POST to database
        //TODO: Check for errors and post the right banner!
        this.setState({
            numAliquots: 1,
            showAlert: true
        });
    }
}

export default AddSamples;

