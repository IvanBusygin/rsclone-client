import { combineReducers, configureStore } from '@reduxjs/toolkit';
import commonReducer from './slices/commonSlice';
import myPageReducer from './slices/myPageSlice';

const rootReducer = combineReducers({
  common: commonReducer,
  myPage: myPageReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type State = ReturnType<typeof rootReducer>;
export type Dispatch = typeof store.dispatch;
