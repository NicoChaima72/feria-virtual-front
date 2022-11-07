import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import feriaApi from "../interceptors/feriaInterceptor";

const initialState = {
  showSidebar: false,
  showConfirmLogout: false,
  dashboard: {},
  loadingDashboard: true,
};

export const loadDashboardAdmin = createAsyncThunk(
  "UI/LoadDashboard admin",
  async ({}, { rejectWithValue, dispatch }) => {
    const { data } = await feriaApi.get("/admin/dashboard");
    return data.data;
  }
);

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    onToggleSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
    onShowSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
    onShowConfirmLogout: (state, action) => {
      state.showConfirmLogout = action.payload;
    },
    onShowConfirmLogout: (state, action) => {
      state.showConfirmLogout = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadDashboardAdmin.pending, (state) => {
      state.loadingDashboard = true;
    });
    builder.addCase(loadDashboardAdmin.fulfilled, (state, action) => {
      state.loadingDashboard = false;
      state.dashboard = action.payload;
    });
    builder.addCase(loadDashboardAdmin.rejected, (state, action) => {
      state.loadingDashboard = false;
      state.dashboard = {};
    });
  },
});

export default uiSlice.reducer;
export const { onToggleSidebar, onShowSidebar, onShowConfirmLogout } =
  uiSlice.actions;
