import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EntryType, RoutineEnum } from '../app/types-constants';
import EntryTypeCard from './EntryTypeCard';

interface EntryTypeOnStreaksTable extends EntryType {
  [key: string]: any;
}

const columns: ColumnsType<EntryTypeOnStreaksTable> = [
  {
    title: 'EntryType',
    width: 300,
    key: 'EntryType',
    fixed: 'left',
    render: (item) => <EntryTypeCard entryType={item} isEdit />,
  },
  {
    title: 'Column 1',
    key: '1',
    width: 100,
    render: () => (
      <div>
        <p>{Math.random() > 0.5 ? 'YES' : 'NO'}</p>
      </div>
    ),
  },
  {
    title: 'Column 2',
    key: '2',
    width: 100,
    render: () => (
      <div>
        <p>{Math.random() > 0.5 ? 'YES' : 'NO'}</p>
      </div>
    ),
  },
  {
    title: 'Column 3',
    key: '3',
    width: 100,
    render: () => (
      <div>
        <p>{Math.random() > 0.5 ? 'YES' : 'NO'}</p>
      </div>
    ),
  },
  {
    title: 'Column 4',
    key: '4',
    width: 100,
    render: () => (
      <div>
        <p>{Math.random() > 0.5 ? 'YES' : 'NO'}</p>
      </div>
    ),
  },
  {
    title: 'Column 5',
    key: '5',
    width: 100,
    render: () => (
      <div>
        <p>{Math.random() > 0.5 ? 'YES' : 'NO'}</p>
      </div>
    ),
  },
  {
    title: 'Column 6',
    key: '6',
    width: 100,
    render: () => (
      <div>
        <p>YES</p>
      </div>
    ),
  },
  {
    title: 'Column 7',
    key: '7',
    width: 100,
    render: () => (
      <div>
        <p>YES</p>
      </div>
    ),
  },
  {
    title: 'Column 8',
    key: '8',
    width: 100,
    render: () => (
      <div>
        <p>YES</p>
      </div>
    ),
  },
  {
    title: 'Streaks',
    key: 'streaks',
    fixed: 'right',
    width: 100,
    render: () => (
      <div>
        <p>Current: 3 days</p>
        <p>Historical: 10 days</p>
      </div>
    ),
  },
];

function StreaksTable(props: { entryTypesArray: EntryType[]; routine: RoutineEnum }) {
  const scrollY = {
    [RoutineEnum.daily]: 600,
    [RoutineEnum.adhoc]: 400,
    [RoutineEnum.weekly]: 400,
    [RoutineEnum.monthly]: 400,
  };

  return (
    <>
      <h2>{`${props.routine} Streaks Table`}</h2>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={props.entryTypesArray.filter((item) => item.routine === props.routine)}
        scroll={{ x: true, y: scrollY[props.routine] }}
      />
    </>
  );
}

export default StreaksTable;
