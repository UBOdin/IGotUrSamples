import React, { Component } from 'react';
import { Button, Row, Col, } from 'react-bootstrap';
import CustomTable from './CustomTable';
import Filter from './Filter';

class ViewSamples extends Component {
	constructor(props) {
		super(props);
		this.state = {
        	//8 is arbitrary here, just to tell the difference between nothing back from db vs. initial state
        	numRows: 8,
			connectMsg: '',
			samples: [],
			connectionstatus: -1,
			headers: ['ID','Eval','Date','HB','PB','Density','Type','Aliquots','Initial storage conditions','Additives','Other treatments','Foil wrapped','Unrestricted consent'],
			filters: [<Filter key={1} number={1} retVals={this.getFilterValues}/>],
			returnedFilterValues: [],
 			DEBUGsampleisarray: false,
 		}
		this.addFilter = this.addFilter.bind(this);
		this.exportToCSV = this.exportToCSV.bind(this);
		this.processFilter = this.processFilter.bind(this);
	}

	getFilterValues = (type, equality, value, key) => {
		var filterVals = this.state.returnedFilterValues;
		filterVals[key] = [type,equality,value];

		this.setState({ returnedFilterValues: filterVals});
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
					samples: JSON.parse(request.responseText),
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
				<Button variant="dark" size="lg" onClick={this.processFilter}>Filter</Button>
                <Button variant="dark" size="lg" onClick={this.exportToCSV}>Export</Button>
				<hr />
				<Row>
                    <Col align="right">
                        {this.state.samples.length} samples 
                    </Col>
                </Row>
                <CustomTable numCols={5} numRows={this.state.samples.length} cols={['ID','Eval','Date','Aliquots','Notes']} toPopulateWith={this.state.samples}/>
            </div>
    	)
	};

	addFilter() {
		var newFilterArray = this.state.filters.concat(<Filter key={this.state.filters.length + 1} number={this.state.filters.length + 1} retVals={this.getFilterValues}/>);
		this.setState({ filters: newFilterArray });
	};

	exportToCSV() {
		var element = document.createElement('a');

		var data = 'ID,Eval,Date,HB,PB,Density,Type,Aliquots,Initial storage conditions,Additives,Other treatments,Foil wrapped,Unrestricted consent,Notes\n';

		for (var i = 0; i < this.state.samples.length; i++) {

			for (var key in this.state.samples[i]) {
				if (this.state.samples[i].hasOwnProperty(key)) {
					if (key !== "key_internal") {
						data = data + this.state.samples[i][key] + ', ';
					}
				}
			}
			
//			for (var j = 0; j < this.state.samples[i].length; j++) {
//				data = data + this.state.samples[i][this.state.headers.toLowerCase()] + ', ';
//			}
			data = data + '\n';
		}

		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
		element.setAttribute('download', 'export.csv');

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}

	processFilter() {
		//TODO: finish this!
		//create filtered array
		var filtered = [];
		
		var getQuery = '';
		//for each filter in the array, find the corresponding keyi
		for (var i = 0; i < this.state.filters.length; i++) {

			if (i !== 0) {
				getQuery = getQuery + '&';
			}

			//if type's not null (should never be!)
			//if value's not null
			if (this.state.returnedFilterValues[i][0] !== '' &&
				this.state.returnedFilterValues[i][2] !== '') {

				getQuery = getQuery 
					+ 't' + i + '=' + this.state.returnedFilterValues[i][0]
					+ 'e' + i + '=' + this.state.returnedFilterValues[i][1]
					+ 'v' + i + '=' + this.state.returnedFilterValues[i][2];
			}
		}
				//make SQL query and retrieve all samples that match (or don't match?) filter

		var filterReq;

		filterReq = new XMLHttpRequest();
		filterReq.open(
			"GET",
			"https://cse.buffalo.edu/eehuruguayresearch/scripts/retrieve.php?" + getQuery,
			true
		);
		request.onload = function (e) {
			if (request.readyState === 4 && request.status === 200) {
				console.log("All clear");
				this.setState({ 
					samples: JSON.parse(request.responseText),
					numRows: this.state.samples.length,
					connectionstatus: request.status, 
				});
			} else {
				console.error(request.statusText);
				this.setState({
					connectMsg: request.responseText,
					connectionstatus: request.status,
				});
			}
		}.bind(this);

		request.send();	
		}

		
	}
}


export default ViewSamples;
