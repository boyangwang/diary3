import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReminderRecord } from './types-constants';
import { toast } from 'react-toastify';

export interface ReminderRecordsState {
  reminderRecords: ReminderRecord[];
}
const ReminderRecordsInitialState: ReminderRecordsState = {
  reminderRecords: [],
};

export const reminderRecordsSlice = createSlice({
  name: 'reminderRecords',
  initialState: ReminderRecordsInitialState,
  reducers: {
    createReminder: (state, action: PayloadAction<ReminderRecord>) => {
      state.reminderRecords.push(action.payload);
      toast.success(`Create ${action.payload.title} successfully`);
    },
    updateReminder: (state, action: PayloadAction<ReminderRecord>) => {
      const indexToUpdate = state.reminderRecords.findIndex((reminder) => reminder.id === action.payload.id);
      // update this index in state.reminderRecords
      state.reminderRecords[indexToUpdate] = action.payload;
      toast.success(`Update ${action.payload.title} successfully`);
    },
    deleteReminder: (state, action: PayloadAction<string>) => {
      const indexToDelete = state.reminderRecords.findIndex((reminder) => reminder.id === action.payload);
      // delete this index from state.reminderRecords
      state.reminderRecords.splice(indexToDelete, 1);
    },
  },
});

export const { createReminder, updateReminder, deleteReminder } = reminderRecordsSlice.actions;
