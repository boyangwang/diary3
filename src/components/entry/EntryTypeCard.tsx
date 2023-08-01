import dayjs from 'dayjs';
import { deleteEntryType } from '../../app/entry-types-slice';
import { useAppDispatch } from '../../app/store';
import { EntryType, formatEntryCardDate } from '../../app/types-constants';
import { enterEntryTypeEdit } from '../../app/ui-slice';
import Button from '../button';
import { CheckIcon } from '../misc/DiaryIcons';
import EntryTypeCompletionForm from './EntryTypeCompletionForm';
import clsx from 'clsx';

const EntryTypeCardDeleteButton = (props: { entryType: EntryType }) => {
  const dispatch = useAppDispatch();

  return (
    <Button
      danger
      ghost
      onClick={() => {
        dispatch(deleteEntryType(props.entryType.id));
      }}
    >
      Delete
    </Button>
  );
};

const EntryTypeCardUpdateButton = (props: { entryType: EntryType }) => {
  const dispatch = useAppDispatch();

  return (
    <Button type="primary" ghost onClick={() => dispatch(enterEntryTypeEdit({ entryTypeId: props.entryType.id }))}>
      Update
    </Button>
  );
};

const EntryTypeCard = (props: { entryType: EntryType; isEdit: boolean }) => {
  const { entryType, isEdit } = props;
  const { title, routine, themeColors, createdAt, updatedAt, pointStep, defaultPoints } = entryType;
  return isEdit ? (
    <div
      className="flex flex-col items-center gap-3 rounded-lg p-2 text-white"
      style={{ background: `linear-gradient(90deg, #${themeColors[0]} 0%, #${themeColors[1]} 100%)` }}
    >
      <div className="flex items-center gap-1.5 text-xl font-medium">{title} </div>
      <div className="flex flex-col items-center gap-2">
        <EntryTypeCardUpdateButton entryType={entryType} />
        <EntryTypeCardDeleteButton entryType={entryType} />
      </div>
    </div>
  ) : (
    <div
      className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-white"
      style={{ background: `linear-gradient(90deg, #${themeColors[0]} 0%, #${themeColors[1]} 100%)` }}
    >
      <div className="flex h-full w-10 items-center justify-center">
        <CheckIcon className="text-xl" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-xl font-medium">
          {title} <div className="rounded border border-white bg-white/25 p-1 font-DDin text-xs font-bold">{routine}</div>
        </div>

        <div>
          {formatEntryCardDate(createdAt)} - {formatEntryCardDate(updatedAt)}
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 font-DDin font-bold">
        <p>defaultPoints {defaultPoints} </p>
        <p>pointStep {pointStep}</p>
      </div>
      <EntryTypeCompletionForm entryType={props.entryType} />
    </div>
  );
};

export default EntryTypeCard;
