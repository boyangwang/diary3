import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UIState {
  app: {};
  entryPage: {};
  addPage: {
    isEntryTypeUpdating: boolean;
    updatingEntryTypeId: string | null;
  };
  reminderPage: {};
  settingsPage: {};
}
const initialState: UIState = {
  app: {},
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

export const { enterEntryTypeEdit, exitEntryTypeEdit } = uiStateSlice.actions;
