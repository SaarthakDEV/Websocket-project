import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  username: string | null;
  isAuthenticated: boolean;
  socketId: string | null;
  token: string | null;
}

const initialState: AuthState = {
  username: null,
  isAuthenticated: false,
  socketId: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (
      state,
      action: PayloadAction<{
        name: string;
        socketId: string;
        token: string;
      }>
    ) => {
      state.username = action.payload.name;
      state.socketId = action.payload.socketId;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.username = null;
      state.socketId = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { authenticate, logout } = authSlice.actions;
export default authSlice.reducer;