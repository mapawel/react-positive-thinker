import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import IdeaCard from 'components/molecules/IdeaCard';
import { connect } from 'react-redux';
import { routes } from 'routes';
import { getFirebase } from 'react-redux-firebase';
import Nav from 'components/organizms/Nav';
import AddComment from 'components/organizms/AddComment';

const Wall = ({ uid, match }) => {
  const [open, setOpen] = useState(false);
  const [openId, setOpenId] = useState('');
  const [openContent, setOpenContent] = useState('');
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const firestoreIdeas = getFirebase().firestore().collection('ideas');
    const firestoreIdeasFinal = match.path === routes.ideas ? firestoreIdeas.where('authorId', '==', uid) : firestoreIdeas;
    const unsubsctibe = firestoreIdeasFinal.onSnapshot((snap) => {
      const data = snap.docs.map((el) => ({ id: el.id, ...el.data() }));
      data.sort((a, b) => (b.date - a.date))
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

  return (
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
                  handleClickOpen={handleClickOpen}
                />
              </Grid>
            ))
          }
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

// const mapStateToProps = (state) => ({
//   uid: state.firebase.auth.uid,
// });

// export default compose(
//   connect(mapStateToProps),
//   firestoreConnect((props) => {
//     const filterWhere = props.match.path === routes.ideas ? ['authorId', '==', props.uid] : null;
//     return [
//       {
//         collection: 'ideas',
//         where: filterWhere,
//         orderBy: 'date',
//       },
//     ];
//   }),
// )(Wall);
