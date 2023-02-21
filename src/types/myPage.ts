interface IPost {
  text: string;
  creationTime: string;
}

export interface IMyPageState {
  newPostText: string;
  posts: IPost[];
}

export interface IPostProps {
  post: string;
  time: string;
}

export interface IFriendProps {
  image: string;
  name: string;
}
