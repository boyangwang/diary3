import { Area, ResponsiveContainer, Tooltip, AreaChart, XAxis, YAxis, Legend, CartesianGrid, Brush } from 'recharts';
import { selectAllDaysFilledBySomeEntryInstances, useAppSelector } from '../../app/store';
import {
  barHighColor,
  barLowColor,
  chartColorPanel,
  EntryInstance,
  setOpacity,
  stringHashCode,
} from '../../app/types-constants';
import { barLowValue, barHighValue } from '../../app/types-constants';
import EntryChartTooltip, { TooltipPayload } from './EntryChartTooltip';

const getChartDataAndAreasFromDaysAndEntriesDateMap = (
  dateRange: string[],
  entryInstancesMap: { [key: string]: EntryInstance[] },
) => {
  const allKeys: Set<string> = new Set();
  const chartData = dateRange
    .map((date) => {
      const entries = entryInstancesMap[date];
      const res: { [key: string]: number | string } = {
        date,
        _barLow: barLowValue,
        _barHigh: barHighValue,
        Sum: 0,
      };
      entries.forEach((entry) => {
        allKeys.add(entry.entryTypeId);
        res[entry.entryTypeId] = res[entry.entryTypeId] ? Number(res[entry.entryTypeId]) + entry.points : entry.points;
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
  const dateRange = useAppSelector(selectAllDaysFilledBySomeEntryInstances);
  const { chartData, areas } = getChartDataAndAreasFromDaysAndEntriesDateMap(dateRange, props.entryInstancesMap);
  console.log({ chartData });
  return (
    <ResponsiveContainer width="95%" height={480}>
      <AreaChart data={chartData} margin={{ top: 12, right: 16, left: -20, bottom: 12 }}>
        <XAxis dataKey="date" padding={{ left: 16, right: 16 }} />
        <YAxis padding={{ top: 0, bottom: 0 }} type="number" domain={[0, 18]} ticks={[0, 4, 8, 12, 16]} />
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
          // itemSorter={(a, b) => b.value - a.value}
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
  );
}
export default EntryChart;
