import ReminderAddForm from '@/components/reminder/ReminderAddForm';
import ReminderRecords from '@/components/reminder/ReminderRecords';

export default function ReminderPage() {
  return (
    <div className="flex h-full flex-col gap-4 overflow-auto px-4 py-6">
      <h1 className="text-center font-DDin text-2xl font-bold">Add Reminder</h1>
      <ReminderAddForm />
      <ReminderRecords />
    </div>
  );
}
