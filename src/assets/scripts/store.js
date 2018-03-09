import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    'object' === typeof window &&
    'undefined' !== typeof window.devToolsExtension
      ? window.devToolsExtension()
      : f => f
  )
);

export default store;
