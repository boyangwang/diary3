import Button from '@/components/button';
import ReminderAddForm from '@/components/reminder/ReminderAddForm';
import ReminderRecords from '@/components/reminder/ReminderRecords';
import { downloadICSFile } from '@/utils/notification';

export default function ReminderPage() {
  return (
    <div className="flex h-full flex-col gap-4 overflow-auto px-4 py-6">
      <h1 className="text-center font-DDin text-2xl font-bold">Add Reminder</h1>
      <Button
        type="primary"
        onClick={() =>
          downloadICSFile({
            title: 'My Event',
            description: 'This is a description of the event.',
            start: '2023-11-08T10:00:00.000Z',
            end: '2023-11-08T12:00:00.000Z',
          })
        }
      >
        Test
      </Button>
      <ReminderAddForm />
      <ReminderRecords />
    </div>
  );
}
