import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'reducers/rootReducer';
import thunk from 'redux-thunk';
import { getFirebase } from 'react-redux-firebase';

const middlewares = [
  thunk.withExtraArgument({ getFirebase }),
];

export const store = createStore(rootReducer,
  compose(
    applyMiddleware(...middlewares),
  ));
