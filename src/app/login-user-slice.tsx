import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoginUserState {
  uid: string | null;
  loginTime: number | null;
  lastUseTime: number | null;
}
const loginUserInitialState: LoginUserState = {
  uid: null,
  loginTime: null,
  lastUseTime: null,
};

export const loginUserSlice = createSlice({
  name: 'loginUser',
  initialState: loginUserInitialState,
  reducers: {
    firstLogin: (state, action: PayloadAction<string>) => {
      state.uid = action.payload;
      const now = +Date.now();
      if (!state.loginTime) {
        state.loginTime = now;
      }
    },
    onCloseUpdateLastUseTime: (state) => {
      state.lastUseTime = +Date.now();
    },
    onLogoutClickClearState: (state) => {
      state.uid = null;
    },
  },
});

export const { firstLogin, onCloseUpdateLastUseTime, onLogoutClickClearState } = loginUserSlice.actions;
