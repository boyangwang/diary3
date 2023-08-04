import { selectEntryInstancesMap, selectLoginUser, useAppSelector } from '@/app/store';
import { calcRecordedCurrentStreaks, calcRecordedLongestStreaks } from '@/utils/entry';
import dayjs from 'dayjs';
import { useMemo } from 'react';

function GlobalStats() {
  const loginUser = useAppSelector(selectLoginUser);
  const entryInstancesMap = useAppSelector(selectEntryInstancesMap);
  const globalStats = useMemo(() => {
    const now = dayjs();
    const registeredSince = now.diff(dayjs(loginUser.loginTime), 'day');
    const entryKeys = Object.keys(entryInstancesMap);
    const totalEntries = entryKeys.reduce((pre, cur) => pre + (entryInstancesMap[cur]?.length ?? 0), 0);
    return {
      registeredSince,
      entryDays: entryKeys?.length ?? 0,
      totalEntries,
      historicalLongestStreakByEntry: calcRecordedLongestStreaks(entryInstancesMap),
      currentStreakByEntry: calcRecordedCurrentStreaks(entryInstancesMap),
    };
  }, [entryInstancesMap, loginUser.loginTime]);
  return (
    <div>
      <h1>DiaryGlobalStats</h1>
      <p>You have signed up for Diary for {globalStats?.registeredSince} days.</p>
      <p>You recorded entries in Diary for {globalStats?.entryDays} days.</p>
      <p>You recorded in total {globalStats?.totalEntries} entries.</p>
      <p>In your historical longest streak, you recorded entries for {globalStats?.historicalLongestStreakByEntry} days.</p>
      <p>In your current streak, you recorded entries for {globalStats?.currentStreakByEntry} days.</p>
    </div>
  );
}
export default GlobalStats;
