import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: 0, // 0 empty - 1 with message - 2 ready for destroy
  message: null,
  type: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    onSetSession: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.state = action.payload.state;
    },
    onClearSession: (state) => {
      state.message = null;
      state.type = null;
      state.state = 0
    },
  },
});

export default sessionSlice.reducer;
export const { onSetSession, onClearSession, onReadyForDestroy } = sessionSlice.actions;








