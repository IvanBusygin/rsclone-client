import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  FRIENDS_URL,
  IN_FRIEND_URL,
  LS_ACCESS_TOKEN,
  LS_USER_IS_AUTH,
  OUT_FRIEND_URL,
  SEARCH_URL,
} from '../../utils/constants';
import {
  IOutComming,
  IFoundPeople,
  IFormSearch,
  IFriendsIn,
  IFriendsOut,
  IInComming,
  IDataMyFriends,
} from '../../types/friends';
import { fetchRefresh } from './authSlice';

interface IInitialState {
  loadingSearch: boolean;
  loadingCount: boolean;
  loadingAdd: boolean;
  loadingDelete: boolean;
  loadingAccept: boolean;
  loadingMyFriends: boolean;
  dataPeoples: IFoundPeople[];
  dataOutFriends: IOutComming[];
  dataInFriends: IInComming[];
  dataMyFriends: IDataMyFriends[];
}

const initialState: IInitialState = {
  loadingSearch: false,
  loadingCount: false,
  loadingAdd: false,
  loadingDelete: false,
  loadingAccept: false,
  loadingMyFriends: false,
  dataPeoples: [],
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
        state.dataPeoples = action.payload;
        state.loadingSearch = false;
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.dataPeoples = [];
        if (action.payload === '401') {
          localStorage.setItem(LS_USER_IS_AUTH, '');
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
          localStorage.setItem(LS_USER_IS_AUTH, '');
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
          localStorage.setItem(LS_USER_IS_AUTH, '');
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
          localStorage.setItem(LS_USER_IS_AUTH, '');
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
          localStorage.setItem(LS_USER_IS_AUTH, '');
        }
        state.loadingAccept = false;
      })

      .addCase(fetchDeleteFriend.pending, (state) => {
        state.loadingDelete = true;
      })
      .addCase(fetchDeleteFriend.fulfilled, (state) => {
        state.loadingDelete = false;
      })
      .addCase(fetchDeleteFriend.rejected, (state, action) => {
        if (action.payload === '401') {
          localStorage.setItem(LS_USER_IS_AUTH, '');
        }
        state.loadingDelete = false;
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
          localStorage.setItem(LS_USER_IS_AUTH, '');
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

export const fetchSearch = createAsyncThunk<IFoundPeople[], IFormSearch, { rejectValue: string }>(
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

export const fetchDeleteFriend = createAsyncThunk<string, string>(
  'friends/delete',
  async (str, { rejectWithValue, dispatch }) => {
    const response = await funFetch(FRIENDS_URL, 'DELETE', { friendId: str });
    if (response.ok) return response.json();
    const res = await response.json();
    if (res.code === 401) {
      await dispatch(fetchRefresh());
      const responseNew = await funFetch(FRIENDS_URL, 'DELETE', { friendId: str });
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
