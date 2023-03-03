import { IDataMyFriends } from './friends';

export interface IMessengerFriendsListProps {
  options: IDataMyFriends[];
  onOptionClick: () => void;
}
