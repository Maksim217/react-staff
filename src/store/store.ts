import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers/rootReducer';
import { IStaffState } from './contracts/state';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export interface RootState {
  staff: IStaffState;
}

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);
