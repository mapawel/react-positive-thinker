import React, { useEffect, useState } from 'react';
import { Container, Grid, CircularProgress } from '@material-ui/core';
import IdeaCard from 'components/molecules/IdeaCard';
import { connect } from 'react-redux';
import { routes } from 'routes';
import { getFirebase } from 'react-redux-firebase';
import Nav from 'components/organizms/Nav';
import AddComment from 'components/organizms/AddComment';
import NoItemsInfo from 'components/atoms/NoItemsInfo';

const Wall = ({ uid, match }) => {
  const [open, setOpen] = useState(false);
  const [openId, setOpenId] = useState('');
  const [openContent, setOpenContent] = useState('');
  const [ideas, setIdeas] = useState();

  useEffect(() => {
    const firestoreIdeas = getFirebase().firestore().collection('ideas');
    const firestoreIdeasFinal = () => {
      switch (match.path) {
        case routes.ideas:
          return firestoreIdeas.where('authorId', '==', uid);
        case routes.favs:
          return firestoreIdeas.where('like', 'array-contains', uid);
        default:
          return firestoreIdeas;
      }
    };
    const unsubsctibe = firestoreIdeasFinal().onSnapshot((snap) => {
      const data = snap.docs.map((el) => ({ id: el.id, ...el.data() }));
      data.sort((a, b) => (b.date - a.date));
      setIdeas(data);
    });
    return () => unsubsctibe();
  }, [match, uid]);

  const handleClickOpen = (id, content) => {
    setOpen(true);
    setOpenId(id);
    setOpenContent(content);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const mainComponent = ideas && (
    ideas.length !== 0 ? (ideas.map(({
      id, date, like, content, authorName = '', authorMail,
    }) => (
      <Grid item key={id} xs={12} md={6}>
        <IdeaCard
          id={id}
          date={date}
          like={like}
          content={content}
          authorName={authorName}
          authorMail={authorMail}
          handleClickOpen={handleClickOpen}
        />
      </Grid>
    ))
    ) : (
      <NoItemsInfo like={match.path === routes.favs} />
    )
  );

  return (
    <Nav>
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
          {ideas ? mainComponent : (
            <CircularProgress style={{ margin: 'auto', marginTop: '30vh' }} color="primary" />
          )}
        </Grid>
      </Container>
      {open && <AddComment id={openId} content={openContent} handleClickClose={handleClickClose} />}
    </Nav>
  );
};

const mapStateToProps = (state) => ({
  uid: state.firebase.auth.uid,
});

export default connect(mapStateToProps)(Wall);
