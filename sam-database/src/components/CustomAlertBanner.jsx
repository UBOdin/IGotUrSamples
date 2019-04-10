import React, { Component } from 'react';
import { Alert } from 'react-bootstrap'; 

class CustomAlertBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  render() {
    const handleDismiss = () => this.setState({ show: false });
    const handleShow = () => this.setState({ show: true });
    if (this.state.show) {
      return (
        <Alert variant={this.props.variant} onClose={handleDismiss} dismissible>
          <Alert.Heading>{this.props.text}</Alert.Heading>
        </Alert>
      );
    }
    return <Button onClick={handleShow}>Show Alert</Button>;
  }
}

render(<AlertDismissibleExample />);

