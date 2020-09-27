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

export const addComment = (commentedId, comment) => async (dispatch, getState, { getFirebase }) => {
  const firestore = getFirebase().firestore();
  const user = firebase.auth().currentUser;
  const isInBase = await firestore.collection('ideas').doc(commentedId).get();
  const commentedAuthor = isInBase.data() ? isInBase.data().authorId : null;
  if (isInBase.data()) {
    firestore
      .collection('ideas')
      .doc(commentedId)
      .collection('messages')
      .add({
        comment,
        commentDate: new Date(),
        commentAuthorId: user.uid,
        commentAuthorName: user.displayName,
        commentAuthorMail: user.email,
        isCommentingAutor: commentedAuthor === user.uid,
      })
      .then(() => {
        dispatch({
          type: 'COMMENT_IDEA',
        });
      })
      .catch((err) => {
        dispatch({
          type: 'COMMENT_IDEA_ERROR',
          payload: err,
        });
      });
  } else {
    dispatch({
      type: 'COMMENT_IDEA_DELETED',
      payload: 'Cannot add your comment due to deletion of the post.',
    });
  }
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