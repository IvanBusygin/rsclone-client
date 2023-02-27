import { createSlice } from '@reduxjs/toolkit';
import { IUserPageState } from '../../types/userPage';
import getUserInfo from '../thunks/userPageThunks';

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
};

const userPageSlice = createSlice({
  name: 'userPage',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.info = action.payload.info;
    }),
});

// export const {} = userPageSlice.actions;

export default userPageSlice.reducer;
