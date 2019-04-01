import React, { Component } from 'react';
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import './Addsamples.css';
import { Link } from 'react-router-dom';

class Addsamples extends Component {
  render() {
    return (
      <div>
        <h2>New sample:</h2>
        <Container>
            <Row>
                <Col>
                    <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="id">ID</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="Sample ID"
                        aria-label="Sample ID"
                        aria-describedby="basic-addon1"
                    />
                    </InputGroup>
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col></Col>
            </Row>
        </Container>
      </div>
    );
  }
}

export default Addsamples;

