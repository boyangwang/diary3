import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EntryInstance, getDateStringFromTimestamp } from './types-constants';

export interface EntryInstancesState {
  entryInstancesMap: { [key: string]: EntryInstance[] };
}
const initialState: EntryInstancesState = {
  entryInstancesMap: {},
};

export const entryInstancesSlice = createSlice({
  name: 'entryInstances',
  initialState,
  reducers: {
    initDayEntryInstances: (state, actoin: PayloadAction<{ dateStr: string }>) => {
      state.entryInstancesMap[actoin.payload.dateStr] = state.entryInstancesMap[actoin.payload.dateStr] || [];
    },
    createEntryInstance: (state, action: PayloadAction<EntryInstance>) => {
      const dateStr = getDateStringFromTimestamp(action.payload.createdAt);
      state.entryInstancesMap[dateStr]
        ? state.entryInstancesMap[dateStr].push(action.payload)
        : (state.entryInstancesMap[dateStr] = [action.payload]);
    },
    updateEntryInstance: (state, action: PayloadAction<EntryInstance>) => {
      // find the index of the entryInstance in state.entryInstancesMap[dateStr]
      const dateStr = getDateStringFromTimestamp(action.payload.createdAt);
      const indexToUpdate = state.entryInstancesMap[dateStr].findIndex(
        (entryInstance) => entryInstance.id === action.payload.id,
      );
      // update the entryInstance at that index
      state.entryInstancesMap[dateStr][indexToUpdate] = action.payload;
    },
    updateChangeEntryIdEntryInstance: (state, action: PayloadAction<{ preEntryTypeId: string; changeEntryTypeId: string }>) => {
      const { preEntryTypeId, changeEntryTypeId } = action.payload;
      const { entryInstancesMap } = state;
      console.log('updateChangeEntryIdEntryInstance============', { entryInstancesMap });
      for (const key in entryInstancesMap) {
        if (!entryInstancesMap?.[key]?.length) continue;
        entryInstancesMap[key] = entryInstancesMap[key].map((entryInstance) => {
          if (entryInstance.entryTypeId === preEntryTypeId) {
            entryInstance.entryTypeId = changeEntryTypeId;
          }
          return entryInstance;
        });
      }
      console.log('after update entryInstance============', entryInstancesMap);
    },
    deleteEntryInstance: (state, action: PayloadAction<EntryInstance>) => {
      // find the index of the entryInstance in state.entryInstancesMap[dateStr]
      const dateStr = getDateStringFromTimestamp(action.payload.createdAt);
      const indexToDelete = state.entryInstancesMap[dateStr].findIndex(
        (entryInstance) => entryInstance.id === action.payload.id,
      );
      // delete the entryInstance at that index
      state.entryInstancesMap[dateStr].splice(indexToDelete, 1);
    },
    deleteEntryInstanceByEntryTypeId: (state, action: PayloadAction<string>) => {
      const deleteEntryTypeId = action.payload;
      const { entryInstancesMap } = state;

      console.log('updateChangeEntryIdEntryInstance============', { entryInstancesMap });
      for (const key in entryInstancesMap) {
        if (!entryInstancesMap?.[key]?.length) continue;
        entryInstancesMap[key] = entryInstancesMap[key].filter(({ entryTypeId }) => entryTypeId !== deleteEntryTypeId);
      }
    },
    emptyEntryInstance: (state) => {
      state.entryInstancesMap = {};
    },
  },
});

export const {
  initDayEntryInstances,
  createEntryInstance,
  updateEntryInstance,
  updateChangeEntryIdEntryInstance,
  deleteEntryInstance,
  emptyEntryInstance,
  deleteEntryInstanceByEntryTypeId,
} = entryInstancesSlice.actions;
