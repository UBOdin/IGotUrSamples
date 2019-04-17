import React, { Component } from 'react';
import { Button, ButtonGroup, Row, Col } from 'react-bootstrap';
import Search from './Search';
import CustomTable from './CustomTable';
import jQuery from 'jquery';

class ViewSamples extends Component {
	state = {
        	//8 is arbitrary here, just to tell the difference between nothing back from db vs. initial state
        	numRows: 8,
		samples: '',
		connectionstatus: -1,
    	}

	componentDidMount() {
		var request;
		var data;

		request = new XMLHttpRequest();
		request.open(
			"GET",
			"https://cse.buffalo.edu/eehuruguayresearch/scripts/connect.php?host=tethys.cse.buffalo.edu:3306&user=blakecoo&password=ChangeMe&db_name=eehuruguayresearch_db",
			true
		);
		request.onload = function (e) {
			if (request.readyState === 4 && request.status === 200) {
				console.log("All clear");
				this.setState({ 
					samples: request.responseText,
					numRows: this.state.samples.length,
					connectionstatus: request.status, 
				});
			} else {
				console.error(request.statusText);
				this.setState({
					samples: request.responseText,
					connectionstatus: request.status,
				});
			}
		}.bind(this);

		request.send();	
		
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
                        			{this.state.numRows} samples CONNECTION: {this.state.connectionstatus} MESSAGE: {this.state.samples}
                    			</Col>
                		</Row>
				<hr />
                		<CustomTable numCols={5} numRows={this.state.numRows} cols={['ID','Eval','Date','Aliquots','Notes']} />
            		</div>
        	)
	};
}

export default ViewSamples;
