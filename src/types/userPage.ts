import { IUserInfo } from './editPage';

export interface IUserPageState {
  info: IUserInfo;
  loadingInfo: boolean;
  friendStatus: number | undefined;
}
