interface IChat {
  chatId: string;
  chatOwner: boolean;
}

export interface ICommonState {
  isLightTheme: boolean;
  chats: IChat[];
}
