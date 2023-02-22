interface IPost {
  id: string;
  text: string;
  date: string;
}

export interface IMyPageState {
  newPostText: string;
  posts: IPost[];
  isLoading: boolean;
}

export interface IPostProps {
  text: string;
  time: string;
}

export interface IFriendProps {
  image: string;
  name: string;
}
