import { selectReminderRecordArray, useAppSelector } from '@/app/store';
import ReminderRecordCard from './ReminderRecordCard';

export default function ReminderRecords() {
  const reminderRecords = useAppSelector(selectReminderRecordArray);

  return (
    <div className="flex flex-col gap-2">
      {reminderRecords.map((record) => (
        <ReminderRecordCard key={record.id} record={record} />
      ))}
    </div>
  );
}
