import { createSlice } from '@reduxjs/toolkit';
import { IMyPageState, IPostFromServer } from '../../types/myPage';
import { deleteUserPost, getUserPosts, postUserPost } from '../thunks/myPageThunks';

const initialState: IMyPageState = {
  newPostText: '',
  posts: [],
  isLoading: false,
  deletingPostId: '',
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
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.posts = action.payload.map((post: IPostFromServer) => ({
          id: post._id,
          text: post.text,
          date: post.date,
          likes: structuredClone(post.likes),
        }));
      })
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
      })
      .addCase(deleteUserPost.pending, (state, action) => {
        state.deletingPostId = action.meta.arg;
      })
      .addCase(deleteUserPost.fulfilled, (state, action) => {
        state.deletingPostId = '';

        const { _id: id } = action.payload.postData;
        const idx = state.posts.findIndex((post) => post.id === id);

        if (idx !== -1) {
          state.posts.splice(idx, 1);
        }
      }),
});

export const { updateNewPostText } = myPageSlice.actions;

export default myPageSlice.reducer;
