import { createSlice } from '@reduxjs/toolkit';
import { IFriendPageState, IFriendPost } from '../../types/friendPage';
import {
  addLike,
  deleteComment,
  getFriendInfo,
  getFriendPosts,
  postComment,
  removeLike,
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

          if (idx) {
            post.comments.splice(idx, 1);
          }
        }

        state.isCommentDeleting = false;
        state.deletingCommentId = '';
      })
      .addCase(deleteComment.rejected, (state) => {
        state.isCommentDeleting = false;
        state.deletingCommentId = '';
      })
      .addCase(addLike.pending, (state) => {
        state.loadingPost = true;
      })
      .addCase(addLike.fulfilled, (state, action) => {
        console.log(action.payload);
        const post = state.posts.find((p) => p.id === action.payload.post);

        if (post) {
          const {
            _id: id,
            post: postId,
            user: {
              info: { avatar, fullName },
              _id: userId,
            },
          } = action.payload;

          post.likes.push({
            id,
            postId,
            userAvatar: avatar,
            userFullName: fullName,
            userId,
          });
        }

        state.loadingPost = false;
      })
      .addCase(addLike.rejected, (state, action) => {
        if (action.payload === '401') {
          localStorage.setItem(LS_USER_IS_AUTH, '');
        }

        state.loadingPost = false;
      })
      .addCase(removeLike.pending, (state) => {
        state.loadingPost = true;
      })
      .addCase(removeLike.fulfilled, (state, action) => {
        const post = state.posts.find((p) => p.id === action.payload.like.post);

        if (post) {
          const likeIdx = post.likes.findIndex((l) => l.id === action.payload.like._id);

          if (likeIdx !== -1) {
            post.likes.splice(likeIdx, 1);
          }
        }

        state.loadingPost = false;
      })
      .addCase(removeLike.rejected, (state, action) => {
        if (action.payload === '401') {
          localStorage.setItem(LS_USER_IS_AUTH, '');
        }

        state.loadingPost = false;
      }),
});

export const { setCommentedPostId, setDeletingCommentId } = friendPageSlice.actions;

export default friendPageSlice.reducer;
