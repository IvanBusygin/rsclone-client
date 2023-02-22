interface IPost {
  id: string;
  text: string;
  date: string;
  likes: [];
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
  newPostText: string;
  posts: IPost[];
  isLoading: boolean;
  deletingPostId: string;
}

export interface IPostProps {
  postId: string;
  firstName: string;
  lastName: string;
  avatar: string;
  text: string;
  time: string;
  likes: [];
}

export interface IFriendProps {
  image: string;
  name: string;
}
