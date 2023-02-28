import { createSlice } from '@reduxjs/toolkit';
import { IUserPageState } from '../../types/userPage';
import getUserInfo from '../thunks/userPageThunks';
import { LS_ACCESS_TOKEN, LS_USER_ID } from '../../utils/constants';

const initialState: IUserPageState = {
  info: {
    firstName: '',
    lastName: '',
    status: '',
    hometown: '',
    lifePosition: '',
    favoriteBooks: '',
    birthDate: '',
    favoriteMusic: '',
    interests: '',
    school: '',
    university: '',
    avatar: '',
    familyStatus: '',
    favoriteFilms: '',
  },
  loadingInfo: false,
};

const userPageSlice = createSlice({
  name: 'userPage',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.loadingInfo = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.info = action.payload.info;
        state.loadingInfo = false;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        if (action.payload === '401') {
          localStorage.setItem(LS_ACCESS_TOKEN, '');
          localStorage.setItem(LS_USER_ID, '');
        }

        state.loadingInfo = false;
      }),
});

// export const {} = userPageSlice.actions;

export default userPageSlice.reducer;
