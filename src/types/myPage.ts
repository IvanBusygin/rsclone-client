interface IUserInfo {
  info: { fullName: string; avatar: string };
  _id: string;
}

export interface IPostComments {
  _id: string;
  date: string;
  text: string;
  user: IUserInfo;
}

interface IComment {
  id: string;
  date: string;
  text: string;
  authorAvatar: string;
  authorFullName: string;
  canDelete: boolean;
}

export interface IPost {
  id: string;
  text: string;
  date: string;
  likes: IPostLike[];
  comments: IComment[];
  lastEdit?: string;
}

export interface ILikeFromServer {
  _id: string;
  post: string;
  user: IUserInfo;
}

interface IPostLike {
  id: string;
  postId: string;
  userAvatar: string;
  userFullName: string;
  userId: string;
}

export interface IPostFromServer {
  date: string;
  text: string;
  likes: ILikeFromServer[];
  user: string;
  comments: string[];
  files: string[];
  isEdit: boolean;
  lastEdit: string | undefined;
  _id: string;
}

export interface IMyPageState {
  posts: IPost[];
  isPostLoading: boolean;
  deletingPostId: string;
  editingPostId: string;
  savingPostId: string;
  successfullySavedPostId: string;
  error: string;
  loadingInfo: boolean;
}

export interface IPostProps {
  postId: string;
  firstName: string;
  lastName: string;
  avatar: string;
  text: string;
  time: string;
  likes: IPostLike[];
  editTime: string | undefined;
  comments: IComment[];
  canEdit: boolean;
  canComment: boolean;
}

export interface IFriendProps {
  image: string;
  name: string;
  friendId: string;
}

export interface ITextFieldProps {
  onButtonClick: (postText: string) => void;
  text?: string;
  placeholder?: string;
}

export interface IModalProps {
  isOpen: boolean;
  setModal: (isOpen: boolean) => void;
  message: string;
}

export interface ILikeItemProps {
  avatar: string;
  userFullName: string;
}
