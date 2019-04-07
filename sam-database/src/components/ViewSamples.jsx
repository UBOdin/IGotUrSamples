import React, { Component } from 'react';
import { Button, ButtonGroup, Row, Col } from 'react-bootstrap';
import Search from './Search';
import CustomTable from './CustomTable';

class ViewSamples extends Component {
    state = {
        //Eventually this will need to respond to number of samples in database, obviously
        numRows: 8
    }

    render() {
        return (
            <div>
                <h3>View samples</h3>
                <Search />
                <Row>
                    <Col>
                        <ButtonGroup>
                            <Button variant="dark" size="lg">Add to shipment</Button>
                            <Button variant="dark" size="lg">Split</Button>
                            <Button variant="dark" size="lg">Deplete</Button>
                            <Button variant="dark" size="lg">Export</Button>
                        </ButtonGroup>
                    </Col>
                    <Col align="right">
                        {this.state.numRows} samples
                    </Col>
                </Row>
                <CustomTable numCols={5} numRows={this.state.numRows} cols={['ID','Eval','Date','Aliquots','Notes']} />
            </div>
        )                
    };
}

export default ViewSamples;
