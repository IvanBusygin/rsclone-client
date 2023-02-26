export interface IForm {
  searchInput: string;
}

interface IInfo {
  firstName: string;
  fullName: string;
  lastName: string;
  user: string;
  avatar?: string;
}

export interface IDataPeople {
  info: IInfo;
  _id: string;
  isOnline: boolean;
  username: string;
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
