import firebase from 'config/fbConfig';

export const addIdea = (idea) => (dispatch, getState, { getFirebase }) => {
  const firestore = getFirebase().firestore();
  const user = firebase.auth().currentUser;
  firestore
    .collection('ideas')
    .add({
      ...idea,
      date: new Date(),
      authorId: user.uid,
      authorName: user.displayName,
      authorMail: user.email,
    })
    .then(() => {
      dispatch({
        type: 'ADD_IDEA',
      });
    })
    .catch((err) => {
      dispatch({
        type: 'ADD_IDEA_ERROR',
        payload: err,
      });
    });
};

export const deleteIdea = (id) => (dispatch, getState, { getFirebase }) => {
  const firestore = getFirebase().firestore();
  firestore
    .collection('ideas')
    .doc(id)
    .delete()
    .then(() => {
      dispatch({
        type: 'DELETE_IDEA',
      });
    })
    .catch((err) => {
      dispatch({
        type: 'DELETE_IDEA_ERROR',
        payload: err,
      });
    });
};
