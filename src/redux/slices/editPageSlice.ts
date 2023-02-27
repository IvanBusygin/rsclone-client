import { createSlice } from '@reduxjs/toolkit';
import { IEditPageState } from '../../types/editPage';
import { getPersonInfo, postPersonInfo } from '../thunks/editPageThunks';
import { DEFAULT_DATE, LS_ACCESS_TOKEN, LS_USER_ID } from '../../utils/constants';

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
  loadingInfo: false,
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
      .addCase(getPersonInfo.pending, (state) => {
        state.loadingInfo = true;
      })
      .addCase(getPersonInfo.fulfilled, (state, action) => {
        state.infoData = {
          ...state.infoData,
          ...action.payload,
        };

        state.loadingInfo = false;
      })
      .addCase(getPersonInfo.rejected, (state, action) => {
        if (action.payload === '401') {
          localStorage.setItem(LS_ACCESS_TOKEN, '');
          localStorage.setItem(LS_USER_ID, '');
        }

        state.loadingInfo = false;
      })
      .addCase(postPersonInfo.pending, (state) => {
        state.isLoading = true;
        state.loadingInfo = true;
      })
      .addCase(postPersonInfo.fulfilled, (state) => {
        state.isLoading = false;
        state.loadingInfo = false;
      })
      .addCase(postPersonInfo.rejected, (state, action) => {
        if (action.payload === '401') {
          localStorage.setItem(LS_ACCESS_TOKEN, '');
          localStorage.setItem(LS_USER_ID, '');
        }

        state.loadingInfo = false;
      });
  },
});

export const { updateUserInfo } = editPageSlice.actions;

export default editPageSlice.reducer;
