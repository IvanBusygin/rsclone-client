import { createSlice } from '@reduxjs/toolkit';
import { IUserPageState } from '../../types/userPage';
import getUserInfo from '../thunks/userPageThunks';
import { LS_USER_IS_AUTH } from '../../utils/constants';

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
  friendStatus: undefined,
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
        state.info = action.payload.user.info;
        state.friendStatus = action.payload.friendStatus;
        state.loadingInfo = false;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        if (action.payload === '401') {
          localStorage.setItem(LS_USER_IS_AUTH, '');
        }

        state.loadingInfo = false;
      }),
});

// export const {} = userPageSlice.actions;

export default userPageSlice.reducer;
