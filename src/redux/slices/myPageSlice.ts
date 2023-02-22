import { createSlice } from '@reduxjs/toolkit';
import { IMyPageState, IPostFromServer } from '../../types/myPage';
import { deleteUserPost, editUserPost, getUserPosts, postUserPost } from '../thunks/myPageThunks';

const initialState: IMyPageState = {
  posts: [],
  isLoading: false,
  deletingPostId: '',
  editingPostId: '',
};

const myPageSlice = createSlice({
  name: 'myPage',
  initialState,
  reducers: {
    editPost(state, action) {
      state.editingPostId = action.payload.postId;
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
          lastEdit: post.lastEdit,
        }));
      })
      .addCase(postUserPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postUserPost.fulfilled, (state, action) => {
        state.isLoading = false;

        const { _id: id, date, text, likes } = action.payload;
        state.posts.push({
          id,
          date,
          text,
          likes,
        });
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
      })
      .addCase(editUserPost.fulfilled, (state, action) => {
        state.editingPostId = '';

        const { _id: id, date, text, likes, lastEdit } = action.payload;
        const idx = state.posts.findIndex((post) => post.id === id);

        const editedPost = {
          id,
          date,
          text,
          likes,
          lastEdit,
        };

        if (idx !== -1) {
          state.posts.splice(idx, 1, editedPost);
        }
      }),
});

export const { editPost } = myPageSlice.actions;

export default myPageSlice.reducer;
