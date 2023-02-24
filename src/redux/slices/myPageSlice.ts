import { createSlice } from '@reduxjs/toolkit';
import { IMyPageState, IPostFromServer } from '../../types/myPage';
import { deleteUserPost, editUserPost, getUserPosts, postUserPost } from '../thunks/myPageThunks';

const initialState: IMyPageState = {
  posts: [],
  isPostLoading: false,
  deletingPostId: '',
  editingPostId: '',
  savingPostId: '',
  successfullySavedPostId: '',
  error: '',
};

const myPageSlice = createSlice({
  name: 'myPage',
  initialState,
  reducers: {
    editPost(state, action) {
      state.editingPostId = action.payload.postId;
      state.successfullySavedPostId = '';
    },
    unEditPost(state) {
      state.editingPostId = '';
    },
    resetError(state) {
      state.error = '';
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
      .addCase(getUserPosts.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(postUserPost.pending, (state) => {
        state.isPostLoading = true;
      })
      .addCase(postUserPost.fulfilled, (state, action) => {
        state.isPostLoading = false;

        const { _id: id, date, text, likes } = action.payload;
        state.posts.unshift({
          id,
          date,
          text,
          likes,
        });
      })
      .addCase(postUserPost.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isPostLoading = false;
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
      .addCase(deleteUserPost.rejected, (state, action) => {
        state.error = action.payload as string;
        state.deletingPostId = '';
      })
      .addCase(editUserPost.pending, (state, action) => {
        state.savingPostId = action.meta.arg.postId;
        state.editingPostId = '';
        state.successfullySavedPostId = '';
      })
      .addCase(editUserPost.fulfilled, (state, action) => {
        state.savingPostId = '';
        state.successfullySavedPostId = action.payload._id;

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
      })
      .addCase(editUserPost.rejected, (state, action) => {
        state.error = action.payload as string;
        state.savingPostId = '';
        state.successfullySavedPostId = '';
      }),
});

export const { editPost, unEditPost, resetError } = myPageSlice.actions;

export default myPageSlice.reducer;
