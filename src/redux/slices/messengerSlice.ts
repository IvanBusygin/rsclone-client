import { createSlice } from '@reduxjs/toolkit';
import { createChat, getChats } from '../thunks/messengerThunks';
import { IMessengerState } from '../../types/messenger';
import { LS_USER_IS_AUTH } from '../../utils/constants';

const initialState: IMessengerState = {
  loadingData: false,
};

const messengerSlice = createSlice({
  name: 'messenger',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(createChat.pending, (state) => {
        state.loadingData = true;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loadingData = false;
      })
      .addCase(createChat.rejected, (state, action) => {
        if (action.payload === '401') {
          localStorage.setItem(LS_USER_IS_AUTH, '');
        }

        state.loadingData = false;
      })
      .addCase(getChats.pending, (state) => {
        state.loadingData = true;
      })
      .addCase(getChats.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loadingData = false;
      })
      .addCase(getChats.rejected, (state, action) => {
        if (action.payload === '401') {
          localStorage.setItem(LS_USER_IS_AUTH, '');
        }

        state.loadingData = false;
      }),
});

export default messengerSlice.reducer;
