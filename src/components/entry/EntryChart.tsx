import { chartDateRangeAtom, selectedChartDateAtom } from '@/store/app';
import { getEntryInstanceDateRange } from '@/utils/entry';
import dayjs from 'dayjs';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { Area, AreaChart, Brush, CartesianGrid, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import {
  EntryInstance,
  barHighColor,
  barHighValue,
  barLowColor,
  barLowValue,
  chartColorPanel,
  setOpacity,
  stringHashCode,
} from '../../app/types-constants';
import Segmented from '../segmented';
import EntryChartTooltip, { TooltipPayload } from './EntryChartTooltip';

export type DateRange = 'day' | 'week' | 'month';
const options = [
  { label: 'By Day', value: 'day' },
  { label: 'By Week', value: 'week' },
  { label: 'By Month', value: 'month' },
];

const getChartDataAndAreasFromDaysAndEntriesDateMap = (
  dateRange: string[],
  entryInstancesMap: { [key: string]: EntryInstance[] },
  selectedRange: DateRange,
) => {
  const allKeys: Set<string> = new Set();
  if (!dateRange?.length) return { areas: [], chartData: [] };
  const chartData = dateRange
    .map((date) => {
      const res: { [key: string]: number | string } = {
        _date: date,
        _barLow: barLowValue,
        _barHigh: barHighValue,
        Sum: 0,
      };
      let entries: EntryInstance[] = [];
      const startDate = dayjs(date);
      switch (selectedRange) {
        case 'month': {
          const endDay = startDate.endOf('month');
          for (let date = startDate; date.isBefore(endDay) || date.isSame(endDay); date = date.add(1, 'day')) {
            const arr = entryInstancesMap?.[date.format('YYYY-MM-DD')];
            if (arr?.length) entries.push(...arr);
          }
          break;
        }
        case 'week': {
          const endDay = startDate.endOf('week');
          for (let date = startDate; date.isBefore(endDay) || date.isSame(endDay); date = date.add(1, 'day')) {
            const arr = entryInstancesMap?.[date.format('YYYY-MM-DD')];
            if (arr?.length) entries.push(...arr);
          }
          break;
        }
        case 'day':
        default:
          entries = entryInstancesMap[date];
      }
      console.log('===========startDate', startDate.format('YYYY-MM-DD'), '===========entries', entries);

      if (!entries?.length) return res;
      entries.forEach((entry) => {
        const { entryTypeId, points } = entry;
        allKeys.add(entryTypeId);
        let nowPoints = points;
        if (typeof points === 'string') nowPoints = parseFloat(points); // 兼容 points 为 string 的老数据
        res[entryTypeId] = res[entryTypeId] ? Number(res[entryTypeId]) + nowPoints : nowPoints;
      });
      return res;
    })
    .map((dataPoint) => {
      allKeys.forEach((key: string) => {
        dataPoint[key] = dataPoint[key] || 0;
      });
      return dataPoint;
    });
  const areas = [...allKeys.keys(), '_barLow', '_barHigh'].sort().map((key: string) => {
    const colorIdx = Math.abs(stringHashCode(key)) % chartColorPanel.length;
    const props = {
      type: 'linear' as 'linear',
      dataKey: key,
      stackId: '3',
      stroke: chartColorPanel[colorIdx],
      fill: setOpacity(chartColorPanel[colorIdx], 0.36),
      dot: false,
      label: {
        formatter: (label: number | string) => {
          if (Number(label) === 0) {
            return null;
          }
          return Number(label);
        },
        position: 'right',
      },
    };
    if (key === '_barLow') {
      Object.assign(props, {
        stackId: '1',
        stroke: barLowColor,
        fill: 'transparent',
        dot: false,
        strokeWidth: 2,
        strokeDasharray: '5 4',
        strokeOpacity: 0.8,
        label: false,
      });
    } else if (key === '_barHigh') {
      Object.assign(props, {
        stackId: '2',
        stroke: barHighColor,
        fill: 'transparent',
        dot: false,
        strokeWidth: 2,
        strokeDasharray: '5 4',
        strokeOpacity: 0.8,
        label: false,
      });
    }
    return <Area key={key} {...props} />;
  });
  return { areas, chartData };
};

function EntryChart(props: { entryInstancesMap: { [key: string]: EntryInstance[] } }) {
  const [selectedRange, setSelectedRange] = useState<DateRange>('day');
  const { entryInstancesMap } = props;
  const [dateRange, setDateRange] = useAtom(chartDateRangeAtom);
  const { chartData, areas } = getChartDataAndAreasFromDaysAndEntriesDateMap(dateRange, entryInstancesMap, selectedRange);
  const setSelectedChartDate = useSetAtom(selectedChartDateAtom);
  const handleChartClick = useCallback(
    (data: any) => {
      setSelectedChartDate(data?.activeLabel ?? null);
    },
    [setSelectedChartDate],
  );

  useEffect(() => {
    const dates = getEntryInstanceDateRange(entryInstancesMap, selectedRange);
    setDateRange(dates);
  }, [entryInstancesMap, selectedRange, setDateRange]);
  console.log('==================chartData==', { chartData });

  return (
    <div>
      <Segmented defaultValue={selectedRange} onChange={(value) => setSelectedRange(value as DateRange)} options={options} />
      <ResponsiveContainer width="95%" height={480}>
        <AreaChart onClick={handleChartClick} data={chartData} margin={{ top: 12, right: 16, left: -20, bottom: 12 }}>
          <XAxis dataKey="_date" padding={{ left: 16, right: 16 }} />
          <YAxis padding={{ top: 0, bottom: 0 }} type="number" domain={[0, 18]} />
          <Legend
            wrapperStyle={{
              marginLeft: '20px',
              padding: '10px 10px 10px 10px',
            }}
          />
          <Tooltip
            itemStyle={{
              paddingTop: 0,
              paddingBottom: 0,
              height: '20px',
            }}
            wrapperStyle={{
              padding: '0 10px',
              overflow: 'hidden',
              maxHeight: '220px',
            }}
            cursor={true}
            content={(props) => (
              <EntryChartTooltip
                {...props}
                filter={(data: TooltipPayload) => {
                  if (data.name === '_barLow' || data.name === '_barHigh' || data.value === 0) {
                    return false;
                  }
                  return true;
                }}
              />
            )}
          />
          <Brush
            dataKey="date"
            height={30}
            startIndex={Math.max(chartData.length - 7, 0)}
            endIndex={chartData.length - 1}
            stroke="#8884d8"
          />
          <CartesianGrid strokeDasharray="3 3" />
          {areas}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
export default EntryChart;
