import React, { useState } from 'react';
import {
  Grid, Container, Box, Typography, Button, TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux';
import { addIdea } from 'actions/ideaActions';
import Nav from 'components/organizms/Nav';
import { Formik } from 'formik';
import { schemaAddPost } from 'validators/validatorSchema';

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
  uploadBtn: {
    alignSelf: 'flex-end',
  },
})

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
            <Box mb={2} >
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="image"
                multiple
                type="file"
                onChange={handleAddImageChange}
              />
              <label className={classes.labelButton} htmlFor="image">
                <Typography className={classes.headTxt} variant="subtitle1" color="textSecondary">
                  Upload a nice image and comment it or just
                  write something motivating!
                </Typography>
                <Button className={classes.uploadBtn} variant="contained" color="secondary" component="span">
                  Upload
                </Button>
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
                touched,
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
                      color="primary"
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

export default connect(null, mapDispatchToProps)(NewIdea);
