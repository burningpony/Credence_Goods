import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Map as iMap } from 'immutable';
import { Button } from '@bootstrap-styled/v4';
import { user as userSelector } from './selectors/user_selectors';
import { configureUser } from './actions/user_actions';

const StyledForm = styled.form`
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border-radius: 3px;
  `;

const FormLabel = styled.label`
    display: block;
    padding: 5px;
    width: 200px;
  `;

const FormInput = styled.input`
    display: block;
    padding: 5px;
    width: 200px;
  `;

const Errors = styled.div`
  color: red;
`;

class GroupSelect extends Component {
  static propTypes = {
    configureUser: PropTypes.func.isRequired,
    user: PropTypes.instanceOf(iMap),
  }

  static defaultProps = {
    user: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
    };

    this.handleSubmit = this.onSubmit.bind(this);
    this.handleChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ groupName: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const { configureUser } = this.props;
    const { groupName } = this.state;
    configureUser(groupName);
  }

  errors() {
    const { user } = this.props;
    return user && user.get('errors');
  }

  renderErrors() {
    return (
      <Errors>
        {this.errors().toJS().map((error, index) => (
          <p key={index}>
            {error}
          </p>
        ))}
      </Errors>
    );
  }

  render() {
    const { groupName } = this.state;

    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <FormLabel>
            Group Name:
          <FormInput
            key="groupInput"
            type="text"
            name="group"
            value={groupName}
            onChange={this.handleChange}
          />
        </FormLabel>
        {this.errors() && this.renderErrors() }
        <Button color="success">Continue</Button>
      </StyledForm>
    );
  }
}

const mapStateToProps = state => ({
  user: userSelector(state),
});

const mapDispatchToProps = dispatch => ({
  configureUser: groupName => dispatch(configureUser(groupName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupSelect);
