import React, { Component } from 'react';
import { connect } from 'react-redux';

import Menu from './components/Menu/Menu';
import { AUTHENTICATION } from './actions';
import { Routes } from './Routes';

class SemanticApp extends Component {
  componentDidMount() {
    localStorage.getItem('accessToken') && this.props.fetchCurrentUser();
  }

  render() {
    return (
      <div>
        <Menu />
        <Routes />
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchCurrentUser: AUTHENTICATION.fetchCurrentUser,
};

export default connect(
  null,
  mapDispatchToProps
)(SemanticApp);
