import { IChat } from '../types/messenger';

export default (myId: string, friendId: string, chats: IChat[]) => {
  const chatIdx = chats.findIndex(
    (chat) => chat.members.includes(myId) && chat.members.includes(friendId),
  );

  if (chatIdx !== -1) {
    return chats[chatIdx].id;
  }

  return null;
};
