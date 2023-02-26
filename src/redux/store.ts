import { combineReducers, configureStore } from '@reduxjs/toolkit';
import commonReducer from './slices/commonSlice';
import myPageReducer from './slices/myPageSlice';
import editPageReducer from './slices/editPageSlice';
import authReducer from './slices/authSlice';
import friendsReducer from './slices/friendsSlice';

const rootReducer = combineReducers({
  common: commonReducer,
  myPage: myPageReducer,
  editPage: editPageReducer,
  auth: authReducer,
  friends: friendsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type State = ReturnType<typeof rootReducer>;
export type Dispatch = typeof store.dispatch;
