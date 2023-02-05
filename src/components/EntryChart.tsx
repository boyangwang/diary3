import { ResponsiveContainer, Tooltip, AreaChart, XAxis, YAxis, Legend, CartesianGrid } from 'recharts';

function EntryChart() {
  const { chartData, areas } = { chartData: [], areas: [] };
  return (
    <ResponsiveContainer width="98%" height={480}>
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
          // itemSorter={(a: any, b: any) => b.value - a.value}
          content={(props: any) => (
            <span>EntryTrendChartTooltipContent</span>
            // <EntryTrendChartTooltipContent
            //   {...props}
            //   filter={(data: TooltipPayload) => {
            //     if (data.name === '_barLow' || data.name === '_barHigh' || data.value === 0) {
            //       return false;
            //     }
            //     return true;
            //   }}
            // />
          )}
        />
        <CartesianGrid strokeDasharray="3 3" />
        {areas}
      </AreaChart>
    </ResponsiveContainer>
  );
}
export default EntryChart;
