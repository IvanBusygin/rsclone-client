import { createSlice } from '@reduxjs/toolkit';
import { IFriendPageState } from '../../types/friendPage';
import { getFriendInfo, postComment } from '../thunks/friendPageThunk';
import { IPostComments, IPostFromServer } from '../../types/myPage';
import { LS_ACCESS_TOKEN, LS_USER_ID } from '../../utils/constants';

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
};

const friendPageSlice = createSlice({
  name: 'friendPage',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getFriendInfo.pending, (state) => {
        state.loadingPost = true;
      })
      .addCase(getFriendInfo.fulfilled, (state, action) => {
        state.info = action.payload.info;

        state.posts = action.payload.posts.map((post: IPostFromServer) => ({
          id: post._id,
          text: post.text,
          date: post.date,
          likes: structuredClone(post.likes),
          lastEdit: post.lastEdit,
          comments: [],
        }));

        state.loadingPost = false;
      })
      .addCase(getFriendInfo.rejected, (state, action) => {
        if (action.payload === '401') {
          localStorage.setItem(LS_ACCESS_TOKEN, '');
          localStorage.setItem(LS_USER_ID, '');
        }

        state.loadingPost = false;
      })
      .addCase(postComment.pending, (state) => {
        state.loadingPost = true;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        const comments = structuredClone(action.payload.post.comments);
        comments.pop();
        comments.push(structuredClone(action.payload.comment));

        const formattedComments = comments.map((p: IPostComments) => ({
          date: p.date,
          text: p.text,
          authorAvatar: p.user.info.avatar,
          authorFullName: p.user.info.fullName,
        }));

        const post = state.posts.find((p) => p.id === action.payload.post._id);

        if (post) {
          post.comments = formattedComments;
        }

        state.loadingPost = false;
      })
      .addCase(postComment.rejected, (state, action) => {
        if (action.payload === '401') {
          localStorage.setItem(LS_ACCESS_TOKEN, '');
          localStorage.setItem(LS_USER_ID, '');
        }

        state.loadingPost = false;
      }),
});

export default friendPageSlice.reducer;
