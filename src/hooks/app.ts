import { selectEntryInstancesMap, selectLoginUser, useAppSelector } from '@/app/store';
import { GlobalState, globalStateAtom } from '@/store/app';
import { calcRecordedCurrentStreaks, calcRecordedLongestStreaks } from '@/utils/entry';
import dayjs from 'dayjs';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

export const useInitGlobalState = () => {
  const loginUser = useAppSelector(selectLoginUser);
  const entryInstancesMap = useAppSelector(selectEntryInstancesMap);
  const setGlobalState = useSetAtom(globalStateAtom);

  useEffect(() => {
    const now = dayjs();
    const registeredSince = now.diff(dayjs(loginUser.loginTime), 'day');
    const entryKeys = Object.keys(entryInstancesMap);
    const totalEntries = entryKeys?.length ? entryKeys.reduce((pre, cur) => pre + (entryInstancesMap[cur]?.length ?? 0), 0) : 0;
    const states: GlobalState = {
      registeredSince,
      entryDays: entryKeys?.length ?? 0,
      totalEntries,
      historicalLongestStreakByEntry: calcRecordedLongestStreaks(entryInstancesMap),
      currentStreakByEntry: calcRecordedCurrentStreaks(entryInstancesMap),
    };
    setGlobalState(states);
  }, [entryInstancesMap, loginUser.loginTime, setGlobalState]);
};
