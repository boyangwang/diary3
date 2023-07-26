import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoginUserState {
  uid: string | null;
  loginTime: number | null;
  lastUseTime: number | null;
  githubSecret: string | null;
  repo: string | null;
  email: string | null;
}
export const LoginUserInitialState: LoginUserState = {
  uid: null,
  loginTime: null,
  lastUseTime: null,
  githubSecret: null,
  repo: null,
  email: null,
};

export const loginUserSlice = createSlice({
  name: 'loginUser',
  initialState: LoginUserInitialState,
  reducers: {
    firstLogin: (state, action: PayloadAction<Object>) => {
      Object.assign(state, action.payload);
      if (!state.loginTime) {
        state.loginTime = Number(Date.now());
      }
    },
    onCloseUpdateLastUseTime: (state) => {
      state.lastUseTime = Number(Date.now());
    },
    onLogoutClickClearState: (state) => {
      state.uid = null;
    },
  },
});

export const { firstLogin, onCloseUpdateLastUseTime, onLogoutClickClearState } = loginUserSlice.actions;
