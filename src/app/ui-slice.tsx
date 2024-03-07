import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDateStringFromNow } from './types-constants';

export interface UIState {
  app: {
    dateStr: string;
  };
  entryPage: {};
  addPage: {
    isEntryTypeUpdating: boolean;
    updatingEntryTypeId: string | null;

    updatingReminderId: string | null;
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
    updatingReminderId: null,
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
    enterReminderEdit(state, action: PayloadAction<{ reminderId: string }>) {
      state.addPage.updatingReminderId = action.payload.reminderId;
    },
    exitEntryTypeEdit(state) {
      state.addPage.isEntryTypeUpdating = false;
      state.addPage.updatingEntryTypeId = null;
    },
    exitReminderEdit(state) {
      console.log('exit', state);
      state.addPage.updatingReminderId = null;
    },
  },
});

export const { initDateStr, enterEntryTypeEdit, enterReminderEdit, exitEntryTypeEdit, exitReminderEdit } = uiStateSlice.actions;
