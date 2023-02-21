import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormLogin, IFormReg, IUserData } from '../../types/login';
import { AUTH_URL, LOGIN_URL, REFRESH_URL } from '../../utils/constants';

interface IInitialState {
  user: IUserData | object;
  accessToken: string;
  isAuth: boolean;
  errorDuplicate: boolean;
  loading: boolean;
}

const initialState: IInitialState = {
  user: {},
  accessToken: '',
  isAuth: false,
  errorDuplicate: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetDuplicate(state) {
      state.errorDuplicate = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        localStorage.setItem('vk-clone-accessToken', JSON.stringify(action.payload.accessToken));
        localStorage.setItem('vk-clone-userID', JSON.stringify(action.payload.user._id));
        state.user = action.payload;
        state.isAuth = true;
        state.loading = false;
      })
      .addCase(fetchLogin.rejected, (state) => {
        localStorage.setItem('vk-clone-accessToken', '');
        localStorage.setItem('vk-clone-userID', '');
        state.isAuth = false;
        state.loading = false;
      })

      .addCase(fetchReg.pending, (state) => {
        state.loading = true;
        state.errorDuplicate = false;
      })
      .addCase(fetchReg.fulfilled, (state, action) => {
        localStorage.setItem('vk-clone-accessToken', JSON.stringify(action.payload.accessToken));
        localStorage.setItem('vk-clone-userID', JSON.stringify(action.payload.user._id));
        state.user = action.payload;
        state.errorDuplicate = false;
        state.loading = false;
        state.isAuth = true;
      })
      .addCase(fetchReg.rejected, (state, action) => {
        localStorage.setItem('vk-clone-accessToken', '');
        localStorage.setItem('vk-clone-userID', '');
        state.isAuth = false;
        if (action.payload === '421') {
          state.errorDuplicate = true;
        }
      })

      .addCase(fetchRefresh.fulfilled, (state, action) => {
        localStorage.setItem('vk-clone-accessToken', JSON.stringify(action.payload.accessToken));
        localStorage.setItem('vk-clone-userID', JSON.stringify(action.payload.user._id));
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(fetchRefresh.rejected, (state) => {
        localStorage.setItem('vk-clone-accessToken', '');
        localStorage.setItem('vk-clone-userID', '');
        state.isAuth = false;
      })
      .addMatcher(isError, (state, action: PayloadAction) => {
        console.log(action.payload);
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
    return rejectWithValue('Server Error!');
  },
);

export const fetchReg = createAsyncThunk<IUserData, IFormReg, { rejectValue: string }>(
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
    if (response.status === 421) {
      return rejectWithValue('421');
    }

    return rejectWithValue('Server Error!');
  },
);

export const fetchRefresh = createAsyncThunk('auth/refresh', async () => {
  const response = await fetch(REFRESH_URL, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  if (response.ok) {
    return response.json();
  }
  return 'Server Error!';
});

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

export const { resetDuplicate } = authSlice.actions;

export default authSlice.reducer;
