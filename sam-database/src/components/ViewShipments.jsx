import React, { Component } from 'react';
import { Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import CustomTable from './CustomTable'; 
import CustomAlertBanner from './CustomAlertBanner';

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
			resetChecksShipment: false,
			checkedRowsShipment: [],
			alertVisibility: false,
			alertText: 'This text should not be visible. If it is, contact your system administrator.',
			alertVariant: 'danger',
			last_shipments_marked_received: [],
		}
		this.markShipmentsReceived = this.markShipmentsReceived.bind(this);
		this.undoMarkReceived = this.undoMarkReceived.bind(this);
	}

	//This is a placeholder function so the table component doesn't throw an error when there is no function for the getRows prop. In a later refactoring, this should go away and instead the CustomTable component should set an empty function by default.
	getRowsDefault = () => {
	}

	undoMarkReceived() {
	//REFACTOR: we REALLY need a generic sendRequest() method that can be resued here
	
		var undo_mark_received_request;
		var getQuery;

		for (var j = 0; j < this.state.last_shipments_marked_received.length; j++) {
			getQuery = getQuery + "id" + (j+1) + "=" + this.state.last_shipments_marked_received[j];

			if (j < (this.state.last_shipments_marked_received.length - 1)) {
				getQuery = getQuery + "&";
			}
		}

		undo_mark_received_request = new XMLHttpRequest();
		undo_mark_received_request.open(
			"GET",
			"https://cse.buffalo.edu/eehuruguayresearch/app/scripts/undomarkreceived.php?" + getQuery,
			true
		);
		undo_mark_received_request.onload = function (e) {

			if (undo_mark_received_request.readyState === 4 && undo_mark_received_request.status === 200) {
				console.log("All clear");

				this.setState({ 
					connectMsg: undo_mark_received_request.responseText,
					connectionstatus: undo_mark_received_request.status,
					alertVisibility: false,
				});
			} else {
				console.error(undo_mark_received_request.statusText);
				this.setState({
					connectMsg: undo_mark_received_request.responseText,
					connectionstatus: undo_mark_received_request.status,
					alertText: 'There was an error connecting to the database: ' + undo_mark_received_request.statusText,
					alertVariant: 'danger',
					alertVisibility: true,
				});
			}
		}.bind(this);

		undo_mark_received_request.send();	
	}

	markShipmentsReceived() {
		var areChecks = false;
		for (var checked in this.state.checkedRowsShipment) {
			if (checked) {
				areChecks = true;
			}
		}

		if (areChecks) {

			var shipments_to_mark_received = [];
			//get shipment id from shipment in table
			for (var i = 0; i < this.state.shipments.length; i++) {
				if (this.state.checkedRowsShipment[i]) {
					shipments_to_mark_received.push(this.state.shipments[i]["key_internal"])
				}
			}

			//send a GET request to mark it received in the db

			var mark_received_request;
			var getQuery;

			for (var j = 0; j < shipments_to_mark_received.length; j++) {
				getQuery = getQuery + "id" + (j+1) + "=" + shipments_to_mark_received[j];

				if (j < (shipments_to_mark_received.length - 1)) {
					getQuery = getQuery + "&";
				}
			}

			mark_received_request = new XMLHttpRequest();
			mark_received_request.open(
				"GET",
				"https://cse.buffalo.edu/eehuruguayresearch/app/scripts/markreceived.php?" + getQuery,
				true
			);
			
			mark_received_request.onload = function (e) {
				if (mark_received_request.readyState === 4 && mark_received_request.status === 200) {
					console.log("All clear");

					//REFACTOR: this might be neater inline below
					var plural = '';
					if (shipments_to_mark_received.length > 1) {
						plural = 's';
					}

					this.setState({ 
						connectMsg: mark_received_request.responseText,
						connectionstatus: mark_received_request.status,
						last_shipments_marked_received: shipments_to_mark_received,
						alertText: shipments_to_mark_received.length + " shipment" + plural + " marked received.",
						alertVariant: 'success',
						alertVisibility: true,
					});
				} else {
					console.error(mark_received_request.statusText);
					
					this.setState({
						connectMsg: mark_received_request.responseText,
						connectionstatus: mark_received_request.status,
						alertText: 'There was an error connecting to the database: ' + mark_received_request.statusText,
						alertVisibility: true,
					});
				}
			}.bind(this);

			mark_received_request.send();	

		}
	}


	getCheckedStateFromShipmentTable = (checkedRows) => {
		this.setState({ 
			checkedRowsShipment: checkedRows,
			resetChecksShipment: false,
		});
	}
	
	componentDidMount() {
		var request;

		request = new XMLHttpRequest();
		request.open(
			"GET",
			"https://cse.buffalo.edu/eehuruguayresearch/app/scripts/retrieve_all_shipments.php",
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

				//Remove any of the shipments that have already been received
				var pending_shipments = this.state.shipments;
				var indices_of_shipments_to_splice = [];
				
				for (var i = 0; i < pending_shipments.length; i++) {
					if (pending_shipments[i]["received"] == 1) {
						indices_of_shipments_to_splice.push(i);
						console.log("Found a received shipment!");
					}
				}

				for (var j = (indices_of_shipments_to_splice.length - 1); j > -1; j--) {
					pending_shipments.splice(indices_of_shipments_to_splice[j], 1);
				}	

				this.setState({ shipments: pending_shipments});

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
				{this.state.alertVisibility &&
				<CustomAlertBanner variant={this.state.alertVariant} text={this.state.alertText}/>
				}
				<h3>View Shipments</h3>
                <hr />
                <Row>
                    <Col>
                        <ButtonGroup>
                            <Button variant="dark" size="lg" onClick={this.markShipmentsReceived}>Mark received</Button>
                        </ButtonGroup>
                    </Col>
                    <Col align="right">
                        {this.state.shipments.length} shipments
                    </Col>
                </Row>

				<hr />
                
				<CustomTable getRows={this.getRowsDefault} numCols={4} numRows={this.state.shipments.length} cols={['Date','From','To','Samples']} toPopulateWith={this.state.shipments} reset={this.state.resetChecksSamples} getRows={this.getCheckedStateFromShipmentTable}/>
            
			</div>
        )                
    };
}

export default ViewShipments;
