import { combineReducers, configureStore } from '@reduxjs/toolkit';
import commonReducer from './slices/commonSlice';
import myPageReducer from './slices/myPageSlice';
import authReducer from './slices/authSlice';

const rootReducer = combineReducers({
  common: commonReducer,
  myPage: myPageReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type State = ReturnType<typeof rootReducer>;
export type Dispatch = typeof store.dispatch;
