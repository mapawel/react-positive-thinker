import { combineReducers } from 'redux';
import authReducer from 'reducers/authReducer';
import ideaReducer from 'reducers/ideaReducer';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  auth: authReducer,
  idea: ideaReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
