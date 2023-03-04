export const DEFAULT_DATE = '1930-01-01T01:00:00.000Z';
// export const SERVER_URL = 'https://rs-clone-vk.onrender.com';
export const SERVER_URL = 'https://rsclone-vk-server-production-ff8c.up.railway.app';
export const PERSON_GET_INFO_URL = `${SERVER_URL}/info`;
export const PERSON_POST_URL = `${SERVER_URL}/posts`;
export const PERSON_GET_POSTS_URL = `${SERVER_URL}/posts/user`;
export const LOGIN_URL = `${SERVER_URL}/auth/login`;
export const LOGOUT_URL = `${SERVER_URL}/auth/logout`;
export const AUTH_URL = `${SERVER_URL}/auth/registration`;
export const REFRESH_URL = `${SERVER_URL}/auth/refresh`;
export const USER_GET_INFO_URL = `${SERVER_URL}/user`;
export const SEARCH_URL = `${SERVER_URL}/search`;
export const FRIENDS_URL = `${SERVER_URL}/user/friends`;
export const IN_FRIEND_URL = `${SERVER_URL}/user/friends/incomming`;
export const OUT_FRIEND_URL = `${SERVER_URL}/user/friends/outcomming`;
export const POST_COMMENT_URL = `${SERVER_URL}/posts/comments`;
export const POST_LIKE_URL = `${SERVER_URL}/posts/likes`;
export const CHATS_URL = `${SERVER_URL}/chats`;

export const MAX_SIZE_FILE = 1048576;
export const MIN_LENGTH_NAME = 2;
export const MAX_LENGTH_NAME = 20;
export const MAX_LENGTH_TEXT = 140;
export const MAX_LENGTH_CITY = 30;
export const MAX_LENGTH_EDUCATION = 50;
export const LS_ACCESS_TOKEN = 'vk-clone-accessToken';
export const LS_USER_ID = 'vk-clone-userID';
export const LS_USER_IS_AUTH = 'vk-clone-isAuth';
export const LS_USER_THEME = 'vk-clone-theme';
export const ERROR_MESSAGES = {
  max_length_name: `Максимальная длина ${MAX_LENGTH_NAME} символов`,
  min_length_name: `Минимальная длина ${MIN_LENGTH_NAME} символа`,
  max_length_city: `Максимальная длина ${MAX_LENGTH_CITY} символов`,
  max_length_education: `Максимальная длина ${MAX_LENGTH_EDUCATION} символов`,
  max_length_text: `Максимальная длина ${MAX_LENGTH_TEXT} символа`,
};
