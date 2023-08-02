import { useForm } from 'react-hook-form';
import { createEntryInstance } from '../../app/entry-instances-slice';
import { useAppDispatch } from '../../app/store';
import { EntryType, getEntryInstanceIdFromEntryType } from '../../app/types-constants';
import Button from '../button';

function EntryTypeCompletionForm(props: { entryType: EntryType }) {
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
    console.log('Completion Form Values: ', values);
    const now = Number(new Date());
    dispatch(
      createEntryInstance({
        id: getEntryInstanceIdFromEntryType(props.entryType),
        createdAt: now,
        updatedAt: now,
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
      <Button ghost htmlType="submit">
        DONE
      </Button>
    </form>
  );
}

export default EntryTypeCompletionForm;
