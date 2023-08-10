import { formatDate } from '@/utils/date';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';
import { deleteEntryType } from '../../app/entry-types-slice';
import { useAppDispatch } from '../../app/store';
import { EntryType } from '../../app/types-constants';
import { enterEntryTypeEdit } from '../../app/ui-slice';
import Button from '../button';
import { CheckIcon } from '../icon/DiaryIcons';
import EntryTypeCompletionForm from './EntryTypeCompletionForm';
import { deleteEntryInstanceByEntryTypeId } from '@/app/entry-instances-slice';

const EntryTypeCardDeleteButton = (props: { entryType: EntryType }) => {
  const dispatch = useAppDispatch();

  return (
    <Button
      danger
      ghost
      size="small"
      className="rounded-lg"
      onClick={() => {
        dispatch(deleteEntryType(props.entryType.id));
        dispatch(deleteEntryInstanceByEntryTypeId(props.entryType.id));
      }}
    >
      <AiFillDelete className="h-full w-6" />
    </Button>
  );
};

const EntryTypeCardEditButton = (props: { entryType: EntryType }) => {
  const dispatch = useAppDispatch();

  return (
    <Button
      size="small"
      className="rounded-lg"
      type="primary"
      ghost
      onClick={() => dispatch(enterEntryTypeEdit({ entryTypeId: props.entryType.id }))}
    >
      <AiFillEdit className="h-full w-6" />
    </Button>
  );
};

const EntryTypeCard = (props: { entryType: EntryType; isEdit: boolean; className?: string; selectedDayStr?: string }) => {
  const { entryType, isEdit, className, selectedDayStr } = props;
  const { title, routine, themeColors, createdAt, updatedAt, pointStep, defaultPoints } = entryType;
  return isEdit ? (
    <div className={twMerge('flex justify-between gap-2 bg-white text-white', className)}>
      <div
        className="flex flex-grow items-center gap-1.5 rounded-lg px-2"
        style={{ background: `linear-gradient(90deg, #${themeColors[0]} 0%, #${themeColors[1]} 100%)` }}
      >
        <div className="flex flex-col">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold">{title}</div>
          <p className="text-xs">{formatDate(createdAt)}</p>
        </div>
        <div className="flex flex-grow flex-col items-center justify-center whitespace-nowrap text-xs">
          <p className="flex items-center gap-1">
            points <span className="font-DDin text-base/5 font-bold">{defaultPoints}</span>
          </p>
          {pointStep ? (
            <p className="flex items-center gap-1">
              pointStep <span className="font-DDin text-base/5 font-bold">{pointStep}</span>
            </p>
          ) : null}
        </div>
      </div>
      <div className="flex gap-2">
        <EntryTypeCardEditButton entryType={entryType} />
        <EntryTypeCardDeleteButton entryType={entryType} />
      </div>
    </div>
  ) : (
    <div
      className={twMerge('relative flex flex-wrap items-center gap-3 rounded-lg px-4 py-2 text-white', className)}
      style={{ background: `linear-gradient(90deg, #${themeColors[0]} 0%, #${themeColors[1]} 100%)` }}
    >
      <div className="flex w-10 items-center justify-center">
        <CheckIcon className="text-xl opacity-0" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-xl font-medium">
          {title} <div className="rounded border border-white bg-white/25 p-1 font-DDin text-xs font-bold">{routine}</div>
        </div>

        <div>
          {formatDate(createdAt)} - {formatDate(updatedAt)}
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 font-DDin font-bold">
        <p>defaultPoints {defaultPoints} </p>
        {pointStep ? <p>pointStep {pointStep}</p> : null}
      </div>
      <EntryTypeCompletionForm entryType={props.entryType} selectedDayStr={selectedDayStr} />
    </div>
  );
};

export default EntryTypeCard;
