import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDateStringFromNow, getDateStringFromTimestamp } from './types-constants';

export interface UIState {
  app: {
    dateStr: string;
  };
  entryPage: {};
  addPage: {
    isEntryTypeUpdating: boolean;
    updatingEntryTypeId: string | null;
  };
  reminderPage: {};
  settingsPage: {};
}
const initialState: UIState = {
  app: {
    dateStr: getDateStringFromNow(),
  },
  entryPage: {},
  addPage: {
    isEntryTypeUpdating: false,
    updatingEntryTypeId: null,
  },
  reminderPage: {},
  settingsPage: {},
};

export const uiStateSlice = createSlice({
  name: 'uiState',
  initialState,
  reducers: {
    initDateStr(state, action: PayloadAction<{ dateStr: string }>) {
      state.app.dateStr = action.payload.dateStr;
    },
    enterEntryTypeEdit(state, action: PayloadAction<{ entryTypeId: string }>) {
      state.addPage.isEntryTypeUpdating = true;
      state.addPage.updatingEntryTypeId = action.payload.entryTypeId;
    },
    exitEntryTypeEdit(state) {
      state.addPage.isEntryTypeUpdating = false;
      state.addPage.updatingEntryTypeId = null;
    },
  },
});

export const { initDateStr, enterEntryTypeEdit, exitEntryTypeEdit } = uiStateSlice.actions;
