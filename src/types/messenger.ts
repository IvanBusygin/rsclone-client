import { IDataMyFriends } from './friends';

export interface IMessengerFriendsListProps {
  options: IDataMyFriends[];
  onOptionClick: (id: string) => void;
}

export interface IMessengerState {
  loadingData: boolean;
}
