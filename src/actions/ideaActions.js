import firebase, { storage } from 'config/fbConfig';

export const addIdea = (idea) => (dispatch, getState, { getFirebase }) => {
  const firestore = getFirebase().firestore();
  const user = firebase.auth().currentUser;
  let imageUrl;

  const addPost = (imageUrl) => {
    firestore
      .collection('ideas')
      .add({
        content: idea.content,
        date: new Date(),
        authorId: user.uid,
        authorName: user.displayName,
        authorMail: user.email,
        imageUrl,
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

  if (idea.image === '') {
    addPost(null);
  } else {
    const uploadTask = storage.ref(`/images/${idea.image.name}`).put(idea.image);
    uploadTask.on('state_changed',
      (snapShot) => {
        dispatch({
          type: 'UPLOAD_STATUS',
          payload: {
            transferred: snapShot.bytesTransferred,
            total: snapShot.totalBytes,
            status: snapShot.state,
        }})
      }, (err) => {
      }, () => {
        storage.ref('images').child(idea.image.name).getDownloadURL()
          .then((fireBaseUrl) => {
            imageUrl = fireBaseUrl;
            addPost(imageUrl);
          });
      });
  }
};

export const addLike = (likedPostId) => async (dispatch, getState, { getFirebase }) => {
  const firestore = getFirebase().firestore();
  const user = firebase.auth().currentUser;
  const likedDoc = await firestore.collection('ideas').doc(likedPostId).get();
  const likeArr = likedDoc.data().like ? likedDoc.data().like : [];

  firestore
    .collection('ideas')
    .doc(likedPostId)
    .update({
      like: [...likeArr, user.uid],
    })
    .then(() => {
      dispatch({
        type: 'ADD_LIKE',
      });
    })
    .catch((err) => {
      dispatch({
        type: 'ADD_LIKE_ERROR',
        payload: err,
      });
    });
};

export const removeLike = (likedPostId) => async (dispatch, getState, { getFirebase }) => {
  const firestore = getFirebase().firestore();
  const user = firebase.auth().currentUser;
  const likedDoc = await firestore.collection('ideas').doc(likedPostId).get();
  const likeArr = likedDoc.data().like ? likedDoc.data().like : [];
  const newLikeArr = likeArr.filter((el) => el !== user.uid);

  firestore
    .collection('ideas')
    .doc(likedPostId)
    .update({
      like: [...newLikeArr],
    })
    .then(() => {
      dispatch({
        type: 'REMOVE_LIKE',
      });
    })
    .catch((err) => {
      dispatch({
        type: 'REMOVE_LIKE_ERROR',
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
