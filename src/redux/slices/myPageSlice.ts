import { createSlice } from '@reduxjs/toolkit';
import { IMyPageState } from '../../types/myPage';

const initialState: IMyPageState = {
  newPostText: '',
  posts: [],
};

const myPageSlice = createSlice({
  name: 'myPage',
  initialState,
  reducers: {
    updateNewPostText(state, action) {
      state.newPostText = action.payload.text;
    },
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

export const { updateNewPostText, addPost, removePost } = myPageSlice.actions;

export default myPageSlice.reducer;
