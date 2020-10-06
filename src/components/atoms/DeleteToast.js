import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { deleteIdea } from 'actions/ideaActions';

const DeleteToast = ({ id, deleteIdeaFn }) => (
  <Box p={2} display="flex" flexDirection="column">
    <Typography align="center">Sure you want to delete it?</Typography>
    <Box m={2} display="flex" flexDirection="row" justifyContent="space-between">
      <Button variant="outlined" onClick={() => deleteIdeaFn(id)}>yes</Button>
      <Button variant="outlined">no</Button>
    </Box>
  </Box>
);

const mapDispatchToProps = (dispatch) => ({
  deleteIdeaFn: (id) => dispatch(deleteIdea(id)),
});

DeleteToast.propTypes = {
  deleteIdeaFn: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(DeleteToast);
