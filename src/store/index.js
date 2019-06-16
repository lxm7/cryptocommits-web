import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { apolloReducer } from 'apollo-cache-redux';

import list from './List/reducers';
import user from './User/reducers';

const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? // eslint-disable-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ // eslint-disable-line no-underscore-dangle
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunkMiddleware), // ...middlewares
  // other store enhancers if any
);

const reducers = combineReducers({
  apollo: apolloReducer,
  list,
  user,
});

const store = () => createStore(
  reducers,
  {},
  enhancer,
);

export { reducers, store };
