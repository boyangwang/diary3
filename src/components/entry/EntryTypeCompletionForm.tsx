import { useForm } from 'react-hook-form';
import { createEntryInstance } from '../../app/entry-instances-slice';
import { useAppDispatch } from '../../app/store';
import { EntryType, formatDatetime, formatInstanceDate, getEntryInstanceIdFromEntryType } from '../../app/types-constants';
import Button from '../button';
import { CheckIcon } from '../misc/DiaryIcons';
import dayjs from 'dayjs';

function EntryTypeCompletionForm(props: { entryType: EntryType; selectedDayStr?: string }) {
  const { selectedDayStr } = props;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { points: props.entryType.defaultPoints, notes: '' },
  });
  const dispatch = useAppDispatch();

  const onSubmit = (values: any) => {
    const selectedDay = selectedDayStr ? dayjs(selectedDayStr) : dayjs();
    const [y, m, d] = [selectedDay.year(), selectedDay.month(), selectedDay.date()];
    const now = dayjs().year(y).month(m).date(d);
    console.log(
      'Completion Form Values: ',
      values,
      selectedDay.format('YYYY/MM/DD HH:mm:ss'),
      now.format('YYYY/MM/DD HH:mm:ss'),
    );

    dispatch(
      createEntryInstance({
        id: getEntryInstanceIdFromEntryType(props.entryType, now),
        createdAt: now.valueOf(),
        updatedAt: now.valueOf(),
        entryTypeId: props.entryType.id,
        points: values.points,
        notes: values.notes,
      }),
    );
    setValue('points', props.entryType.defaultPoints);
    setValue('notes', '');
  };

  return (
    <form className="flex flex-wrap items-center gap-2" onSubmit={handleSubmit(onSubmit)}>
      <label className="flex flex-wrap items-center gap-2">
        Notes
        <textarea className="h-12 border bg-transparent p-2" {...register('notes')} rows={3} />
      </label>
      <label className="flex flex-wrap items-center gap-2">
        Points
        <input
          className="border bg-transparent p-2"
          type="number"
          step={props.entryType.pointStep}
          {...register('points', { required: 'points is required' })}
        />
        {errors?.points && <span className="text-red-500">{errors.points.message}</span>}
      </label>
      <Button htmlType="submit" type="unstyle" className="absolute inset-y-0 left-4 flex w-10 items-center justify-center">
        <CheckIcon className="text-xl" />
      </Button>
    </form>
  );
}

export default EntryTypeCompletionForm;
