interface IPost {
  id: string;
  text: string;
  date: string;
  likes: [];
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
