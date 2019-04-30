import React, { Component } from 'react';
import { Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import Search from './Search';
import CustomTable from './CustomTable'; 

class ViewShipments extends Component {
    state = {
        //Eventually this will need to respond to number of samples in database, obviously
        numRows: 8
    }

    render() {
        return (
            <div>
                <h3>View Shipments</h3>
                <Search />
                <Row>
                    <Col>
                        <ButtonGroup>
                            <Button variant="dark" size="lg">Mark received</Button>
                        </ButtonGroup>
                    </Col>
                    <Col align="right">
                        {this.state.numRows} shipments
                    </Col>
                </Row>

				<hr />
                
				<CustomTable numCols={4} numRows={this.state.numRows} cols={['Date','From','To','Number of samples']} />
            
			</div>
        )                
    };
}

export default ViewShipments;
