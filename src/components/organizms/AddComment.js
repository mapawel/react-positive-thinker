import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { addComment } from 'actions/ideaActions';

const AddComment = ({ id, handleClickClose, content, addCommentFn }) => {
  const [comment, setComment] = useState('')

  const handleCommentChange = (e) => {
    setComment(e.target.value)
  }

  return(
  <Dialog fullWidth maxWidth="sm"
   open onClose={handleClickClose} aria-labelledby="form-dialog-title">
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
        value={comment}
        onChange={handleCommentChange}
        label="short comment"
        type="text"
        fullWidth
        required
        multiline
        rows={4}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClickClose} color="primary">
        Cancel
      </Button>
      <Button onClick={() => {addCommentFn(id, comment); handleClickClose()}} color="primary">
        Add
      </Button>
    </DialogActions>
  </Dialog>
);
  };

const mapDispatchToProps = (dispatch) => ({
  addCommentFn: (id, comment) => dispatch(addComment(id, comment))
})

export default connect(null, mapDispatchToProps)(AddComment);
