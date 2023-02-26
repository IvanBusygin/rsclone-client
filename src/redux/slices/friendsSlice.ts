import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  FRIENDS_URL,
  IN_FRIEND_URL,
  LS_ACCESS_TOKEN,
  LS_USER_ID,
  OUT_FRIEND_URL,
  SEARCH_URL,
} from '../../utils/constants';
import {
  IOutComming,
  IDataPeople,
  IForm,
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
  // fetched: boolean;
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
  // fetched: false,
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
        if (action.payload === 'Access token not valid') {
          localStorage.setItem(LS_ACCESS_TOKEN, '');
          localStorage.setItem(LS_USER_ID, '');
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
        if (action.payload === 'Access token not valid') {
          localStorage.setItem(LS_ACCESS_TOKEN, '');
          localStorage.setItem(LS_USER_ID, '');
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
        if (action.payload === 'Access token not valid') {
          localStorage.setItem(LS_ACCESS_TOKEN, '');
          localStorage.setItem(LS_USER_ID, '');
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
        if (action.payload === 'Access token not valid') {
          localStorage.setItem(LS_ACCESS_TOKEN, '');
          localStorage.setItem(LS_USER_ID, '');
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
        if (action.payload === 'Access token not valid') {
          localStorage.setItem(LS_ACCESS_TOKEN, '');
          localStorage.setItem(LS_USER_ID, '');
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
        if (action.payload === 'Access token not valid') {
          localStorage.setItem(LS_ACCESS_TOKEN, '');
          localStorage.setItem(LS_USER_ID, '');
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

export const fetchSearch = createAsyncThunk<IDataPeople[], IForm, { rejectValue: string }>(
  'friends/search',
  async (data, { rejectWithValue, dispatch }) => {
    const response = await funFetch(SEARCH_URL, 'POST', { value: data.searchInput });

    if (response.ok) return response.json();
    if (response.status === 401) {
      await dispatch(await fetchRefresh());
      const responseNew = await funFetch(SEARCH_URL, 'POST', { value: data.searchInput });
      if (responseNew.ok) return responseNew.json();
      const res = await responseNew.json();
      return rejectWithValue(res.message);
    }
    const res = await response.json();
    return rejectWithValue(res.message);
  },
);

export const fetchAddFriend = createAsyncThunk<string, string>(
  'friends/add',
  async (str, { rejectWithValue }) => {
    const accessToken = JSON.parse(localStorage.getItem(LS_ACCESS_TOKEN) || '');
    const response = await fetch(FRIENDS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
      credentials: 'include',
      body: JSON.stringify({ friendId: str }),
    });
    if (response.ok) return response.json();
    const res = await response.json();
    return rejectWithValue(res.message);
  },
);

export const fetchAcceptFriend = createAsyncThunk<string, string>(
  'friends/accept',
  async (str, { rejectWithValue }) => {
    const accessToken = JSON.parse(localStorage.getItem(LS_ACCESS_TOKEN) || '');
    const response = await fetch(FRIENDS_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
      credentials: 'include',
      body: JSON.stringify({ friendId: str }),
    });
    if (response.ok) return response.json();
    const res = await response.json();
    return rejectWithValue(res.message);
  },
);

export const fetchFriendOut = createAsyncThunk<IFriendsOut>(
  'friends/friendOut',
  async (_, { rejectWithValue }) => {
    const accessToken = JSON.parse(localStorage.getItem(LS_ACCESS_TOKEN) || '');
    const response = await fetch(OUT_FRIEND_URL, {
      // method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
      credentials: 'include',
    });
    if (response.ok) return response.json();
    const res = await response.json();
    return rejectWithValue(res.message);
  },
);

export const fetchFriendIn = createAsyncThunk<IFriendsIn>(
  'friends/friendIn',
  async (_, { rejectWithValue }) => {
    const accessToken = JSON.parse(localStorage.getItem(LS_ACCESS_TOKEN) || '');
    const response = await fetch(IN_FRIEND_URL, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
      credentials: 'include',
    });
    if (response.ok) {
      return response.json();
    }
    const res = await response.json();
    return rejectWithValue(res.message);
  },
);

export const fetchMyFriends = createAsyncThunk(
  'friends/myFriends',
  async (_, { rejectWithValue }) => {
    const accessToken = JSON.parse(localStorage.getItem(LS_ACCESS_TOKEN) || '');
    const response = await fetch(FRIENDS_URL, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
      credentials: 'include',
    });

    if (response.ok) {
      return response.json();
    }
    const res = await response.json();
    return rejectWithValue(res.message);
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

// const funFetch2 = async (url: string, method: string, data?: object) => {
//   const accessToken = JSON.parse(localStorage.getItem(LS_ACCESS_TOKEN) || '');
//   const res = await fetch(url, {
//     method,
//     body: JSON.stringify(data),
//     headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
//     credentials: 'include',
//   });
//
//   if (res.ok) return res.json();
// };

// export const { resetError } = authSlice.actions;
export default friendsSlice.reducer;
