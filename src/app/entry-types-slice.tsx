import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EntryType } from './types-constants';
import { toast } from 'react-toastify';

export interface EntryTypesState {
  entryTypesArray: EntryType[];
}
const EntryTypesInitialState: EntryTypesState = {
  entryTypesArray: [],
};

export const entryTypesSlice = createSlice({
  name: 'entryTypes',
  initialState: EntryTypesInitialState,
  reducers: {
    createEntryType: (state, action: PayloadAction<EntryType>) => {
      state.entryTypesArray.push(action.payload);
      toast.success(`Create ${action.payload.title} successfully`);
    },
    updateEntryType: (state, action: PayloadAction<EntryType>) => {
      const indexToUpdate = state.entryTypesArray.findIndex((entryType) => entryType.id === action.payload.id);
      // update this index in state.entryTypesArray
      state.entryTypesArray[indexToUpdate] = action.payload;
    },
    deleteEntryType: (state, action: PayloadAction<string>) => {
      const indexToDelte = state.entryTypesArray.findIndex((entryType) => entryType.id === action.payload);
      // delete this index from state.entryTypesArray
      state.entryTypesArray.splice(indexToDelte, 1);
    },
  },
});

export const { createEntryType, updateEntryType, deleteEntryType } = entryTypesSlice.actions;
