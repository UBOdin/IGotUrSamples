import React, { Component } from 'react';
import { Button, ButtonGroup, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import './Addsamples.css';
import Addsamples_aliquots from './Addsamples-aliquots';
import { Link } from 'react-router-dom';

class Addsamples extends Component {
    state = {
        numAliquots: 1
    }

    render() {
        const aliquots = [];

        for (var i = 0; i < this.state.numAliquots; i++) {
            aliquots.push(<Addsamples_aliquots key={i} number={i}/>);
        }

        return (
            <div>
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
        this.setState({
            numAliquots: this.state.numAliquots + 1
        });
    }

    save = () => {
        //Send data via POST to database
        this.setState({
            numAliquots: 1
        });
    }
}

export default Addsamples;

