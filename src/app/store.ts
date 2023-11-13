import { configureStore, ThunkAction, Action, combineReducers, createSelector } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, Persistor } from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';
import { loginUserSlice } from './login-user-slice';
import { entryTypesSlice } from './entry-types-slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { uiStateSlice } from './ui-slice';
import { entryInstancesSlice } from './entry-instances-slice';
import { reminderRecordsSlice } from './reminder-records-slice';

const persistConfig = {
  key: 'diary',
  version: 1,
  storage: localStorage,
};
const rootReducer = combineReducers({
  loginUser: loginUserSlice.reducer,
  entryTypes: entryTypesSlice.reducer,
  entryInstances: entryInstancesSlice.reducer,
  reminderRecords: reminderRecordsSlice.reducer,
  uiState: uiStateSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor: Persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const selectEntryTypesArray = (state: RootState) => state.entryTypes.entryTypesArray;
export const selectEntryInstancesMap = (state: RootState) => state.entryInstances.entryInstancesMap;
export const selectReminderRecordArray = (state: RootState) => state.reminderRecords.reminderRecords;
export const selectLoginUser = (state: RootState) => state.loginUser;
export const selectDateStr = (state: RootState) => state.uiState.app.dateStr;

export const selectEntryTypeIds = createSelector(selectEntryTypesArray, (entryTypes) => {
  return entryTypes.map((entryType) => entryType.id);
});

export const selectAllDaysFilledBySomeEntryInstances = (state: RootState) => {
  return Object.keys(selectEntryInstancesMap(state)).sort();
};
