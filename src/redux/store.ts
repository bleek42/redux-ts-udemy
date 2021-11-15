import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import recorderEventsReducer from './recorder-events';
import userEventsReducer from './user-events';

const rootReducer = combineReducers({
  userEvents: userEventsReducer,
  recorderEvents: recorderEventsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
