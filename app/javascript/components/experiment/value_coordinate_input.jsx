import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
 Button, Col, Row, Input 
} from '@bootstrap-styled/v4';
import Label from '../styles/blocks/graph/label';

const rowStyle = { marginBottom: '10px' };

class ValueCoordinateInput extends Component {
  static propTypes() {
    return {
      id: PropTypes.function.isRequired, // function_id
      functionString: PropTypes.string.isRequired,
      costOfCoordinate: PropTypes.number.isRequired,
      callback: PropTypes.func.isRequired,
    };
  }

  state = {
    totalCost: 0,
    numValueCoordinates: 0,
    minValue: 0,
  };

  /**
   * @description
   * @param {ReactSyntheticEvent} e
   * @returns
   * @memberof ValueCoordinate
   */
  setValueCoordinates = (e) => {
    const newNumValueCoordinates = parseFloat(e.target.value);

    this.setState(
      {
        numValueCoordinates: newNumValueCoordinates,
      },
      () => {
        if (newNumValueCoordinates > this.state.minValue) {
          this.setState({
            totalCost: this.props.costOfCoordinate * newNumValueCoordinates || 0,
          });
          this.props.updateFunctionResponse(
            this.props.id,
            newNumValueCoordinates,
          );
        }
      },
    );
  };

  generateCoordinates = () => {
    const { numValueCoordinates } = this.state;
    const localCoordinates = [];

    for (let i = 0; i < numValueCoordinates; i++) {
      localCoordinates.push(i * Math.random());
    }

    return localCoordinates;
  };

  onClick = (e) => {
    const { callback } = this.props;
    const { numValueCoordinates, minValue } = this.state;
    if (numValueCoordinates < minValue) {
      this.setState({ numValueCoordinates: minValue });
    } else {
      this.setState(
        {
          minValue: numValueCoordinates,
        },
        () => callback(this.state),
      );
    }
  };

  render() {
    const { totalCost, minValue, numValueCoordinates } = this.state;
    return (
      <Row style={rowStyle}>
        <Col sm="12">
          <Label>Value Coordinates:</Label>
          <Input
            min={minValue}
            onChange={this.setValueCoordinates}
            disabled={this.props.disabled}
            type="number"
            value={numValueCoordinates}
          />
        </Col>
        <Col sm="12">
          <Button onClick={this.onClick}>SUBMIT</Button>
          Cost: &nbsp;
          {totalCost && Math.round(totalCost * 100) / 100}
        </Col>
      </Row>
    );
  }
}

export default ValueCoordinateInput;
