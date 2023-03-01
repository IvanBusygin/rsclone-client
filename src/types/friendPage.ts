import { IUserInfo } from './editPage';
import { IPost } from './myPage';

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
