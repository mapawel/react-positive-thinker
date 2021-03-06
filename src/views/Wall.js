import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { routes } from 'routes';
import { getFirebase } from 'react-redux-firebase';
import Nav from 'components/organizms/Nav';
import IdeaCard from 'components/molecules/IdeaCard';
import AddComment from 'components/organizms/AddComment';
import NoItemsInfo from 'components/atoms/NoItemsInfo';
import ImageOpen from 'components/atoms/ImageOpen';

const Wall = ({ uid, match }) => {
  const [open, setOpen] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [openId, setOpenId] = useState('');
  const [openImageUrl, setOpenImageUrl] = useState('');
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

  const handleClickImage = (url) => {
    setOpenImage(true);
    setOpenImageUrl(url);
  };

  const handleClickImageClose = () => {
    setOpenImage(false);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const mainComponent = ideas && (
    ideas.length !== 0 ? (ideas.map(({
      id, date, like, content, authorName = '', authorMail, imageUrl,
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
          imageUrl={imageUrl}
          handleClickImage={handleClickImage}
        />
      </Grid>
    ))
    ) : (
      <NoItemsInfo like={match.path === routes.favs} />
    )
  );

  return (
    <Nav style={{ position: 'relative' }}>
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
      {openImage && <ImageOpen openImageUrl={openImageUrl} handleClickImageClose={handleClickImageClose} />}
    </Nav>
  );
};

const mapStateToProps = (state) => ({
  uid: state.firebase.auth.uid,
});

Wall.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
  uid: PropTypes.string,
};

Wall.defaultProps = {
  uid: null,
};

export default connect(mapStateToProps)(Wall);
