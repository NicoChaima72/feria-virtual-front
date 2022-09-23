import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import feriaInterceptor from "../interceptors/feriaInterceptor";
import { setSessionStorage } from "../utils/session";

const initialState = {
  loading: true,
  loadingLogin: false,
  user: null,
  error: null,
};

export const checkAuth = createAsyncThunk(
  "auth/check",
  async (args, { dispatch }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
      return null;
    }
    try {
      const { data } = await feriaInterceptor.get("/auth/renew");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      return data.user;
    } catch (err) {
      dispatch(logout());
      return null;
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await feriaInterceptor.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      return data.user;
    } catch (e) {
      return rejectWithValue(
        e.response.data?.err || {
          message: "Ha ocurrido un error, intenta más tarde",
        }
      );
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (args, { dispatch }) => {
    localStorage.removeItem("token");
    localStorage.removeItem("token-init-date");
    dispatch(onLogout());
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLogin: (state, action) => {
      state.user = action.payload;
    },
    onLogout: (state) => {
      state.user = null;
    },
    onClearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.error = null;
      state.loadingLogin = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.loadingLogin = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.loadingLogin = false;
      state.error = action.payload;
    });
    builder.addCase(checkAuth.pending, (state) => {
      state.loading = true;
      state.user = null;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
  },
});

export default authSlice.reducer;
export const { onLogin, onLogout, onClearError } = authSlice.actions;
