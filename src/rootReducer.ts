import { applyMiddleware, createStore, combineReducers, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { credentialsReducer } from './components/redux-data/credentials';
import { Credentials } from './service/MockService';
import { usersReducer, UsersState } from './components/redux-data/users';

export interface AppState {
  data: {
    user: {
      credentials?: Credentials;
    };
    users: UsersState;
  };
  presentation: {};
}

export const rootReducer = combineReducers({
  data: combineReducers({
    user: combineReducers({
      credentials: credentialsReducer,
    }),
    users: usersReducer,
  }),
});

export const getStore = (preloadedState?: Partial<AppState>): Store => {
  const middlewareEnhancer = applyMiddleware(thunkMiddleware);
  const composedEnhancers = composeWithDevTools(middlewareEnhancer);

  return createStore(rootReducer, preloadedState, composedEnhancers);
};
