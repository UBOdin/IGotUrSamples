import React, { Component } from 'react';
import { Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import CustomTable from './CustomTable'; 
import CustomAlertBanner from './CustomAlertBanner';

/* This is the 'See Shipments' page. */
class ViewShipments extends Component {
   	constructor(props) {
		super(props);
    	this.state = {
			/* Shipment information from database: */
			shipments: [],
			
			/* Table states: */
			headers: ['Date','From','To','Samples'],
			resetChecksShipment: false,
			checkedRowsShipment: [],
			
			/* Alert states: */	
			alertVisibility: false,
			alertText: 'This text should not be visible. If it is, contact your system administrator.',
			alertVariant: 'danger',
		}
		this.markShipmentsReceived = this.markShipmentsReceived.bind(this);
	}

	/* When the component mounts, retrieve all shipments from the database and 
	 * filter out any of those that have been marked received. */
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
				this.setState({ 
					shipments: JSON.parse(request.responseText),
				});

				//Remove any of the shipments that have already been received
				var pending_shipments = this.state.shipments;
				var indices_of_shipments_to_splice = [];
				
				for (var i = 0; i < pending_shipments.length; i++) {
					if (pending_shipments[i]["received"] == 1) {
						indices_of_shipments_to_splice.push(i);
					}
				}

				for (var j = (indices_of_shipments_to_splice.length - 1); j > -1; j--) {
					pending_shipments.splice(indices_of_shipments_to_splice[j], 1);
				}	

				this.setState({ shipments: pending_shipments});

			} else {
				console.error(request.statusText);
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

	/* This is a placeholder function so the table component doesn't 
	 * throw an error when there is no function for the getRows prop. 
	 * In a later refactoring, this should go away and instead the 
	 * CustomTable component should set an empty function by default.
	 */
	getRowsDefault = () => {
	}

	/* This method is called when the user selects the 'Mark received' 
	 * button. It gets every shipment in the table that has been checked 
	 * and runs the script that marks it received in the database, which 
	 * it turn filters it out of view when the component refreshes. */
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

					//REFACTOR: this might be neater inline below
					var plural = '';
					if (shipments_to_mark_received.length > 1) {
						plural = 's';
					}

					this.setState({ 
						last_shipments_marked_received: shipments_to_mark_received,
						alertText: shipments_to_mark_received.length + " shipment" + plural + " marked received.",
						alertVariant: 'success',
						alertVisibility: true,
					});
				} else {
					console.error(mark_received_request.statusText);
					
					this.setState({
						alertText: 'There was an error connecting to the database: ' + mark_received_request.statusText,
						alertVisibility: true,
					});
				}
			}.bind(this);

			mark_received_request.send();	

		}
	}


    /* Table callback: tracks which rows in the table are checked in
     * this.state.checkedRowsShipment. When it updates it also resets the checks
     * using this.state.resetChecksSamples.
     */
	getCheckedStateFromShipmentTable = (checkedRows) => {
		this.setState({ 
			checkedRowsShipment: checkedRows,
			resetChecksShipment: false,
		});
	}
	
}

export default ViewShipments;
