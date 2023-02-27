import { createSlice } from '@reduxjs/toolkit';
import { IFriendPageState } from '../../types/friendPage';
import getFriendInfo from '../thunks/friendPageThunk';
import { IPostFromServer } from '../../types/myPage';

const initialState: IFriendPageState = {
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
  posts: [],
};

const friendPageSlice = createSlice({
  name: 'friendPage',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(getFriendInfo.fulfilled, (state, action) => {
      console.log(action.payload);
      state.info = action.payload.info;
      state.posts = action.payload.posts.map((post: IPostFromServer) => ({
        id: post._id,
        text: post.text,
        date: post.date,
        likes: structuredClone(post.likes),
        lastEdit: post.lastEdit,
      }));
    }),
});

export default friendPageSlice.reducer;
