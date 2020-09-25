import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Button, Grid, Container, Box,
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
  }

  handleInputChange = (e) => {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.id]: e.target.value,
      },
    });
  }

  handleSignInUpToggle = () => {
    this.setState((prevState) => ({
      signUpDisplay: !prevState.signUpDisplay,
    }));
  }

  handleSubbmit = (e) => {
    const { signUpFn, signInFn } = this.props;
    e.preventDefault();
    if (this.state.signUpDisplay) signUpFn(this.state.user);
    else signInFn(this.state.user);
    this.setState({
      user: {
        email: '',
        password: '',
        name: '',
      },
    });
  }

  render() {
    const { user: { email, password, name }, signUpDisplay } = this.state;
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

export default connect(null, mapDispatchToProps)(SignUp);
