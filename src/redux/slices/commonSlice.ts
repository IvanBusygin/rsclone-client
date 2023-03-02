import { createSlice } from '@reduxjs/toolkit';
import { ICommonState } from '../../types/common';
import { LS_USER_THEME } from '../../utils/constants';

const initTheme = localStorage.getItem(LS_USER_THEME) !== 'false';
import { LS_USER_ID } from '../../utils/constants';

const initialState: ICommonState = {
  isLightTheme: initTheme,
  chats: [],
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.isLightTheme = !state.isLightTheme;
      localStorage.setItem(LS_USER_THEME, JSON.stringify(state.isLightTheme));
    },
    addChat(state, action) {
      const USER_ID = JSON.parse(localStorage.getItem(LS_USER_ID) ?? '');
      const { _id: id, owner } = action.payload;

      state.chats.push({
        chatId: id,
        chatOwner: owner === USER_ID,
      });
    },
  },
});

export const { toggleTheme, addChat } = commonSlice.actions;

export default commonSlice.reducer;
