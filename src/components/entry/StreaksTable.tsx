import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EntryType, RoutineEnum } from '../../app/types-constants';
import EntryTypeCard from './EntryTypeCard';
import { Fragment, useMemo } from 'react';
import _ from 'lodash-es';
import clsx from 'clsx';

interface EntryTypeOnStreaksTable extends EntryType {
  [key: string]: any;
}

// const columns: ColumnsType<EntryTypeOnStreaksTable> = [
//   {
//     title: 'EntryType',

//     key: 'EntryType',
//     fixed: 'left',
//     render: (item) => <EntryTypeCard entryType={item} isEdit />,
//   },
//   {
//     title: 'Column 1',
//     key: '1',
//     render: () => <div className="bg-green-500" />,
//   },
//   {
//     title: 'Column 2',
//     key: '2',
//     render: () => <div className="bg-green-500" />,
//   },
//   {
//     title: 'Column 3',
//     key: '3',
//     render: () => <div className="bg-green-500" />,
//   },
//   {
//     title: 'Column 4',
//     key: '4',
//     render: () => (
//       <div>
//         <p>{Math.random() > 0.5 ? 'YES' : 'NO'}</p>
//       </div>
//     ),
//   },
//   {
//     title: 'Column 5',
//     key: '5',

//     render: () => (
//       <div>
//         <p>{Math.random() > 0.5 ? 'YES' : 'NO'}</p>
//       </div>
//     ),
//   },
//   {
//     title: 'Column 6',
//     key: '6',

//     render: () => (
//       <div>
//         <p>YES</p>
//       </div>
//     ),
//   },
//   {
//     title: 'Column 7',
//     key: '7',
//     render: () => (
//       <div>
//         <p>YES</p>
//       </div>
//     ),
//   },
//   {
//     title: 'Column 8',
//     key: '8',
//     render: () => (
//       <div>
//         <p>YES</p>
//       </div>
//     ),
//   },
//   {
//     title: 'Streaks',
//     key: 'streaks',
//     fixed: 'right',
//     render: () => (
//       <div className="text-xs">
//         <p>Current: 3 days</p>
//         <p>Historical: 10 days</p>
//       </div>
//     ),
//   },
// ];
const tempColor = ['bg-green-500', 'bg-red-500'];
function StreaksTable(props: { entryTypesArray: EntryType[]; routine: RoutineEnum }) {
  const scrollY = {
    [RoutineEnum.daily]: 400,
    [RoutineEnum.adhoc]: 400,
    [RoutineEnum.weekly]: 400,
    [RoutineEnum.monthly]: 400,
  };
  const { routine, entryTypesArray } = props;
  const filterEntryTypes = useMemo(() => entryTypesArray.filter((item) => item.routine === routine), []);
  return (
    <>
      <h2>{`${routine} Streaks Table`}</h2>
      <div className="flex w-full gap-1">
        <div className="mt-7 flex flex-col items-center gap-1">
          {filterEntryTypes.map((item) => (
            <div
              className="flex h-6 w-[5rem] items-center overflow-hidden text-ellipsis whitespace-nowrap text-xs"
              key={item.id}
            >
              {item.title}
            </div>
          ))}
        </div>
        <div className="flex w-full flex-col gap-1 overflow-auto">
          {filterEntryTypes.map((item, idx) => (
            <Fragment key={item.id}>
              {idx === 0 && (
                <div className="flex w-fit gap-1 overflow-auto">
                  {_.range(30).map((v) => (
                    <div key={`header${v}`} className="h-6 w-9">
                      {v}
                    </div>
                  ))}
                </div>
              )}
              <div className="flex w-fit gap-1 overflow-auto">
                {_.range(30).map((v) => (
                  <div key={v} className={clsx('h-6 w-9', tempColor[_.random(0, 1)])} />
                ))}
              </div>
            </Fragment>
          ))}
        </div>
        <div className="mt-7 flex flex-col items-center gap-1">
          {filterEntryTypes.map((item) => (
            <div className="h-6 w-6 text-xs" key={item.id}>
              6
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default StreaksTable;
