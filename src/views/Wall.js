import React from 'react';
import { Container, Grid } from '@material-ui/core';
import IdeaCard from 'components/molecules/IdeaCard';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { routes } from 'routes';
import Nav from 'components/organizms/Nav';
import firebase from 'config/fbConfig';

const Wall = ({ ideas, uid, rest }) =>
  // const user = firebase.auth().currentUser;
  // console.log(user)
  (
    <Nav>
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
          {
            ideas && ideas.map(({
              id, date, title, content, authorName = '', authorMail,
            }) => (
              <Grid item key={id} xs={12} md={6}>
                <IdeaCard
                  id={id}
                  date={date}
                  title={title}
                  content={content}
                  authorName={authorName}
                  authorMail={authorMail}
                />
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </Nav>
  );
const mapStateToProps = (state) => ({
  uid: state.firebase.auth.uid,
  ideas: state.firestore.ordered.ideas,
  rest: state,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    const filterWhere = props.match.path === routes.ideas ? ['authorId', '==', props.uid] : null;
    return [
      {
        collection: 'ideas',
        where: filterWhere,
        orderBy: 'date',
      },
    ];
  }),
)(Wall);
