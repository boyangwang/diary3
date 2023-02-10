import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EntryInstance } from './types-constants';

export interface EntryInstancesState {
  entryInstancesArray: EntryInstance[];
}
const initialState: EntryInstancesState = {
  entryInstancesArray: [],
};

export const entryInstancesSlice = createSlice({
  name: 'entryInstances',
  initialState,
  reducers: {
    createEntryInstance: (state, action: PayloadAction<EntryInstance>) => {
      state.entryInstancesArray.push(action.payload);
    },
    updateEntryInstance: (state, action: PayloadAction<EntryInstance>) => {
      const indexToUpdate = state.entryInstancesArray.findIndex(
        (entryInstance) => entryInstance.id === action.payload.id,
      );
      // update this index in state.entryInstancesArray
      state.entryInstancesArray[indexToUpdate] = action.payload;
    },
    deleteEntryInstance: (state, action: PayloadAction<string>) => {
      const indexToDelte = state.entryInstancesArray.findIndex((entryInstance) => entryInstance.id === action.payload);
      // delete this index from state.entryInstancesArray
      state.entryInstancesArray.splice(indexToDelte, 1);
    },
  },
});

export const { createEntryInstance, updateEntryInstance, deleteEntryInstance } = entryInstancesSlice.actions;
