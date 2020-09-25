export const signUpAction = (signupdata) => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  firebase
    .auth()
    .createUserWithEmailAndPassword(signupdata.email, signupdata.password)
    .then(() => {
      firebase.auth().currentUser.updateProfile({displayName: signupdata.name })
    })
    .then(() => {
      dispatch({
        type: 'SIGN_UP',
        payload: signupdata.name,
      });
    })
    .catch((err) => {
      dispatch({
        type: 'SIGN_UP_ERROR',
        payload: {
          name: signupdata.name,
          err,
        },
      });
    });
};

export const signOutAction = () => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({
        type: 'SIGN_OUT',
      });
    })
    .catch((err) => {
      dispatch({
        type: 'SIGN_OUT_ERROR',
        payload: {
          err,
        },
      });
    });
};

export const signInAction = (signindata) => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  firebase
    .auth()
    .signInWithEmailAndPassword(signindata.email, signindata.password)
    .then(() => {
      dispatch({
        type: 'SIGN_IN',
      });
    })
    .catch((err) => {
      dispatch({
        type: 'SIGN_IN_ERROR',
        payload: err,
      });
    });
};
