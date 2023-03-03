import { combineReducers, configureStore } from '@reduxjs/toolkit';
import commonReducer from './slices/commonSlice';
import myPageReducer from './slices/myPageSlice';
import editPageReducer from './slices/editPageSlice';
import authReducer from './slices/authSlice';
import userPageReducer from './slices/userPageSlice';
import friendsReducer from './slices/friendsSlice';
import friendPageReducer from './slices/friendPageSlice';
import messengerReducer from './slices/messengerSlice';

const rootReducer = combineReducers({
  common: commonReducer,
  myPage: myPageReducer,
  editPage: editPageReducer,
  auth: authReducer,
  userPage: userPageReducer,
  friends: friendsReducer,
  friendPage: friendPageReducer,
  messenger: messengerReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type State = ReturnType<typeof rootReducer>;
export type Dispatch = typeof store.dispatch;
