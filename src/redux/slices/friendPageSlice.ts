import { createSlice } from '@reduxjs/toolkit';
import { IFriendPageState } from '../../types/friendPage';
import { getFriendInfo, postComment } from '../thunks/friendPageThunk';
import { IPostComments, IPostFromServer } from '../../types/myPage';

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
};

const friendPageSlice = createSlice({
  name: 'friendPage',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getFriendInfo.fulfilled, (state, action) => {
        console.log(action.payload);
        state.info = action.payload.info;
        state.posts = action.payload.posts.map((post: IPostFromServer) => ({
          id: post._id,
          text: post.text,
          date: post.date,
          likes: structuredClone(post.likes),
          lastEdit: post.lastEdit,
          comments: [],
        }));
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
      }),
});

export default friendPageSlice.reducer;
