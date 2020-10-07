import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Button, Grid, Container, Box, Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { signUpAction, signInAction } from 'actions/authActions';
import Logo from 'components/atoms/Logo';
import InputItem from 'components/atoms/InputItem';

const StyledGrid = withStyles({
  root: {
    maxWidth: '600px',
  },
})(Grid);

const StyledTypo = withStyles({
  root: {
    textAlign: 'center',
    color: 'red',
    marginBottom: '15px',
  },
})(Typography);

const StyledLogo = styled(Logo)`
  margin-left: 10px;
`;

class SignUp extends Component {
  state = {
    user: {
      email: '',
      password: '',
      name: '',
    },
    signUpDisplay: false,
    areFieldsFilled: false,
  }

  handleInputChange = (e) => {
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [e.target.id]: e.target.value,
      },
    });
  }

  handleSignInUpToggle = () => {
    this.setState((prevState) => ({
      signUpDisplay: !prevState.signUpDisplay,
    }));
  }

  clearForm = () => {
    this.setState({
      user: {
        email: '',
        password: '',
        name: '',
      },
      areFieldsFilled: false,
    });
  }

  handleSubbmit = (e) => {
    const { signUpFn, signInFn } = this.props;
    const { signUpDisplay, user } = this.state;
    e.preventDefault();
    if (signUpDisplay) {
      if (user.password && user.email && user.name) {
        signUpFn(user);
        this.clearForm();
      } else {
        this.setState({
          areFieldsFilled: true,
        });
      }
    } else if (user.password && user.email) {
      signInFn(user);
      this.clearForm();
    } else {
      this.setState({
        areFieldsFilled: true,
      });
    }
  }

  render() {
    const { user: { email, password, name }, signUpDisplay, areFieldsFilled } = this.state;
    return (
      <Container maxWidth="xl">
        <Grid
          container
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
          <StyledGrid item xs={12} md={6}>
            <StyledLogo />
            <Box px={{ xs: 4, sm: 8 }} py={6} bgcolor="success.main" borderRadius={6} boxShadow={3}>

              <form noValidate autoComplete="off">
                {signUpDisplay ? (
                  <InputItem
                    light
                    fullWidth
                    variant="outlined"
                    htmlFor="name"
                    id="name"
                    type="text"
                    onChange={this.handleInputChange}
                    value={name}
                    label="name"
                  >
                    name
                  </InputItem>
                ) : null}
                <Box my={2}>
                  <InputItem
                    light
                    fullWidth
                    variant="outlined"
                    htmlFor="email"
                    id="email"
                    type="email"
                    onChange={this.handleInputChange}
                    value={email}
                    label="e-mail"
                  >
                    e-mail
                  </InputItem>
                </Box>
                <InputItem
                  light
                  fullWidth
                  variant="outlined"
                  htmlFor="password"
                  id="password"
                  type="password"
                  onChange={this.handleInputChange}
                  value={password}
                  label="password"
                >
                  password
                </InputItem>
                <Box my={2}>
                  {areFieldsFilled && <StyledTypo variant="body2">fill in all fields!</StyledTypo>}
                  <Button fullWidth variant="contained" color="primary" type="subbit" onClick={this.handleSubbmit}>
                    {signUpDisplay ? 'sign up' : 'sign in'}
                  </Button>
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={this.handleSignInUpToggle}
                >
                  {signUpDisplay ? 'sign in to existing account' : 'sign up for a new account'}
                </Button>
              </form>
            </Box>
          </StyledGrid>
        </Grid>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signUpFn: (signupdata) => dispatch(signUpAction(signupdata)),
  signInFn: (signindata) => dispatch(signInAction(signindata)),
});

SignUp.propTypes = {
  signUpFn: PropTypes.func.isRequired,
  signInFn: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SignUp);
