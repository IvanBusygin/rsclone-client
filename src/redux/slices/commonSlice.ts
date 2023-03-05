import { createSlice } from '@reduxjs/toolkit';
import { ICommonState } from '../../types/common';
import { LS_USER_THEME } from '../../utils/constants';

const initTheme = localStorage.getItem(LS_USER_THEME) !== 'false';

const initialState: ICommonState = {
  isLightTheme: initTheme,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.isLightTheme = !state.isLightTheme;
      localStorage.setItem(LS_USER_THEME, JSON.stringify(state.isLightTheme));
    },
  },
});

export const { toggleTheme } = commonSlice.actions;

export default commonSlice.reducer;
