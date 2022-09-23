import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import feriaApi from "../interceptors/feriaInterceptor";
import { setSessionStorage } from "../utils/session";

const initialState = {
  users: [],
  userActive: null,
  error: null,
  loading: true,
  loadingActive: true,
  loadingAction: false,
  roleName: "",
};

export const getUsersByRole = createAsyncThunk(
  "users/getUsersByRole",
  async ({ role, name }, { rejectWithValue, dispatch }) => {
    dispatch(onRoleName(name));
    try {
      const { data } = await feriaApi.get("/admin/users/" + role);

      return data.users;
    } catch (e) {
      return rejectWithValue(
        e.response.data?.err
          ? e.response.data.err.fields
            ? { ...e.response.data.err, message: "Verifica los campos" }
            : e.response.data.err
          : {
              message: "Ha ocurrido un error, intenta más tarde",
            }
      );
    }
  }
);

export const createUser = createAsyncThunk(
  "users/create",
  async ({ user }, { rejectWithValue, dispatch }) => {
    try {
      let endpoint = "";
      if (user.role_id === 1) endpoint = "admin";
      else if (user.role_id === 2) endpoint = "locals";
      else if (user.role_id === 3) endpoint = "externals";
      else if (user.role_id === 4) endpoint = "producers";
      else if (user.role_id === 5) endpoint = "transportists";

      await feriaApi.post("/admin/users/" + endpoint, { ...user });

      return true;
    } catch (e) {
      return rejectWithValue(
        e.response.data?.err
          ? {
              ...e.response.data.err,
              message: { type: "error", message: "Verifica los campos" },
            }
          : {
              message: {
                type: "error",
                message: "Ha ocurrido un error, intenta más tarde",
              },
            }
      );
    }
  }
);

export const activeUser = createAsyncThunk(
  "users/active",
  async ({ user_id, role_id }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await feriaApi.get(`/admin/users/${user_id}/${role_id}`);

      return data.user;
    } catch (e) {
      return rejectWithValue(
        e.response.data?.err
          ? e.response.data.err.fields
            ? { ...e.response.data.err, message: "Verifica los campos" }
            : e.response.data.err
          : {
              message: "Ha ocurrido un error, intenta más tarde",
            }
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/update",
  async ({ user }, { rejectWithValue, dispatch }) => {
    try {
      let endpoint = "";
      if (user.role_id === 1) endpoint = "admin";
      else if (user.role_id === 2) endpoint = "locals";
      else if (user.role_id === 3) endpoint = "externals";
      else if (user.role_id === 4) endpoint = "producers";
      else if (user.role_id === 5) endpoint = "transportists";

      console.log({ url: `/admin/users/${endpoint}/${user.id}`, user });
      await feriaApi.put(`/admin/users/${endpoint}/${user.id}`, { ...user });

      return true;
    } catch (e) {
      return rejectWithValue(
        e.response.data?.err
          ? {
              ...e.response.data.err,
              message: { type: "error", message: "Verifica los campos" },
            }
          : {
              message: {
                type: "error",
                message: "Ha ocurrido un error, intenta más tarde",
              },
            }
      );
    }
  }
);

export const changeStatusUser = createAsyncThunk(
  "users/changeStatus",
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await feriaApi.patch("/admin/users/status/" + id);

      return { id: data.result.id, status: data.result.status };
    } catch (e) {
      console.log({ e });
      return rejectWithValue(
        e.response.data?.err || {
          message: "Ha ocurrido un error, intenta más tarde",
        }
      );
    }
  }
);

const authSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    onActiveUser: (state, action) => {
      state.userActive = action.payload;
      state.loadingActive = false;
    },
    onRoleName: (state, action) => {
      state.roleName = action.payload;
    },
    onClearUsers: (state) => {
      state.users = [];
      state.loading = true;
      state.loadingAction = false;
    },
    onClearUserActive: (state) => {
      (state.userActive = null), (state.loadingActive = true);
      state.loadingAction = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersByRole.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsersByRole.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
    });
    builder.addCase(createUser.pending, (state, action) => {
      state.error = null;
      state.loadingAction = true;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.error = action.payload;
      state.loadingAction = false;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loadingAction = false;
    });
    builder.addCase(activeUser.pending, (state) => {
      state.loadingActive = true;
    });
    builder.addCase(activeUser.fulfilled, (state, action) => {
      state.userActive = action.payload;
      state.loadingActive = false;
    });
    builder.addCase(activeUser.rejected, (state, action) => {
      state.userActive = null;
      state.error = action.payload;
      state.loadingActive = false;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.loadingAction = true;
    });
    builder.addCase(updateUser.fulfilled, (state) => {
      state.loadingAction = false;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.error = action.payload;
      state.loadingAction = false;
    });
    builder.addCase(changeStatusUser.fulfilled, (state, action) => {
      state.users = state.users.map((user) =>
        user.id === action.payload.id
          ? { ...user, status: action.payload.status }
          : user
      );
    });
  },
});

export default authSlice.reducer;
export const { onClearUsers, onActiveUser, onRoleName, onClearUserActive } =
  authSlice.actions;
