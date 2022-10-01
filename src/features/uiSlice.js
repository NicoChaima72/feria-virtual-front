import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSidebar: false,
  showConfirmLogout: false,
};

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
});

export default uiSlice.reducer;
export const { onToggleSidebar, onShowSidebar, onShowConfirmLogout } =
  uiSlice.actions;
