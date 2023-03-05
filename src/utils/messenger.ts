import { IChat, ICurrentChat } from '../types/messenger';

export const isExistChat = (myId: string, friendId: string, chats: IChat[]) => {
  const chatIdx = chats.findIndex(
    (chat) => chat.members.includes(myId) && chat.members.includes(friendId),
  );

  if (chatIdx !== -1) {
    return chats[chatIdx].id;
  }

  return null;
};
