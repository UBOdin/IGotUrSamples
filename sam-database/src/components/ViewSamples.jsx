import React, { Component } from 'react';
import { Button, ButtonGroup, Row, Col } from 'react-bootstrap';
import Search from './Search';
import CustomTable from './CustomTable';
import jQuery from 'jquery';

class ViewSamples extends Component {
	state = {
        	//8 is arbitrary here, just to tell the difference between nothing back from db vs. initial state
        	numRows: 8,
		samples: [],
		connection: [],
    	}

	componentDidMount() {
		jQuery.ajax({
			type: "POST",
			url: 'https://cse.buffalo.edu/eehuruguaydatabase/scripts/connect_experimental.php',
			data: { arguments: ['tethys.cse.buffalo.edu', 'blakecoo', 'ChangeMe', 'eehuruguayresearch_db', '3306'], table: ['Samples']},
			dataType: 'json',
			success: function (obj, textstatus) {
					this.setState({ samples: obj.result });
					console.log(this.state.connection);
				}.bind(this),
			error: function(obj, textStatus) {
					console.log(textStatus);
				}.bind(this)
			});


		this.setState({ numRows: this.state.samples.length });
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
