import { DiaryGlobalStats } from '../../app/types-constants';

function GlobalStats() {
  const globalStats = new DiaryGlobalStats();
  return (
    <div>
      <h1>DiaryGlobalStats</h1>
      <p>You have signed up for Diary for {globalStats.registedSince} days.</p>
      <p>You recorded entries in Diary for {globalStats.entryDays} days.</p>
      <p>You recorded in total {globalStats.totalEntries} entries.</p>
      <p>In your historical longest streak, you recorded entries for {globalStats.historicalLongestStreakByEntry} days.</p>
      <p>In your current streak, you recorded entries for {globalStats.currentStreakByentry} days.</p>
    </div>
  );
}
export default GlobalStats;
