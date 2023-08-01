import { selectEntryTypeIds, selectEntryTypesArray, useAppSelector } from '../app/store';
import EntryTypeForm from '../components/entry/EntryTypeForm';
import StreaksTable from '../components/entry/StreaksTable';
import { RoutineEnum } from '../app/types-constants';
import EntryAllInOneTable from 'src/components/entry/EntryAllInOneTable';

export default function AddPage() {
  const entryTypesArray = useAppSelector(selectEntryTypesArray);
  const entryTypeIds = useAppSelector(selectEntryTypeIds);
  const isUpdate = useAppSelector((state) => state.uiState.addPage.isEntryTypeUpdating);
  const updatingEntryTypeId = useAppSelector((state) => state.uiState.addPage.updatingEntryTypeId);
  const updatingEntryType =
    isUpdate && updatingEntryTypeId ? entryTypesArray.find((entryType) => entryType.id === updatingEntryTypeId) : null;
  console.log({ entryTypesArray });
  return (
    <div className="flex h-full flex-col items-center gap-4 overflow-auto px-4 py-6 text-center">
      <EntryTypeForm isUpdate={isUpdate} updatingEntryType={updatingEntryType} entryTypeIds={entryTypeIds} />
      <StreaksTable entryTypesArray={entryTypesArray} routine={RoutineEnum.daily} />
      <StreaksTable entryTypesArray={entryTypesArray} routine={RoutineEnum.weekly} />
      <StreaksTable entryTypesArray={entryTypesArray} routine={RoutineEnum.monthly} />
      <StreaksTable entryTypesArray={entryTypesArray} routine={RoutineEnum.adhoc} />
      <EntryAllInOneTable />
    </div>
  );
}
