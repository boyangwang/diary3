import { deleteReminder } from '@/app/reminder-records-slice';
import { useAppDispatch } from '@/app/store';
import { enterReminderEdit } from '@/app/ui-slice';
import { formatDate } from '@/utils/date';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { BiSolidBellRing } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';
import { ReminderRecord } from '../../app/types-constants';
import Button from '../button';

export type EntryTypeCardProps = {
  record: ReminderRecord;
  className?: string;
};
const ReminderRecordCard = (props: EntryTypeCardProps) => {
  const dispatch = useAppDispatch();
  const { record, className } = props;
  const { id, title, content, type, createdAt, updatedAt } = record;
  return (
    <div className={twMerge('relative flex flex-wrap items-center gap-3 rounded-lg bg-white px-4 py-2', className)}>
      <div className="flex aspect-square w-8 items-center justify-center rounded-full bg-blue text-white">
        <BiSolidBellRing />
      </div>
      <div className="flex flex-grow flex-col gap-1">
        <div className="flex items-center gap-1.5 text-xl font-medium">
          {title}
          <div className="rounded border border-white bg-white/25 p-1 font-DDin text-xs font-bold">{type}</div>
        </div>
        <p>{content}</p>
      </div>
      <div className="flex justify-between gap-3 text-left text-sm">
        <div className="flex flex-col">
          <p className="opacity-60">Create at</p>
          <p>{formatDate(createdAt)} </p>
        </div>
        <div className="flex flex-col">
          <p className="opacity-60">Update at</p>
          <p>{formatDate(updatedAt)} </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          size="small"
          className="rounded-lg"
          type="primary"
          ghost
          onClick={() => dispatch(enterReminderEdit({ reminderId: id }))}
        >
          <AiFillEdit className="h-full w-6" />
        </Button>
        <Button
          danger
          ghost
          size="small"
          className="rounded-lg"
          onClick={() => {
            dispatch(deleteReminder(id));
          }}
        >
          <AiFillDelete className="h-full w-6" />
        </Button>
      </div>
    </div>
  );
};

export default ReminderRecordCard;
