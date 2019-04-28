import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import CustomTable from './CustomTable';
import Filter from './Filter';

class ViewSamples extends Component {
	constructor(props) {
		super(props);
		this.state = {
        	//8 is arbitrary here, just to tell the difference between nothing back from db vs. initial state
        	numRows: 8,
			connectMsg: '',
			samples: [
				["875", "1", "4/28/19", "3", "first sample!"],
				["875", "2", "4/28/19", "3", ""],
				["877", "1", "4/28/19", "7", ""],
				["880", "1", "4/28/19", "6", ""],
				["881", "1", "4/28/19", "4", ""]
			],
			connectionstatus: -1,
			filters: [(<Filter key={1} number={1} />)],
    	}
		this.addFilter = this.addFilter.bind(this);
		this.exportToCSV = this.exportToCSV.bind(this);
	}

	componentDidMount() {
		var request;

		request = new XMLHttpRequest();
		request.open(
			"GET",
			"https://cse.buffalo.edu/eehuruguayresearch/scripts/retrieve_all.php",
			true
		);
		request.onload = function (e) {
			if (request.readyState === 4 && request.status === 200) {
				console.log("All clear");
				this.setState({ 
					connectMsg: request.responseText,
					numRows: this.state.samples.length,
					connectionstatus: request.status, 
				});
			} else {
				console.error(request.statusText);
				this.setState({
					connectMsg: request.responseText,
					numRows: this.state.samples.length,
					connectionstatus: request.status,
				});
			}
		}.bind(this);

		request.send();	
		
	}

	render() {
		return (
            <div>
            	<h3>Filter and export</h3>
                {this.state.filters}
				<Button variant="dark" size="lg" onClick={this.addFilter}>Add another filter</Button>
				<Button variant="dark" size="lg">Filter</Button>
                <Button variant="dark" size="lg" onClick={this.exportToCVS}>Export</Button>
				<hr />
				<Row>
                    <Col align="right">
                        {this.state.numRows} samples CONNECTION: {this.state.connectionstatus} MESSAGE: {this.state.connectMsg}
                    </Col>
                </Row>
                <CustomTable numCols={5} numRows={this.state.samples.length} cols={['ID','Eval','Date','Aliquots','Notes']} toPopulateWith={this.state.samples}/>
            </div>
    	)
	};

	addFilter() {
		var newFilterArray = this.state.filters.concat(<Filter key={this.state.filters.length + 1} number={this.state.filters.length + 1} />);
		this.setState({ filters: newFilterArray });
	};

	exportToCSV() {
		var element = document.createElement('a');

		var data = 'ID, Eval, Date, Aliquots, Notes\n';

		for (var item in this.state.samples) {
			for (var i = 0; i < item.length; i++) {
				data = data + item[i] + ', ';
			}
			data = data + '\n';
		}

		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
		element.setAttribute('download', 'export.csv');

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}
}

export default ViewSamples;
