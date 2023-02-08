import { combineReducers, configureStore } from '@reduxjs/toolkit';
import commonReducer from "./slices/commonSlice";

const rootReducer = combineReducers({
  common: commonReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type State = ReturnType<typeof rootReducer>;
export type Dispatch = typeof store.dispatch;
