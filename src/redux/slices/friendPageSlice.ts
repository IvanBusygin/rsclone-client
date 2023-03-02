import { createSlice } from '@reduxjs/toolkit';
import { IFriendPageState, IFriendPost } from '../../types/friendPage';
import {
  deleteComment,
  getFriendInfo,
  getFriendPosts,
  postComment,
} from '../thunks/friendPageThunk';
import { IPostComments, IPostFromServer } from '../../types/myPage';
import { LS_USER_ID, LS_USER_IS_AUTH } from '../../utils/constants';

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
  loadingPost: false,
  loadingComments: false,
  commentPostId: '',
  deletingCommentId: '',
  isCommentLoading: false,
  isCommentDeleting: false,
};

const friendPageSlice = createSlice({
  name: 'friendPage',
  initialState,
  reducers: {
    setCommentedPostId(state, action) {
      state.commentPostId = action.payload.postId;
    },
    setDeletingCommentId(state, action) {
      state.deletingCommentId = action.payload.commentId;
    },
    addPostBySocket(state, action) {
      const { _id: postId, text, date } = action.payload.post;

      const postIdx = state.posts.findIndex((p) => p.id === postId);

      if (postIdx === -1) {
        state.posts.unshift({
          id: postId,
          text,
          date,
          likes: [],
          lastEdit: '',
          comments: [],
        });
      }
    },
    editPostBySocket(state, action) {
      const { _id: id, text, lastEdit } = action.payload.post;

      const postIdx = state.posts.findIndex((p) => p.id === id);

      if (postIdx !== -1) {
        state.posts[postIdx].lastEdit = lastEdit;
        state.posts[postIdx].text = text;
      }
    },
    removePostBySocket(state, action) {
      const postIdx = state.posts.findIndex((p) => p.id === action.payload.post._id);

      if (postIdx !== -1) {
        state.posts.splice(postIdx, 1);
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
      .addCase(getFriendInfo.pending, (state) => {
        state.loadingPost = true;
      })
      .addCase(getFriendInfo.fulfilled, (state, action) => {
        state.info = action.payload.user.info;

        const posts = action.payload.user?.posts;
        if (posts)
          state.posts = posts
            .map((post: IPostFromServer) => ({
              id: post._id,
              text: post.text,
              date: post.date,
              likes: [],
              lastEdit: post.lastEdit,
              comments: [],
            }))
            .reverse();

        state.loadingPost = false;
      })
      .addCase(getFriendInfo.rejected, (state, action) => {
        if (action.payload === '401') {
          localStorage.setItem(LS_USER_IS_AUTH, '');
        }

        state.loadingPost = false;
      })
      .addCase(getFriendPosts.pending, (state) => {
        state.loadingPost = true;
        state.loadingComments = true;
      })
      .addCase(getFriendPosts.fulfilled, (state, action) => {
        const USER_ID = JSON.parse(localStorage.getItem(LS_USER_ID) ?? '');

        action.payload.forEach((post: IFriendPost) => {
          const id = post._id;

          const postComments = post.comments.map((comment) => ({
            id: comment._id,
            date: comment.date,
            text: comment.text,
            authorAvatar: comment.user.info.avatar,
            authorFullName: comment.user.info.fullName,
            canDelete: USER_ID === comment.user._id,
          }));

          const postLikes = post.likes.map((like) => ({
            id: like._id,
            postId: like.post,
            userAvatar: like.user.info.avatar,
            userFullName: like.user.info.fullName,
            userId: like.user._id,
          }));

          const oldPost = state.posts.find((p) => p.id === id);

          if (oldPost) {
            oldPost.comments = postComments;
            oldPost.likes = postLikes;
          }

          state.loadingPost = false;
          state.loadingComments = false;
        });
      })
      .addCase(getFriendPosts.rejected, (state, action) => {
        if (action.payload === '401') {
          localStorage.setItem(LS_USER_IS_AUTH, '');
        }

        state.loadingPost = false;
        state.loadingComments = false;
      })
      .addCase(postComment.pending, (state) => {
        state.loadingPost = true;
        state.isCommentLoading = true;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        const comments = structuredClone(action.payload.post.comments);
        comments.pop();
        comments.push(structuredClone(action.payload.comment));

        const USER_ID = JSON.parse(localStorage.getItem(LS_USER_ID) ?? '');

        const formattedComments = comments.map((p: IPostComments) => ({
          id: p._id,
          date: p.date,
          text: p.text,
          authorAvatar: p.user.info.avatar,
          authorFullName: p.user.info.fullName,
          canDelete: USER_ID === p.user._id,
        }));

        const post = state.posts.find((p) => p.id === action.payload.post._id);

        if (post) {
          post.comments = formattedComments;
        }

        state.commentPostId = '';
        state.isCommentLoading = false;
        state.loadingPost = false;
      })
      .addCase(postComment.rejected, (state, action) => {
        if (action.payload === '401') {
          localStorage.setItem(LS_USER_IS_AUTH, '');
        }

        state.commentPostId = '';
        state.isCommentLoading = false;
        state.loadingPost = false;
      })
      .addCase(deleteComment.pending, (state, action) => {
        state.isCommentDeleting = true;
        state.deletingCommentId = action.meta.arg.commentId;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const post = state.posts.find((p) => p.id === action.payload.post._id);

        if (post) {
          const idx = post.comments.findIndex((c) => c.id === action.payload.comment._id);

          if (idx !== -1) {
            post.comments.splice(idx, 1);
          }
        }

        state.isCommentDeleting = false;
        state.deletingCommentId = '';
      })
      .addCase(deleteComment.rejected, (state) => {
        state.isCommentDeleting = false;
        state.deletingCommentId = '';
      }),
});

export const {
  setCommentedPostId,
  setDeletingCommentId,
  addPostBySocket,
  removePostBySocket,
  addLikeBySocket,
  editPostBySocket,
  removeLikeBySocket,
} = friendPageSlice.actions;

export default friendPageSlice.reducer;
