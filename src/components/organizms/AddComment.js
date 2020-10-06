import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import {
  TextField, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { addComment } from 'actions/ideaActions';
import { Formik } from 'formik';
import { schemaAddComment } from 'validators/validatorSchema';

const AddComment = ({
  id, handleClickClose, content, addCommentFn,
}) => (

  <Formik
    initialValues={{ comment: '' }}
    validationSchema={schemaAddComment}
    onSubmit={
        (values, { setSubmitting }) => {
          addCommentFn(id, values.comment);
          setTimeout(() => {
            setSubmitting(false);
            handleClickClose();
          }, 200);
        }
      }
  >
    {({
      values,
      handleChange,
      handleSubmit,
      isSubmitting,
      errors,
    }) => {
      let isError = false;
      if (errors.comment) isError = true;
      const handleEnter = (e) => {
        if (e.key === 'Enter') handleSubmit();
      };
      return (

        <Dialog
          fullWidth
          maxWidth="sm"
          open
          onClose={handleClickClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id={`dialog${id}`}>
            My comment
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`to:
             "${content}"`}
            </DialogContentText>
            <TextField
              error={isError}
              autoFocus
              margin="dense"
              id="comment"
              value={values.comment}
              onChange={handleChange}
              onKeyUp={(e) => handleEnter(e)}
              label="short comment"
              type="text"
              fullWidth
              required
              multiline
              rows={4}
            />
            {errors.comment && <Typography variant="caption">{errors.comment}</Typography>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              color="primary"
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>

      );
    }}
  </Formik>
);

const mapDispatchToProps = (dispatch) => ({
  addCommentFn: (id, comment) => dispatch(addComment(id, comment)),
});

AddComment.propTypes = {
  id: PropTypes.string.isRequired,
  handleClickClose: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  addCommentFn: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(AddComment);
