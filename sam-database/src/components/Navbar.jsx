import React, { Component } from 'react';
import './Navbar.css';
import { Navbar } from 'react-bootstrap';

class Navbar extends Component {
	render() {
		return (
			<Navbar>
				<Nav pullRight>
					<Nav.Link href="/help">Help</Nav.Link>
					<Nav.Link href="/login">Log in</Nav.Link>
				</Nav>
			</Navbar>
		)
	}
}

export default Navbar;
