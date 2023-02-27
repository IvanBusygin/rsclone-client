export interface IPostComments {
  date: string;
  text: string;
  user: { info: { fullName: string; avatar: string } };
}

interface IComment {
  date: string;
  text: string;
  authorAvatar: string;
  authorFullName: string;
}

export interface IPost {
  id: string;
  text: string;
  date: string;
  likes: [];
  comments: IComment[];
  lastEdit?: string;
}

export interface IPostFromServer {
  date: string;
  text: string;
  likes: string[];
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
}

export interface IPostProps {
  postId: string;
  firstName: string;
  lastName: string;
  avatar: string;
  text: string;
  time: string;
  likes: [];
  editTime: string | undefined;
  comments: IComment[];
  canEdit: boolean;
  canComment: boolean;
}

export interface IFriendProps {
  image: string;
  name: string;
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
