import React, { Component } from 'react';
import { Table, Form } from 'react-bootstrap';
import Row from './Row';

class CustomTable extends Component {
    render() {
        const headerCols = [];
        const rows = [];

        for (var i = 0; i < this.props.numCols; i++) {
            headerCols.push(<th key={i} number={i}>{this.props.cols[i]}</th>);
        }

        for (var j = 0; j < this.props.numRows;j++) {
            rows.push(<Row numCols={this.props.numCols} key={j} number={j}/>);
        }

        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th width="3%">
                            <Form.Check id="selectall" />
                        </th>
                        { headerCols }
                    </tr>
                </thead>
                <tbody>
                { rows }
                </tbody>
            </Table>
        )
    };
}

export default CustomTable;
