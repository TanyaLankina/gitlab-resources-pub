import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface AuthState {
  authToken: string | null;
  fetching: boolean;
}

const initialState: AuthState = {
  authToken: null,
  fetching: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<{ access_token: string }>) => {
      state.authToken = action.payload.access_token;
    },
    removeAuthToken: (state) => {
      state.authToken = null;
    },
    fetchingStart: (state) => {
      state.fetching = true;
    },
    fetchingFinish: (state) => {
      state.fetching = false;
    },
  },
});

export const { fetchingStart, fetchingFinish, setAuthToken, removeAuthToken } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
