import React, { Component } from 'react';
import { Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import Search from './Search';
import CustomTable from './CustomTable'; 

class ViewShipments extends Component {
   	constructor(props) {
		super(props);
    	this.state = {
        	//Eventually this will need to respond to number of samples in database, obviously
        	numRows: 8,
			connectMsg: '',
			shipments: [],
			connectionstatus: -1,
			headers: ['Date','From','To','Samples'],
    	}
	}

	//This is a placeholder function so the table component doesn't throw an error when there is no function for the getRows prop. In a later refactoring, this should go away and instead the CustomTable component should set an empty function by default.
	getRowsDefault = () => {
	}

	componentDidMount() {
		var request;

		request = new XMLHttpRequest();
		request.open(
			"GET",
			"https://cse.buffalo.edu/eehuruguayresearch/scripts/retrieve_all_shipments.php",
			true
		);
		request.onload = function (e) {
			if (request.readyState === 4 && request.status === 200) {
				console.log("All clear");
				this.setState({ 
					connectMsg: request.responseText,
					shipments: JSON.parse(request.responseText),
					numRows: this.state.shipments.length,
					connectionstatus: request.status, 
				});
			} else {
				console.error(request.statusText);
				this.setState({
					connectMsg: request.responseText,
					numRows: this.state.shipments.length,
					connectionstatus: request.status,
				});
			}
		}.bind(this);

		request.send();	
		
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
                        {this.state.shipments.length} shipments
                    </Col>
                </Row>

				<hr />
                
				<CustomTable getRows={this.getRowsDefault} numCols={4} numRows={this.state.shipments.length} cols={['Date','From','To','Samples']} toPopulateWith={this.state.shipments} />
            
			</div>
        )                
    };
}

export default ViewShipments;
