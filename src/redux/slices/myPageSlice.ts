import { createSlice } from '@reduxjs/toolkit';
import { IMyPageState } from '../../types/myPage';

const initialState: IMyPageState = {
  posts: [],
};

const myPageSlice = createSlice({
  name: 'myPage',
  initialState,
  reducers: {
    addPost(state, action) {
      const { text, creationTime } = action.payload;
      state.posts.push({ text, creationTime });
    },
    removePost(state, action) {
      const index = state.posts.findIndex((post) => post.text === action.payload.post);

      if (index !== -1) {
        state.posts.splice(index, 1);
      }
    },
  },
});

export const { addPost, removePost } = myPageSlice.actions;

export default myPageSlice.reducer;
