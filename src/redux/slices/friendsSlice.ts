import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  FRIENDS_URL,
  IN_FRIEND_URL,
  LS_ACCESS_TOKEN,
  LS_USER_ID,
  LS_USER_IS_AUTH,
  OUT_FRIEND_URL,
  SEARCH_URL,
} from '../../utils/constants';
import {
  IOutComming,
  IDataPeople,
  IFormSearch,
  IFriendsIn,
  IFriendsOut,
  IInComming,
  IDataMyFriends,
} from '../../types/friends';
import { fetchRefresh } from './authSlice';

interface IInitialState {
  loadingSearch: boolean;
  loadingAdd: boolean;
  loadingCount: boolean;
  loadingAccept: boolean;
  loadingMyFriends: boolean;
  dataPeople: IDataPeople[];
  dataOutFriends: IOutComming[];
  dataInFriends: IInComming[];
  dataMyFriends: IDataMyFriends[];
}

const initialState: IInitialState = {
  loadingSearch: false,
  loadingAdd: false,
  loadingCount: false,
  loadingAccept: false,
  loadingMyFriends: false,
  dataPeople: [],
  dataOutFriends: [],
  dataInFriends: [],
  dataMyFriends: [],
};

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearch.pending, (state) => {
        state.loadingSearch = true;
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.dataPeople = action.payload;
        state.loadingSearch = false;
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.dataPeople = [];
        if (action.payload === '401') {
          localStorage.setItem(LS_ACCESS_TOKEN, '');
          localStorage.setItem(LS_USER_ID, '');
          localStorage.setItem(LS_USER_IS_AUTH, JSON.stringify(false));
        }
        state.loadingSearch = false;
      })

      .addCase(fetchAddFriend.pending, (state) => {
        state.loadingAdd = true;
      })
      .addCase(fetchAddFriend.fulfilled, (state) => {
        state.loadingAdd = false;
      })
      .addCase(fetchAddFriend.rejected, (state, action) => {
        if (action.payload === '401') {
          localStorage.setItem(LS_ACCESS_TOKEN, '');
          localStorage.setItem(LS_USER_ID, '');
          localStorage.setItem(LS_USER_IS_AUTH, JSON.stringify(false));
        }
        state.loadingAdd = false;
      })

      .addCase(fetchFriendOut.pending, (state) => {
        state.loadingCount = true;
      })
      .addCase(fetchFriendOut.fulfilled, (state, action) => {
        state.dataOutFriends = action.payload.outcomming;
        state.loadingCount = false;
      })
      .addCase(fetchFriendOut.rejected, (state, action) => {
        if (action.payload === '401') {
          localStorage.setItem(LS_ACCESS_TOKEN, '');
          localStorage.setItem(LS_USER_ID, '');
          localStorage.setItem(LS_USER_IS_AUTH, JSON.stringify(false));
        }
        state.loadingCount = false;
      })

      .addCase(fetchFriendIn.pending, (state) => {
        state.loadingCount = true;
      })
      .addCase(fetchFriendIn.fulfilled, (state, action) => {
        state.dataInFriends = action.payload.incomming;
        state.loadingCount = false;
      })
      .addCase(fetchFriendIn.rejected, (state, action) => {
        if (action.payload === '401') {
          localStorage.setItem(LS_ACCESS_TOKEN, '');
          localStorage.setItem(LS_USER_ID, '');
          localStorage.setItem(LS_USER_IS_AUTH, JSON.stringify(false));
        }
        state.loadingCount = false;
      })

      .addCase(fetchAcceptFriend.pending, (state) => {
        state.loadingAccept = true;
      })
      .addCase(fetchAcceptFriend.fulfilled, (state) => {
        state.loadingAccept = false;
      })
      .addCase(fetchAcceptFriend.rejected, (state, action) => {
        if (action.payload === '401') {
          localStorage.setItem(LS_ACCESS_TOKEN, '');
          localStorage.setItem(LS_USER_ID, '');
          localStorage.setItem(LS_USER_IS_AUTH, JSON.stringify(false));
        }
        state.loadingAccept = false;
      })

      .addCase(fetchMyFriends.pending, (state) => {
        state.loadingMyFriends = true;
      })
      .addCase(fetchMyFriends.fulfilled, (state, action) => {
        state.dataMyFriends = action.payload;
        state.loadingMyFriends = false;
      })
      .addCase(fetchMyFriends.rejected, (state, action) => {
        if (action.payload === '401') {
          localStorage.setItem(LS_ACCESS_TOKEN, '');
          localStorage.setItem(LS_USER_ID, '');
          localStorage.setItem(LS_USER_IS_AUTH, JSON.stringify(false));
        }
        state.loadingMyFriends = false;
      })

      .addMatcher(isError, (state, action: PayloadAction) => {
        console.log('isError', action.payload);
        state.loadingSearch = false;
        state.loadingAdd = false;
        state.loadingCount = false;
        state.loadingAccept = false;
        state.loadingMyFriends = false;
      });
  },
});

export const fetchSearch = createAsyncThunk<IDataPeople[], IFormSearch, { rejectValue: string }>(
  'friends/search',
  async (data, { rejectWithValue, dispatch }) => {
    const response = await funFetch(SEARCH_URL, 'POST', { value: data.searchInput });
    if (response.ok) return response.json();
    const res = await response.json();
    if (res.code === 401) {
      await dispatch(fetchRefresh());
      const responseNew = await funFetch(SEARCH_URL, 'POST', { value: data.searchInput });
      if (responseNew.ok) return responseNew.json();
    }
    return rejectWithValue(res.code);
  },
);

export const fetchAddFriend = createAsyncThunk<string, string>(
  'friends/add',
  async (str, { rejectWithValue, dispatch }) => {
    const response = await funFetch(FRIENDS_URL, 'POST', { friendId: str });
    if (response.ok) return response.json();
    const res = await response.json();
    if (res.code === 401) {
      await dispatch(fetchRefresh());
      const responseNew = await funFetch(FRIENDS_URL, 'POST', { friendId: str });
      if (responseNew.ok) return responseNew.json();
    }
    return rejectWithValue(res.code);
  },
);

export const fetchAcceptFriend = createAsyncThunk<string, string>(
  'friends/accept',
  async (str, { rejectWithValue, dispatch }) => {
    const response = await funFetch(FRIENDS_URL, 'PUT', { friendId: str });
    if (response.ok) return response.json();
    const res = await response.json();
    if (res.code === 401) {
      await dispatch(fetchRefresh());
      const responseNew = await funFetch(FRIENDS_URL, 'PUT', { friendId: str });
      if (responseNew.ok) return responseNew.json();
    }
    return rejectWithValue(res.code);
  },
);

export const fetchFriendOut = createAsyncThunk<IFriendsOut>(
  'friends/friendOut',
  async (_, { rejectWithValue, dispatch }) => {
    const response = await funFetch(OUT_FRIEND_URL, 'GET');
    if (response.ok) return response.json();
    const res = await response.json();
    if (res.code === 401) {
      await dispatch(fetchRefresh());
      const responseNew = await funFetch(OUT_FRIEND_URL, 'GET');
      if (responseNew.ok) return responseNew.json();
    }
    return rejectWithValue(res.code);
  },
);

export const fetchFriendIn = createAsyncThunk<IFriendsIn>(
  'friends/friendIn',
  async (_, { rejectWithValue, dispatch }) => {
    const response = await funFetch(IN_FRIEND_URL, 'GET');
    if (response.ok) return response.json();
    const res = await response.json();
    if (res.code === 401) {
      await dispatch(fetchRefresh());
      const responseNew = await funFetch(IN_FRIEND_URL, 'GET');
      if (responseNew.ok) return responseNew.json();
    }
    return rejectWithValue(res.code);
  },
);

export const fetchMyFriends = createAsyncThunk(
  'friends/myFriends',
  async (_, { rejectWithValue, dispatch }) => {
    const response = await funFetch(FRIENDS_URL, 'GET');
    if (response.ok) return response.json();
    const res = await response.json();
    if (res.code === 401) {
      await dispatch(fetchRefresh());
      const responseNew = await funFetch(FRIENDS_URL, 'GET');
      if (responseNew.ok) return responseNew.json();
    }
    return rejectWithValue(res.code);
  },
);

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

const funFetch = async (url: string, method: string, data?: object) => {
  const accessToken = JSON.parse(localStorage.getItem(LS_ACCESS_TOKEN) || '');
  return fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
    credentials: 'include',
  });
};

// export const {  } = authSlice.actions;
export default friendsSlice.reducer;
