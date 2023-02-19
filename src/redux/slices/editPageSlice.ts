import { createSlice } from '@reduxjs/toolkit';
import { IEditPageState } from '../../types/editPage';
import { getUserInfo } from '../thunks';
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
};

const editPageSlice = createSlice({
  name: 'editPage',
  initialState,
  reducers: {
    updateUserInfo(state, action) {
      state.infoData = { ...state.infoData, ...action.payload };
    },
  },
  extraReducers: {
    [getUserInfo.fulfilled.type]: (state, action) => {
      state.infoData = {
        ...state.infoData,
        ...action.payload,
      };
    },
  },
});

export const { updateUserInfo } = editPageSlice.actions;

export default editPageSlice.reducer;
