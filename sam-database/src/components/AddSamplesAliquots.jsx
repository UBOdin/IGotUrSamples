import React, { Component } from 'react';
import { Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

class AddSamplesAliquots extends Component {
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
                    <FormControl id="aliquots" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>Type:</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control id="type" as="select" >
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
                    <Form.Control id="initialstorageconditions" as="select">
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
                    <Form.Control id="treatments" as="select" multiple>
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
                    <Form.Control id="othertreatments" />
                    </InputGroup>
                </Col>
            </Row>
      </div>
    );
  }
     
}

export default AddSamplesAliquots;


