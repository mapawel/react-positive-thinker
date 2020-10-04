/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const UserIsLoggedIn = ({ user, children }) => (
  user ? children : <Redirect to="/" />
);

UserIsLoggedIn.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.object,
};

UserIsLoggedIn.defaultProps = {
  user: null,
};

export default UserIsLoggedIn;
