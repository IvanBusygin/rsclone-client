export interface IFormSearch {
  searchInput: string;
}

interface IInfo {
  fullName: string;
  avatar?: string;
  hometown?: string;
}

interface IFoundUser {
  info: IInfo;
  _id: string;
  isOnline: boolean;
  username: string;
}

export interface IFoundPeople {
  user: IFoundUser;
  friendStatus: number;
}

export interface IOutComming {
  recipient: {
    info: {
      fullName: string;
      avatar?: string;
    };
    username: string;
    _id: string;
  };
  status: string;
}

export interface IInComming {
  requester: {
    info: {
      fullName: string;
      avatar?: string;
    };
    username: string;
    _id: string;
  };
  status: string;
}

export interface IFriendsOut {
  id: string;
  outcomming: IOutComming[];
}

export interface IFriendsIn {
  id: string;
  incomming: IInComming[];
}

export interface IDataMyFriends {
  info: {
    fullName: string;
    avatar?: string;
  };
  username: string;
  _id: string;
}
