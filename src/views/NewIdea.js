/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Container, Box, Typography, Button, TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { addIdea } from 'actions/ideaActions';
import { Formik } from 'formik';
import { schemaAddPost } from 'validators/validatorSchema';
import Nav from 'components/organizms/Nav';

const useStyles = makeStyles({
  labelButton: {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  headTxt: {
    marginBottom: '20px',
  },
  uploadBtnBox: {
    alignSelf: 'flex-end',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const NewIdea = ({ addIdeaFn, history: { goBack } }) => {
  const [image, setImage] = useState('');
  const classes = useStyles();

  const handleAddImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <Nav>
      <Container maxWidth="xl">
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ minHeight: '60vh' }}
        >
          <Grid item xs={12} md={6}>
            <Box mb={2}>
              <label className={classes.labelButton} htmlFor="image">
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="image"
                  multiple
                  type="file"
                  onChange={handleAddImageChange}
                />
                <Typography className={classes.headTxt} variant="subtitle1" color="textSecondary">
                  Upload a nice image and comment it or just
                  write something motivating!
                </Typography>
                <Box className={classes.uploadBtnBox}>
                  <Typography variant="caption" color="textSecondary">{image ? image.name : ' '}</Typography>
                  <Button variant="contained" color={image ? 'secondary' : 'primary'} component="span">
                    Upload
                  </Button>
                </Box>
              </label>
            </Box>
            <Formik
              initialValues={{ content: '' }}
              validationSchema={schemaAddPost}
              onSubmit={
                (values, { setSubmitting }) => {
                  addIdeaFn({ ...values, image });
                  setTimeout(() => {
                    setSubmitting(false);
                    goBack();
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
                if (errors.content) isError = true;
                const handleEnter = (e) => {
                  e.key === 'Enter' && handleSubmit();
                };

                return (
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    noValidate
                    autoComplete="off"
                  >
                    <Box mb={2}>
                      <TextField
                        error={isError}
                        required
                        fullWidth
                        id="content"
                        label="Your Idea"
                        multiline
                        rows={4}
                        value={values.content}
                        onChange={handleChange}
                        onKeyUp={(e) => handleEnter(e)}
                        variant="outlined"
                      />
                      {errors.content && <Typography variant="caption">{errors.content}</Typography>}
                    </Box>

                    <Button
                      fullWidth
                      variant="contained"
                      color={(image || !errors.content) ? 'primary' : 'secondary'}
                      type="subbmit"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    >
                      Add Idea
                    </Button>
                  </form>
                );
              }}
            </Formik>

          </Grid>
        </Grid>
      </Container>
    </Nav>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addIdeaFn: (idea) => dispatch(addIdea(idea)),
});

NewIdea.propTypes = {
  addIdeaFn: PropTypes.func.isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(NewIdea);
