import React, { Component } from 'react';
import {
  FormControl, Grid, Container, Box,
} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { addIdea } from 'actions/ideaActions';

class NewIdea extends Component {
  state = {
    title: '',
    content: '',
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  handleSubbmit = (e) => {
    const { addIdeaFn, history: { goBack } } = this.props;
    e.preventDefault();
    addIdeaFn(this.state);
    goBack();
  }

  render() {
    const { title, content } = this.state;
    return (
      <Container maxWidth="xl">
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ minHeight: '60vh' }}
        >
          <Grid item xs={12} md={6}>
            <form noValidate autoComplete="off">
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="title">title</InputLabel>
                <OutlinedInput id="title" type="text" onChange={this.handleInputChange} value={title} label="title" />
              </FormControl>
              <Box my={2}>
                <TextField
                  fullWidth
                  id="content"
                  label="Your Idea"
                  multiline
                  rows={4}
                  value={content}
                  onChange={this.handleInputChange}
                  variant="outlined"
                />
              </Box>
              <Button fullWidth variant="contained" color="primary" type="subbit" onClick={this.handleSubbmit}>
                Add Idea
              </Button>
            </form>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addIdeaFn: (idea) => dispatch(addIdea(idea)),
});

export default connect(null, mapDispatchToProps)(NewIdea);
