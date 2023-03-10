import { createSlice } from '@reduxjs/toolkit';
import { IMyPageState, IPostComments, IPostFromServer } from '../../types/myPage';
import {
  deletePersonPost,
  editPersonPost,
  getPersonPosts,
  postPersonPost,
} from '../thunks/myPageThunks';
import { LS_USER_ID, LS_USER_IS_AUTH } from '../../utils/constants';

const initialState: IMyPageState = {
  posts: [],
  isPostLoading: false,
  deletingPostId: '',
  editingPostId: '',
  savingPostId: '',
  successfullySavedPostId: '',
  error: '',
  loadingInfo: false,
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
    addCommentBySocket(state, action) {
      const USER_ID = JSON.parse(localStorage.getItem(LS_USER_ID) ?? '');

      const {
        post: { _id: postId },
        comment: {
          _id: commentId,
          date,
          text,
          user: {
            info: { avatar, fullName },
            _id: userId,
          },
        },
      } = action.payload.comment;

      const postIdx = state.posts.findIndex((p) => p.id === postId);

      if (postIdx !== -1) {
        const commentIdx = state.posts[postIdx].comments.findIndex((c) => c.id === commentId);

        if (commentIdx === -1) {
          state.posts[postIdx].comments.push({
            id: commentId,
            date,
            text,
            authorAvatar: avatar,
            authorFullName: fullName,
            canDelete: USER_ID === userId,
          });
        }
      }
    },
    removeCommentBySocket(state, action) {
      const {
        post: { _id: postId },
        comment: { _id: commentId },
      } = action.payload;

      const postIdx = state.posts.findIndex((p) => p.id === postId);

      if (postIdx !== -1) {
        const commentIdx = state.posts[postIdx].comments.findIndex((c) => c.id === commentId);

        if (commentIdx !== -1) {
          state.posts[postIdx].comments.splice(commentIdx, 1);
        }
      }
    },
    addLikeBySocket(state, action) {
      const {
        _id: id,
        post: postId,
        user: {
          _id: userId,
          info: { avatar, fullName },
        },
      } = action.payload.like;

      const postIdx = state.posts.findIndex((p) => p.id === postId);

      if (postIdx !== -1) {
        const likeIdx = state.posts[postIdx].likes.findIndex((like) => like.id === id);

        if (likeIdx === -1) {
          state.posts[postIdx].likes.push({
            id,
            postId,
            userAvatar: avatar,
            userFullName: fullName,
            userId,
          });
        }
      }
    },
    removeLikeBySocket(state, action) {
      const { _id: id, post: postId } = action.payload.like;

      const postIdx = state.posts.findIndex((p) => p.id === postId);

      if (postIdx !== -1) {
        const likeIdx = state.posts[postIdx].likes.findIndex((like) => like.id === id);

        if (likeIdx !== -1) {
          state.posts[postIdx].likes.splice(likeIdx, 1);
        }
      }
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getPersonPosts.pending, (state) => {
        state.loadingInfo = true;
      })
      .addCase(getPersonPosts.fulfilled, (state, action) => {
        state.posts = action.payload.map((p: IPostFromServer) => {
          const post = {
            id: p._id,
            text: p.text,
            date: p.date,
            likes: p.likes.map((l) => ({
              id: l._id,
              postId: l.post,
              userAvatar: l.user.info.avatar,
              userFullName: l.user.info.fullName,
              userId: l.user._id,
            })),
            lastEdit: p.lastEdit,
            comments: [],
          };

          return post;
        });

        const USER_ID = JSON.parse(localStorage.getItem(LS_USER_ID) ?? '');

        action.payload.forEach((post: { comments: IPostComments[]; _id: string }) => {
          const postComments = post.comments.map((c) => ({
            id: c._id,
            date: c.date,
            text: c.text,
            authorAvatar: c.user.info.avatar,
            authorFullName: c.user.info.fullName,
            canDelete: USER_ID === c.user._id,
          }));

          const oldPost = state.posts.find((p) => p.id === post._id);

          if (oldPost) {
            oldPost.comments = postComments;
          }
        });

        state.loadingInfo = false;
      })
      .addCase(getPersonPosts.rejected, (state, action) => {
        state.error = action.payload as string;

        if (action.payload === '401') {
          localStorage.setItem(LS_USER_IS_AUTH, '');
        }

        state.loadingInfo = false;
      })
      .addCase(postPersonPost.pending, (state) => {
        state.isPostLoading = true;
        state.loadingInfo = true;
      })
      .addCase(postPersonPost.fulfilled, (state, action) => {
        state.isPostLoading = false;
        state.loadingInfo = false;

        const { _id: id, date, text, likes } = action.payload;
        state.posts.unshift({
          id,
          date,
          text,
          likes,
          comments: [],
        });
      })
      .addCase(postPersonPost.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isPostLoading = false;

        if (action.payload === '401') {
          localStorage.setItem(LS_USER_IS_AUTH, '');
        }

        state.loadingInfo = false;
      })
      .addCase(deletePersonPost.pending, (state, action) => {
        state.deletingPostId = action.meta.arg;
        state.loadingInfo = true;
      })
      .addCase(deletePersonPost.fulfilled, (state, action) => {
        state.deletingPostId = '';

        const { _id: id } = action.payload.postData;
        const idx = state.posts.findIndex((post) => post.id === id);

        if (idx !== -1) {
          state.posts.splice(idx, 1);
        }

        state.loadingInfo = false;
      })
      .addCase(deletePersonPost.rejected, (state, action) => {
        state.error = action.payload as string;
        state.deletingPostId = '';

        if (action.payload === '401') {
          localStorage.setItem(LS_USER_IS_AUTH, '');
        }

        state.loadingInfo = false;
      })
      .addCase(editPersonPost.pending, (state, action) => {
        state.savingPostId = action.meta.arg.postId;
        state.editingPostId = '';
        state.successfullySavedPostId = '';
        state.loadingInfo = true;
      })
      .addCase(editPersonPost.fulfilled, (state, action) => {
        state.savingPostId = '';
        state.successfullySavedPostId = action.payload._id;

        const { _id: id, date, text, likes, lastEdit } = action.payload;
        const idx = state.posts.findIndex((post) => post.id === id);

        const postComments = action.payload.comments.map((c: IPostComments) => ({
          date: c.date,
          text: c.text,
          authorAvatar: c.user.info.avatar,
          authorFullName: c.user.info.fullName,
        }));

        const editedPost = {
          id,
          date,
          text,
          likes,
          lastEdit,
          comments: postComments,
        };

        if (idx !== -1) {
          state.posts.splice(idx, 1, editedPost);
        }

        state.loadingInfo = false;
      })
      .addCase(editPersonPost.rejected, (state, action) => {
        state.error = action.payload as string;
        state.savingPostId = '';
        state.successfullySavedPostId = '';

        if (action.payload === '401') {
          localStorage.setItem(LS_USER_IS_AUTH, '');
        }

        state.loadingInfo = false;
      }),
});

export const {
  editPost,
  unEditPost,
  resetError,
  addCommentBySocket,
  removeCommentBySocket,
  addLikeBySocket,
  removeLikeBySocket,
} = myPageSlice.actions;

export default myPageSlice.reducer;
