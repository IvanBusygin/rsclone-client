import { IUserInfo } from './editPage';
import { ILikeFromServer, IPost, IPostComments } from './myPage';

export interface IFriendPageState {
  info: IUserInfo;
  posts: IPost[];
  loadingPost: boolean;
  loadingComments: boolean;
  commentPostId: string;
  deletingCommentId: string;
  isCommentLoading: boolean;
  isCommentDeleting: boolean;
}

export interface IFriendPostData {
  postId: string;
  comment: string;
}

export interface IFriendPost {
  _id: string;
  comments: IPostComments[];
  likes: ILikeFromServer[];
}
