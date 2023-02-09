import { selectEntryTypeIds, selectEntryTypesArray, useAppSelector } from '../app/store';
import EntryTypeForm from '../components/EntryTypeForm';
import StreaksTable from '../components/StreaksTable';
import { RoutineEnum } from '../app/types-constants';

export default function AddPage() {
  const entryTypesArray = useAppSelector(selectEntryTypesArray);
  const entryTypeIds = useAppSelector(selectEntryTypeIds);

  return (
    <>
      <EntryTypeForm isUpdate={false} entryTypeIds={entryTypeIds} />
      <StreaksTable entryTypesArray={entryTypesArray} routine={RoutineEnum.daily} />
      <StreaksTable entryTypesArray={entryTypesArray} routine={RoutineEnum.weekly} />
      <StreaksTable entryTypesArray={entryTypesArray} routine={RoutineEnum.monthly} />
      <StreaksTable entryTypesArray={entryTypesArray} routine={RoutineEnum.adhoc} />
    </>
  );
}
