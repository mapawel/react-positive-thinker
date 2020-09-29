import React from 'react';
import {
  Grid, Container, Box, Typography,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { addIdea } from 'actions/ideaActions';
import Nav from 'components/organizms/Nav';
import { Formik } from 'formik';
import { schemaAddPost } from 'validators/validatorSchema';

const NewIdea = ({ addIdeaFn, history: { goBack } }) => (
  <Nav>
    <Container maxWidth="xl">
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ minHeight: '60vh' }}
      >
        <Grid item xs={12} md={6}>
          <Formik
            initialValues={{ content: '' }}
            validationSchema={schemaAddPost}
            onSubmit={
              (values, { setSubmitting }) => {
                addIdeaFn(values);
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

const mapDispatchToProps = (dispatch) => ({
  addIdeaFn: (idea) => dispatch(addIdea(idea)),
});

export default connect(null, mapDispatchToProps)(NewIdea);
