import { createSlice } from '@reduxjs/toolkit';
import { IEditPageState } from '../../types/editPage';
import { getUserInfo, postUserInfo } from '../thunks/editPageThunks';
import { DEFAULT_DATE } from '../../utils/constants';

const initialState: IEditPageState = {
  userId: '',
  infoData: {
    firstName: '',
    lastName: '',
    status: '',
    hometown: '',
    lifePosition: '',
    favoriteBooks: '',
    birthDate: DEFAULT_DATE,
    favoriteMusic: '',
    interests: '',
    school: '',
    university: '',
    avatar: '',
    familyStatus: 'Не выбрано',
    favoriteFilms: '',
  },
  isLoading: false,
};

const editPageSlice = createSlice({
  name: 'editPage',
  initialState,
  reducers: {
    updateUserInfo(state, action) {
      state.infoData = { ...state.infoData, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.infoData = {
          ...state.infoData,
          ...action.payload,
        };
      })
      .addCase(postUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postUserInfo.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});

export const { updateUserInfo } = editPageSlice.actions;

export default editPageSlice.reducer;
