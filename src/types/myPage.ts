interface IPost {
  id: string;
  text: string;
  date: string;
  likes: [];
}

export interface IMyPageState {
  newPostText: string;
  posts: IPost[];
  isLoading: boolean;
}

export interface IPostProps {
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
