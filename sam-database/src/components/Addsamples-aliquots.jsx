import React, { Component } from 'react';
import { Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import './Addsamples.css';
import { Link } from 'react-router-dom';

class Addsamples_aliquots extends Component {
  render() {
    return (
      <div>
            <hr />
            <Row>
                <Col>
                    <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>Aliquots:</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl id="aliquots" value={this.props.aliquots}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>Type:</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control id="type" as="select" value={this.props.type}>
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
                        <InputGroup.Text>Initial storage conditions:</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control id="initialstorageconditions" as="select" value={this.props.initialstorageconditions}>
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
                    <Form.Control id="treatments" as="select" multiple value={this.props.treatments}>
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
                    <Form.Control id="othertreatments" value={this.props.othertreatments} />
                    </InputGroup>
                </Col>
            </Row>
      </div>
    );
  }
     
}

export default Addsamples_aliquots;


