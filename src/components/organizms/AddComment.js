import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, getFirebase } from 'react-redux-firebase';
import { routes } from 'routes';

const AddComment = ({ id, handleClickClose, content }) => (
  <Dialog open onClose={handleClickClose} aria-labelledby="form-dialog-title">
    <DialogTitle id={`dialog${id}`}>
      My comment
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        {`to:
        "${content}"`}
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="comment"
        label="short comment"
        type="text"
        fullWidth
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClickClose} color="primary">
        Cancel
      </Button>
      <Button onClick={handleClickClose} color="primary">
        Add
      </Button>
    </DialogActions>
  </Dialog>
);

export default AddComment;
