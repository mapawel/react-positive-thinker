import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'views/Root';

import { Provider } from 'react-redux';
import store from 'store';

import firebase from 'config/fbConfig';
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

const rrfProps = {
  firebase,
  config: {},
  dispatch: store.dispatch,
  createFirestoreInstance,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Root />
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
