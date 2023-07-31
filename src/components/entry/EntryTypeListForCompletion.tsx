import { EntryType } from '../../app/types-constants';
import EntryTypeCard from './EntryTypeCard';

const EntryTypeListForCompletion = (props: { entryTypesArray: EntryType[] }) => {
  const { entryTypesArray } = props;
  return (
    <div className="flex flex-col gap-2">
      {entryTypesArray?.length
        ? entryTypesArray.map((item) => <EntryTypeCard key={item.id} entryType={item} isEdit={false} />)
        : null}
    </div>
  );
};

export default EntryTypeListForCompletion;
