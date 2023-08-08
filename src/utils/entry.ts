import { EntryInstance, EntryType, RoutineEnum } from '@/app/types-constants';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
dayjs.extend(weekOfYear);

// 任何entry维度 今天记录了任何entry, 就算你用了. 你连续坚持记录了多少天
export const calcRecordedLongestStreaks = (entryInstancesMap: { [key: string]: EntryInstance[] }) => {
  const entryKeys = Object.keys(entryInstancesMap);
  const sortedDates = entryKeys.sort();
  let longestStreak = 0;
  let currentStreak = 0;
  let previousDate = null;
  for (const date of sortedDates) {
    const entries = entryInstancesMap[date];

    if (entries.length > 0 && previousDate && dayjs(date).diff(dayjs(previousDate), 'day') === 1) {
      currentStreak++;
    } else {
      currentStreak = entries.length > 0 ? 1 : 0; // 如果当天没有完成任务，则重置连胜计数
    }

    if (currentStreak > longestStreak) {
      longestStreak = currentStreak;
    }

    previousDate = entries.length > 0 ? date : null;
  }

  return longestStreak;
};

// 任何entry维度 从今天往回算, 连续记录多少天,
export const calcRecordedCurrentStreaks = (entryInstancesMap: { [key: string]: EntryInstance[] }) => {
  const entryKeys = Object.keys(entryInstancesMap);
  const sortedDates = entryKeys.sort();
  let now = dayjs();
  let currentStreak = 0;
  while (entryInstancesMap[now.format('YYYY-MM-DD')]?.length) {
    currentStreak++;
    now = now.subtract(1, 'day');
  }
  return currentStreak;
};

const groupByWeek = (dates: string[]): Record<string, string[]> => {
  const grouped: Record<string, string[]> = {};
  for (const date of dates) {
    const day = dayjs(date);
    const week = `${day.format('YYYY')}-${dayjs(day).week()}`;
    if (!grouped[week]) {
      grouped[week] = [];
    }
    grouped[week].push(date);
  }
  return grouped;
};

const groupByMonth = (dates: string[]): Record<string, string[]> => {
  const grouped: Record<string, string[]> = {};
  for (const date of dates) {
    const month = dayjs(date).format('YYYY-MM');
    if (!grouped[month]) {
      grouped[month] = [];
    }
    grouped[month].push(date);
  }
  return grouped;
};

export const calcEntryTypeLongestStreaks = (entryInstancesMap: { [key: string]: EntryInstance[] }, routine?: RoutineEnum) => {
  const sortedDates = Object.keys(entryInstancesMap).sort();
  const entryTypeStreaks: Record<string, number> = {};
  const entryTypeMaxStreaks: Record<string, number> = {};
  switch (routine) {
    case RoutineEnum.daily: {
      for (const date of sortedDates) {
        const entries = entryInstancesMap[date]; // date - > 2023-08-01
        const entryTypesToday = new Set(entries.map((entry) => entry.entryTypeId));

        // 检查每个 entryType 是否连续
        for (const entryType of entryTypesToday) {
          let streak = 1; // 默认开始新的连胜计数
          // if (idx > 0) {
          const previousDate = dayjs(date).subtract(1, 'day').format('YYYY-MM-DD');
          const previousEntryTypes = entryInstancesMap?.[previousDate]?.length
            ? new Set(entryInstancesMap[previousDate].map((entry) => entry.entryTypeId))
            : new Set();
          if (previousEntryTypes.has(entryType)) {
            streak = (entryTypeStreaks[entryType] || 0) + 1; // 如果连续，则增加连胜计数
          }
          // }

          entryTypeStreaks[entryType] = streak;
          entryTypeMaxStreaks[entryType] = Math.max(entryTypeMaxStreaks[entryType] || 0, streak);
        }

        // 如果某个 entryType 在今天没有完成，则重置其连胜计数
        for (const entryType in entryTypeStreaks) {
          if (!entryTypesToday.has(entryType)) {
            entryTypeMaxStreaks[entryType] = Math.max(entryTypeMaxStreaks[entryType] || 0, entryTypeStreaks[entryType]);
            entryTypeStreaks[entryType] = 0;
          }
        }
      }
      return entryTypeMaxStreaks;
    }
    case RoutineEnum.weekly: {
      const groupedByWeek = groupByWeek(sortedDates); /** {
				"2023-31": [
						"2023-08-01",
						"2023-08-02",
						"2023-08-03",
						"2023-08-04"
				]
		} */
      const weekKeys = Object.keys(groupedByWeek).sort();
      for (const week of weekKeys) {
        const entriesKeys = groupedByWeek[week]; // ['2023-08-01', '2023-08-02', '2023-08-03']
        const entryTypeCurWeek = new Set(
          entriesKeys
            .map((key) => entryInstancesMap[key])
            .flat(1)
            .map((entry) => entry?.entryTypeId),
        );
        // 检查每个 entryType 是否连续
        for (const entryType of entryTypeCurWeek) {
          let streak = 1;
          // if (idx > 0) {
          const [y, w] = week.split('-').map((v) => parseInt(v, 10));
          let previousWeek;
          if (!(w - 1)) {
            previousWeek = `${y - 1}-${dayjs()
              .year(y - 1)
              .endOf('year')
              .week()}`;
          } else previousWeek = `${y}-${w - 1}`;

          const previousEntryTypes = groupedByWeek?.[previousWeek]?.length
            ? new Set(
                groupedByWeek[previousWeek]
                  .map((key) => entryInstancesMap[key])
                  .flat(1)
                  .map((entry) => entry?.entryTypeId),
              )
            : new Set();
          if (previousEntryTypes.has(entryType)) {
            streak = (entryTypeStreaks[entryType] || 0) + 1; // 如果连续，则增加连胜计数
          }
          // }
          entryTypeStreaks[entryType] = streak;
          entryTypeMaxStreaks[entryType] = Math.max(entryTypeMaxStreaks[entryType] || 0, streak);
        }
        // 如果某个 entryType 在今天没有完成，则重置其连胜计数
        for (const entryType in entryTypeStreaks) {
          if (!entryTypeCurWeek.has(entryType)) {
            entryTypeMaxStreaks[entryType] = Math.max(entryTypeMaxStreaks[entryType] || 0, entryTypeStreaks[entryType]);
            entryTypeStreaks[entryType] = 0;
          }
        }
      }
      return entryTypeMaxStreaks;
    }
    case RoutineEnum.monthly: {
      const groupedByMonth = groupByMonth(sortedDates); /** {
				"2023-08": [
						"2023-08-01",
						"2023-08-02",
						"2023-08-03",
						"2023-08-04"
				]
		} */
      const monthKeys = Object.keys(groupedByMonth).sort();
      for (const month of monthKeys) {
        const entriesKeys = groupedByMonth[month];

        const entryTypeCurMonth = new Set(
          entriesKeys
            .map((key) => entryInstancesMap[key])
            .flat(1)
            .map((entry) => entry?.entryTypeId),
        );

        // 检查每个 entryType 是否连续
        for (const entryType of entryTypeCurMonth) {
          let streak = 1;
          const previousMonth = dayjs(month).subtract(1, 'month').format('YYYY-MM');
          const previousEntryTypes = groupedByMonth?.[previousMonth]?.length
            ? new Set(
                groupedByMonth[previousMonth]
                  .map((key) => entryInstancesMap[key])
                  .flat(1)
                  .map((entry) => entry?.entryTypeId),
              )
            : new Set();

          if (previousEntryTypes.has(entryType)) {
            streak = (entryTypeStreaks[entryType] || 0) + 1; // 如果连续，则增加连胜计数
          }
          entryTypeStreaks[entryType] = streak;
          entryTypeMaxStreaks[entryType] = Math.max(entryTypeMaxStreaks[entryType] || 0, streak);
        }
        // 如果某个 entryType 在本月没有完成，则重置其连胜计数
        for (const entryType in entryTypeStreaks) {
          if (!entryTypeCurMonth.has(entryType)) {
            entryTypeMaxStreaks[entryType] = Math.max(entryTypeMaxStreaks[entryType] || 0, entryTypeStreaks[entryType]);
            entryTypeStreaks[entryType] = 0;
          }
        }
      }
      return entryTypeMaxStreaks;
    }
    case RoutineEnum.adhoc:
    default:
      return entryTypeMaxStreaks;
  }
};
