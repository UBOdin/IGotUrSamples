import React, { Component } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker'

class Filter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: 'ID',
			equality: true,
			value: '',
			date: new Date(),
		}
		this.handleTypeChange = this.handleTypeChange.bind(this);
		this.handleEquality = this.handleEquality.bind(this);
		this.handleValueChange = this.handleValueChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
	}

	handleTypeChange(e) {
		this.setState({
			type: e.target.value,
			value: '',
		});
		console.log("type changed to: " + e.target.value);
		this.props.retVals(e.target.value, this.state.equality, this.state.value, this.props.number);

	}

	handleEquality(e) {
		var equalityVal;
		if (e.target.value === 'equals' ||
			e.target.value === 'include' ) {
			equalityVal = true;
		} else if (e.target.value === 'does not equal' ||
			e.target.value === 'do not include') {
			equalityVal = false;
		}

		this.setState ({ equality: equalityVal });
		this.props.retVals(this.state.type, equalityVal, this.state.value, this.props.number);
	}

	handleValueChange(e) {
		this.setState({value: e.target.value});
		this.props.retVals(this.state.type, this.state.equality, e.target.value, this.props.number);
	}

	handleDateChange(date) {
		this.setState({
			date: date,
		});
		this.props.retVals(this.state.type, this.state.equality, date, this.props.number);
	}

	render() {

		const equalityInput = () => {
			if (this.state.type === 'Additives') {
				return (
					<Form.Group controlId="isOrIsnt">
						<Form.Control 
							as="select"
							onChange={this.handleEquality}>
								<option>include</option>
								<option>do not include</option>
						</Form.Control>
					</Form.Group>
				)
			} else {
				return (
					<Form.Group controlId="isOrIsnt">
						<Form.Control as="select"
							onChange={this.handleEquality}>
							<option>equals</option>
							<option>does not equal</option>
						</Form.Control>
					</Form.Group>
				)
			}
		}
					
		const input = () => {
			if (this.state.type === 'Date') {
				return (
					<DatePicker
						className="form-control"
						fixedHeight={false}
						selected={this.state.date}
						onChange={this.handleDateChange}
					/>
				)
			} else if (this.state.type === 'Type') {
				return (
					<Form.Group controlId="value">
						<Form.Control as="select"
							value={this.state.value}
						onChange={this.handleValueChange}>
							<option>Blood</option>
							<option>Blood Spot</option>
                       		<option>Dust</option> 
							<option>Hair</option>
                    		<option>Plasma</option>
                    		<option>Serum</option>
                   			<option>Soil</option>
                   			<option>Urine</option>
                   			<option>Water</option>
						</Form.Control>
					</Form.Group>
				)
			} else if (this.state.type === 'Initial storage conditions') {
				return (
					<Form.Group controlId="value">
						<Form.Control as="select"
						onChange={this.handleValueChange}>
                       		<option>Room temperature</option>
                       		<option>4° C</option>
                       		<option>-20° C</option>
                  			<option>-80° C</option>
						</Form.Control>
					</Form.Group>
				)
			} else if (this.state.type === 'Additives') {
				return (
					<Form.Group controlId="value">
						<Form.Control as="select"
						onChange={this.handleValueChange}>
                       		<option>BHT</option>
                       		<option>EDTA</option>
                       		<option>Heparin</option>
                  			<option>MPA</option>
						</Form.Control>
					</Form.Group>
				)
			} else if (this.state.type === 'Foil Wrapped' || this.state.type === 'Unrestricted consent') {
				return (
					<Form.Group controlId="value">
						<Form.Control as="select"
						onChange={this.handleValueChange}>
                       		<option>True</option>
                       		<option>False</option>
						</Form.Control>
					</Form.Group>
				)
			} else {
				return (
					<Form.Group controlId="value"
						onChange={this.handleValueChange}>
						<Form.Control></Form.Control>
					</Form.Group>
				)
			}
		}
						
		return (

			<div>
				<Row>
					<Col md="auto">
						<Form.Group controlId="type">
							<Form.Control as="select"
								value={this.state.type}
								onChange={this.handleTypeChange}>
								<option>ID</option>
								<option>Eval</option>
								<option>Date</option>
								<option>HB</option>
								<option>PB</option>
								<option>Density</option>
								<option>Type</option>
								<option>Aliquots</option>
								<option>Initial storage conditions</option>
								<option>Additives</option>
								<option>Other treatments</option>
								<option>Foil wrapped</option>
								<option>Unrestricted consent</option>
							</Form.Control>
						</Form.Group>
					</Col>
					<Col md="auto">
					{ equalityInput() }
					</Col>
					<Col>
					{ input() }
					</Col>
				</Row>
			</div>

		)
	};

}


export default Filter;
