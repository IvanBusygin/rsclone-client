export interface ISelectProps {
  options: string[];
  selected: string;
  fieldName: string;
  returnInfo: (value: { [key: string]: string }) => void;
}

export interface IBirthDayProps {
  date: string;
  returnInfo: (value: { [key: string]: string }) => void;
}

export interface IUserInfo {
  firstName: string;
  lastName: string;
  status: string;
  hometown: string;
  lifePosition: string;
  favoriteBooks: string;
  birthDate: string;
  favoriteMusic: string;
  interests: string;
  school: string;
  university: string;
  avatar: string;
  familyStatus: string;
  favoriteFilms: string;
}

export interface IEditPageState {
  userId: string;
  infoData: IUserInfo;
  isLoading: boolean;
  loadingInfo: boolean;
}
