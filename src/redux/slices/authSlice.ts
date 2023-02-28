import { AnyAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IFormLogin, IFormReg, IUserData } from '../../types/login';
import {
  AUTH_URL,
  LOGIN_URL,
  LOGOUT_URL,
  LS_ACCESS_TOKEN,
  LS_USER_ID,
  LS_USER_IS_AUTH,
  REFRESH_URL,
} from '../../utils/constants';

interface IInitialState {
  user: IUserData | object;
  accessToken: string;
  isAuth: boolean;
  errorMsg: string;
  loading: boolean;
}

const initAuth = localStorage.getItem(LS_USER_IS_AUTH) === 'true';

const initialState: IInitialState = {
  user: {},
  accessToken: '',
  isAuth: initAuth,
  errorMsg: '',
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError(state) {
      state.errorMsg = '';
    },
    resetAuth(state) {
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        localStorage.setItem(LS_ACCESS_TOKEN, JSON.stringify(action.payload.accessToken));
        localStorage.setItem(LS_USER_ID, JSON.stringify(action.payload.user._id));
        localStorage.setItem(LS_USER_IS_AUTH, JSON.stringify(true));
        state.user = action.payload;
        state.isAuth = true;
        state.loading = false;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        localStorage.setItem(LS_USER_IS_AUTH, '');
        state.errorMsg = action.payload || '';
        state.isAuth = false;
        state.loading = false;
      })

      .addCase(fetchLogout.fulfilled, () => {
        localStorage.setItem(LS_USER_IS_AUTH, '');
      })

      .addCase(fetchRegistration.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRegistration.fulfilled, (state, action) => {
        localStorage.setItem(LS_ACCESS_TOKEN, JSON.stringify(action.payload.accessToken));
        localStorage.setItem(LS_USER_ID, JSON.stringify(action.payload.user._id));
        localStorage.setItem(LS_USER_IS_AUTH, JSON.stringify(true));
        state.user = action.payload;
        state.loading = false;
        state.isAuth = true;
      })
      .addCase(fetchRegistration.rejected, (state, action) => {
        localStorage.setItem(LS_USER_IS_AUTH, '');
        state.isAuth = false;
        state.errorMsg = action.payload || '';
      })

      .addCase(fetchRefresh.fulfilled, (state, action) => {
        localStorage.setItem(LS_ACCESS_TOKEN, JSON.stringify(action.payload.accessToken));
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(fetchRefresh.rejected, (state) => {
        localStorage.setItem(LS_USER_IS_AUTH, '');
        state.isAuth = false;
      })
      .addMatcher(isError, (state) => {
        // console.log(action.payload);
        state.loading = false;
      });
  },
});

export const fetchLogin = createAsyncThunk<IUserData, IFormLogin, { rejectValue: string }>(
  'auth/login',
  async (body, { rejectWithValue }) => {
    const response = await fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({
        username: body.login,
        password: body.password,
      }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (response.ok) {
      return response.json();
    }
    const res = await response.json();
    return rejectWithValue(res.message);
  },
);

export const fetchLogout = createAsyncThunk('auth/logout', async (body, { rejectWithValue }) => {
  const response = await fetch(LOGOUT_URL, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (response.ok) {
    return response.json();
  }
  const res = await response.json();
  return rejectWithValue(res.message);
});

export const fetchRegistration = createAsyncThunk<IUserData, IFormReg, { rejectValue: string }>(
  'auth/reg',
  async (body, { rejectWithValue }) => {
    const response = await fetch(AUTH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email: body.email,
        username: body.login,
        password: body.password,
        firstName: body.name,
        lastName: body.surname,
      }),
    });

    if (response.ok) {
      return response.json();
    }
    const res = await response.json();
    return rejectWithValue(res.message);
  },
);

export const fetchRefresh = createAsyncThunk('auth/refresh', async (_, { rejectWithValue }) => {
  const response = await fetch(REFRESH_URL, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  if (response.ok) {
    return response.json();
  }
  const res = await response.json();
  return rejectWithValue(res.message);
});

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

export const { resetError, resetAuth } = authSlice.actions;
export default authSlice.reducer;
