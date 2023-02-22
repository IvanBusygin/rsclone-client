import { createSlice } from '@reduxjs/toolkit';
import { IMyPageState } from '../../types/myPage';
import postUserPost from '../thunks/myPageThunks';

const initialState: IMyPageState = {
  newPostText: '',
  posts: [],
  isLoading: false,
};

const myPageSlice = createSlice({
  name: 'myPage',
  initialState,
  reducers: {
    updateNewPostText(state, action) {
      state.newPostText = action.payload.text;
    },
    removePost(state, action) {
      const index = state.posts.findIndex((post) => post.text === action.payload.post);

      if (index !== -1) {
        state.posts.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(postUserPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postUserPost.fulfilled, (state, action) => {
        state.isLoading = false;

        const { id, date, text, likes } = action.payload;
        state.posts.push({
          id,
          date,
          text,
          likes,
        });
        state.newPostText = '';
      }),
});

export const { updateNewPostText, removePost } = myPageSlice.actions;

export default myPageSlice.reducer;
