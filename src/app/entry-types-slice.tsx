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
    updateEntryTypeId: (
      state,
      action: PayloadAction<{ preEntryTypeId: string; changeEntryTypeId: string; newEntryType: EntryType }>,
    ) => {
      const { preEntryTypeId, changeEntryTypeId, newEntryType } = action.payload;
      const { title, id, ...rest } = newEntryType;
      const indexToUpdate = state.entryTypesArray.findIndex((entryType) => entryType.id === preEntryTypeId);
      // update this index in state.entryTypesArray
      Object.assign(state.entryTypesArray[indexToUpdate], { ...rest });
      state.entryTypesArray[indexToUpdate].id = changeEntryTypeId;
      state.entryTypesArray[indexToUpdate].title = title;
    },
    deleteEntryType: (state, action: PayloadAction<string>) => {
      const indexToDelete = state.entryTypesArray.findIndex((entryType) => entryType.id === action.payload);
      // delete this index from state.entryTypesArray
      state.entryTypesArray.splice(indexToDelete, 1);
    },
  },
});

export const { createEntryType, updateEntryType, updateEntryTypeId, deleteEntryType } = entryTypesSlice.actions;
