import { createSlice } from '@reduxjs/toolkit';
import { createChat, getChat, getChats } from '../thunks/messengerThunks';
import {
  IChatFromServer,
  IChatMemberFromServer,
  IChatMessageFromServer,
  IMessengerState,
} from '../../types/messenger';
import { LS_USER_IS_AUTH } from '../../utils/constants';

const initialState: IMessengerState = {
  chats: [],
  currentChat: null,
  loadingData: false,
};

const messengerSlice = createSlice({
  name: 'messenger',
  initialState,
  reducers: {
    addMessageToCurrentChat(state, action) {
      if (state.currentChat) {
        state.currentChat.messages.push({
          id: action.payload.messageId,
          author: action.payload.user,
          message: action.payload.message,
        });
      }
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(createChat.pending, (state) => {
        state.loadingData = true;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.chats.push({
          id: action.payload._id,
          members: action.payload.members.map((member: IChatMemberFromServer) => member._id),
        });

        const { _id: id, members, messages } = action.payload;

        const chatMembers = members.map((member: IChatMemberFromServer) => ({
          id: member._id,
          fullName: member.info.fullName,
        }));

        const chatMessages = messages.map((message: IChatMessageFromServer) => ({
          id: message._id,
          author: message.user.info.fullName,
          message: message.message,
        }));

        state.currentChat = {
          id,
          members: chatMembers,
          messages: chatMessages,
        };
      })
      .addCase(createChat.rejected, (state, action) => {
        if (action.payload === '401') {
          localStorage.setItem(LS_USER_IS_AUTH, '');
        }

        state.loadingData = false;
      })
      .addCase(getChats.pending, (state) => {
        state.loadingData = true;
      })
      .addCase(getChats.fulfilled, (state, action) => {
        state.chats = action.payload.map((chat: IChatFromServer) => ({
          id: chat._id,
          members: chat.members.map((member) => member._id),
        }));

        state.loadingData = false;
      })
      .addCase(getChats.rejected, (state, action) => {
        if (action.payload === '401') {
          localStorage.setItem(LS_USER_IS_AUTH, '');
        }

        state.loadingData = false;
      })
      .addCase(getChat.pending, (state) => {
        state.loadingData = true;
      })
      .addCase(getChat.fulfilled, (state, action) => {
        console.log(action.payload);

        const { _id: id, members, messages } = action.payload;

        const chatMembers = members.map((member: IChatMemberFromServer) => ({
          id: member._id,
          fullName: member.info.fullName,
        }));

        const chatMessages = messages.map((message: IChatMessageFromServer) => ({
          id: message._id,
          author: message.user.info.fullName,
          message: message.message,
        }));

        state.currentChat = {
          id,
          members: chatMembers,
          messages: chatMessages,
        };

        state.loadingData = false;
      })
      .addCase(getChat.rejected, (state, action) => {
        if (action.payload === '401') {
          localStorage.setItem(LS_USER_IS_AUTH, '');
        }

        state.loadingData = false;
      }),
});

export const { addMessageToCurrentChat } = messengerSlice.actions;

export default messengerSlice.reducer;
