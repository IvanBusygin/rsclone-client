import { IUserInfo } from './editPage';
import { IPost } from './myPage';

export interface IFriendPageState {
  info: IUserInfo;
  posts: IPost[];
  loadingPost: boolean;
  commentPostId: string;
  isCommentLoading: boolean;
}

export interface IFriendPostData {
  postId: string;
  comment: string;
}
