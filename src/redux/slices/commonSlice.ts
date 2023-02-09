import { createSlice } from '@reduxjs/toolkit';
import { ICommonState } from '../../types/common';

const initialState: ICommonState = {
  isLightTheme: true,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.isLightTheme = !state.isLightTheme;
    },
  },
});

export const { toggleTheme } = commonSlice.actions;

export default commonSlice.reducer;
