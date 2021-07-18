import { combineReducers } from 'redux';

import user from './user';
import mailThread from './mailThread';

const appReducer = combineReducers({
  user,
  mailThread
})

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer