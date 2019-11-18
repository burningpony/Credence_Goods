import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Col, Row, Input } from "@bootstrap-styled/v4";
import Label from "../styles/blocks/graph/label";
import { calculateSamplePoint, calculateBounds } from "../helpers/function";

class SamplePointsInput extends Component {
  static propTypes() {
    return {
      id: PropTypes.function.isRequired, // function_id
      func: PropTypes.function.isRequired,
      costOfPoint: PropTypes.number.isRequired,
      min: PropTypes.number.isRequired,
      max: PropTypes.number.isRequired,
      callback: PropTypes.function.isRequired
    };
  }

  state = {
    totalCost: 0,
    points: [],
    numSamplePoints: 0
  };

  setNumSamplePoints = e => {
    const newNumSamplePoints = parseFloat(e.target.value);
    this.setState(
      {
        numSamplePoints: newNumSamplePoints
      },
      () => {
        if (newNumSamplePoints > this.props.minValue) {
          this.setState({
            totalCost: this.props.costOfPoint * newNumSamplePoints || 0
          });
          this.props.updateFunctionResponse(this.props.id, newNumSamplePoints);
        }
      }
    );
  };

  generatePoints = () => {
    const { func, min, max } = this.props;
    const { numSamplePoints } = this.state;
    const localPoints = [];

    let collisions = 0;

    for (let i = 0; i < numSamplePoints + collisions; i++) {
      const [localMin, localMax] = calculateBounds(i + 1, { min, max });
      const [x, y] = calculateSamplePoint(func, localMin, localMax);
      const MAX_COLLISIONS = 50;

      const hasCollison = !!localPoints.find(point => {
        const COLLISION_THRESHOLD = (max - min) / MAX_COLLISIONS;

        const isNearbyX =
          x + COLLISION_THRESHOLD > point.x &&
          x - COLLISION_THRESHOLD < point.x;
        const isNearbyY =
          y + COLLISION_THRESHOLD > point.y &&
          y - COLLISION_THRESHOLD < point.y;
        return isNearbyX && isNearbyY;
      });

      if (hasCollison) {
        if (collisions < MAX_COLLISIONS) {
          collisions += 1;
        }
      } else {
        localPoints.push({ x, y });
      }
    }
    return localPoints;
  };

  handleClick = e => {
    const { callback, minValue } = this.props;
    const { numSamplePoints } = this.state;

    if (numSamplePoints < minValue) {
      this.setState({ numSamplePoints: minValue });
    } else {
      this.setState(
        {
          points: this.generatePoints()
        },
        () => callback(this.state)
      );
    }
  };

  renderTotalCost() {
    const { totalCost } = this.state;
    return totalCost && Math.round(totalCost * 100) / 100;
  }

  render() {
    const { numSamplePoints } = this.state;
    const { minValue } = this.props;
    return (
      <Row>
        <Col sm="12">
          <Label>Sample Points:</Label>
          <Input
            min={minValue}
            onChange={this.setNumSamplePoints}
            disabled={this.props.disabled}
            type="number"
            value={numSamplePoints}
            name="points"
          />
        </Col>
        <Col sm="12">
          <Button name="points" size="sm" onClick={this.handleClick}>
            Submit
          </Button>
          Cost: &nbsp;
          {this.renderTotalCost()}
          &nbsp;
        </Col>
      </Row>
    );
  }
}

export default SamplePointsInput;
