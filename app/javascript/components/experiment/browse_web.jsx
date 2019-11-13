import React, { Component } from 'react';
import {
 Button, Col, Row, Alert 
} from '@bootstrap-styled/v4';

// hmmmmm
const Browser = () => (
  <iframe
    title="browser"
    url="http://www.google.com"
    height="100%"
    width="100%"
  />
);

class BrowseWeb extends Component {
  constructor(props) {
    super(props);
    this.state = { browsing: false };
    this.toggleBrowsing = this.toggleBrowsing.bind(this);
  }

  toggleBrowsing() {
    const win = window.open('https://www.google.com', '_blank');
    win.focus();
    this.setState({ browsing: true });
  }

  renderContent() {
    const { children } = this.props;
    return children;
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggleBrowsing} color="success">
          Browse Web
        </Button>
        <div>{this.renderContent()}</div>
      </div>
    );
  }
}

export default BrowseWeb;
