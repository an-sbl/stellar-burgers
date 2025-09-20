import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createAction
} from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TRegisterData,
  TLoginData,
  getOrdersApi
} from '../utils/burger-api';
import { TOrder, TUser } from '../utils/types';
import { deleteCookie, setCookie, getCookie } from '../utils/cookie';

interface TInitState {
  user: TUser | null;
  userOrders: TOrder[];
  isModalOpen: boolean;
  isAuthenticated: boolean;
  loading: boolean;
  errorMessage: string;
  isAuthChecked: boolean;
}

const initialState: TInitState = {
  user: null,
  userOrders: [],
  isModalOpen: false,
  isAuthenticated: false,
  loading: false,
  errorMessage: '',
  isAuthChecked: false
};

export const fetchRegisterUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => registerUserApi(data)
);

export const fetchLoginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => loginUserApi(data)
);

export const fetchUpdateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

export const fetchLogoutUser = createAsyncThunk('user/logout', async () =>
  logoutApi()
);

export const fetchUserOrders = createAsyncThunk('user/orders', async () =>
  getOrdersApi()
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((user) => {
          dispatch(setUser(user.user));
          dispatch(setIsAuthenticated(true));
        })
        .catch(() => {
          deleteCookie('accessToken');
          dispatch(setIsAuthenticated(false));
        })
        .finally(() => dispatch(setIsAuthChecked(true)));
    } else {
      dispatch(setIsAuthChecked(true));
      dispatch(setIsAuthenticated(false));
    }
  }
);
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthChecked(state, action) {
      state.isAuthChecked = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisterUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message!;
        state.isAuthenticated = false;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.errorMessage = '';
      })
      .addCase(fetchLoginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.errorMessage = action.error.message!;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.errorMessage = '';
      })
      .addCase(fetchUpdateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message!;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchLogoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLogoutUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message!;
      })
      .addCase(fetchLogoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = { name: '', email: '' };
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message!;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectUserOrders: (state) => state.userOrders,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectLoading: (state) => state.loading,
    selectErrorMessage: (state) => state.errorMessage,
    selectIsAuthChecked: (state) => state.isAuthChecked
  }
});

export const {
  selectUser,
  selectUserOrders,
  selectIsAuthenticated,
  selectLoading,
  selectErrorMessage,
  selectIsAuthChecked
} = userSlice.selectors;
export const { setIsAuthChecked, setUser, setIsAuthenticated } =
  userSlice.actions;
export default userSlice.reducer;
