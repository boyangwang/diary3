import { EntryInstance } from '@/app/types-constants';
import EntryInstanceForm from './EntryInstanceForm';

const EntryInstanceList = ({ entryInstancesArray }: { entryInstancesArray: EntryInstance[] }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      {entryInstancesArray?.length
        ? entryInstancesArray.map((item) => <EntryInstanceForm key={item.id} entryInstance={item} />)
        : null}
    </div>
  );
};

export default EntryInstanceList;
