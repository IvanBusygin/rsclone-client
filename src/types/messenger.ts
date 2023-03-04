import { IDataMyFriends } from './friends';

export interface IMessengerFriendsListProps {
  options: IDataMyFriends[];
  onOptionClick: (id: string) => void;
}

export interface IMessengerState {
  chats: IChat[];
  currentChat: ICurrentChat | null;
  loadingData: boolean;
}

export interface IChatMemberFromServer {
  _id: string;
  username: string;
  info: {
    avatar: string;
    fullName: string;
  };
}

export interface IChat {
  id: string;
  members: string[];
}

export interface IChatMessageFromServer {
  _id: string;
  message: string;
  user: IChatMemberFromServer;
}

export interface IChatFromServer {
  _id: string;
  members: IChatMemberFromServer[];
  messages: IChatMessageFromServer[];
  owner: string;
  role: string;
}

interface ICurrentChatMember {
  id: string;
  fullName: string;
}

interface ICurrentChatMessage {
  id: string;
  author: string;
  message: string;
}

interface ICurrentChat {
  id: string;
  members: ICurrentChatMember[];
  messages: ICurrentChatMessage[];
}
