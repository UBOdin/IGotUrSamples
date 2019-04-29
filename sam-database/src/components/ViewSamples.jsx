import React, { Component } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';
import CustomTable from './CustomTable';
import Filter from './Filter';
import DatePicker from 'react-datepicker';

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
			filters: [<Filter key={1} number={1} parent={this}/>],
			returnedFilterValues: [],
 			DEBUGsampleisarray: false,
 		}
		this.addFilter = this.addFilter.bind(this);
		this.exportToCSV = this.exportToCSV.bind(this);
		this.processFilter = this.processFilter.bind(this);
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
		var newFilterArray = this.state.filters.concat(<Filter key={this.state.filters.length + 1} number={this.state.filters.length + 1} />);
		this.setState({ filters: newFilterArray });
	};

	exportToCSV() {
		var element = document.createElement('a');

		var data = 'ID, Eval, Date, Aliquots, Notes\n';

		for (var i = 0; i < this.state.samples.length; i++) {
			for (var j = 0; j < this.state.samples[i].length; j++) {
				data = data + this.state.samples[i][j] + ', ';
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

	processFilter() {
		//TODO: finish this!
		//create filtered array
		var filtered = [];

		//get current processing criterion
		for (var i = 0; i < this.state.filters.length; i++) {
			
			var filterValues = this.state.returnedFilterValues;
			var filterType = filterValues[0];
			var typeNum = 0;
		    var filterEquality = true;


		for (var j = 0; j < this.state.headers; j++) {
				if (filterValues[0] === this.state.headers[j]) {
					typeNum = j;
					break;
				}
			}

			//figure out equality
			if (!filterValues[1]) {
				filterEquality = false;
			}

			//add all matches (or non-matches) to filtered array
			for (var j = 0; j < this.state.samples.length; j++) {
				if (filterEquality) {
					if (this.state.samples[j][typeNum] === filterValues[2]) {
						filtered.push(this.state.samples[j]);
					}
				} else {
					if (this.state.samples[j][typeNum] !== filterValues[2]) {
						filtered.push(this.state.samples[j]);
					}
				}
			}		

			//filtered array becomes samples array
			this.setState({ samples: filtered });
			//???repeat for other criteria
		}
	}



}


export default ViewSamples;
