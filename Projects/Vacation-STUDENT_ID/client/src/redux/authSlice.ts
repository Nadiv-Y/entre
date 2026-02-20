import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthUser {
  id: number;
  username: string;
  is_admin: boolean;
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;
}

const savedToken = localStorage.getItem("token");
const savedUser = localStorage.getItem("user");

const initialState: AuthState = {
  token: savedToken || null,
  user: savedUser ? JSON.parse(savedUser) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ token: string; user: AuthUser }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
