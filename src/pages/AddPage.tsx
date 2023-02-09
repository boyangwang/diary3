import { selectEntryTypeIds, selectEntryTypesArray, useAppSelector } from '../app/store';
import EntryTypeForm from '../components/EntryTypeForm';
import StreaksTable from '../components/StreaksTable';
import { RoutineEnum } from '../app/types-constants';

export default function AddPage() {
  const entryTypesArray = useAppSelector(selectEntryTypesArray);
  const entryTypeIds = useAppSelector(selectEntryTypeIds);
  const isUpdate = useAppSelector((state) => state.uiState.addPage.isEntryTypeUpdating);
  const updatingEntryTypeId = useAppSelector((state) => state.uiState.addPage.updatingEntryTypeId);
  const updatingEntryType =
    isUpdate && updatingEntryTypeId ? entryTypesArray.find((entryType) => entryType.id === updatingEntryTypeId) : null;

  return (
    <>
      <EntryTypeForm isUpdate={isUpdate} updatingEntryType={updatingEntryType} entryTypeIds={entryTypeIds} />
      <StreaksTable entryTypesArray={entryTypesArray} routine={RoutineEnum.daily} />
      <StreaksTable entryTypesArray={entryTypesArray} routine={RoutineEnum.weekly} />
      <StreaksTable entryTypesArray={entryTypesArray} routine={RoutineEnum.monthly} />
      <StreaksTable entryTypesArray={entryTypesArray} routine={RoutineEnum.adhoc} />
    </>
  );
}
