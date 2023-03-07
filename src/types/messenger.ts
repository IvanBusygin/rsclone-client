import { IDataMyFriends } from './friends';

export interface IMessengerFriendsListProps {
  options: IDataMyFriends[];
  onOptionClick: (id: string) => void;
}

export interface IMessengerState {
  chats: IChat[];
  currentChat: ICurrentChat | null;
  loadingData: boolean;
  isMessageLoading: boolean;
  incomingFriendId: string;
  isChatOpen: boolean;
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
  authorId: string;
  message: string;
}

export interface ICurrentChat {
  id: string;
  members: ICurrentChatMember[];
  messages: ICurrentChatMessage[];
}

export interface IMessengerFriendProps {
  id: string;
  avatar: string | undefined;
  fullName: string;
  onFriendClick: (id: string) => void;
  indicator?: string;
  isChatOpen: boolean;
}
