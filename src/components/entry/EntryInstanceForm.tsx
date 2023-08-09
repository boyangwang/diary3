import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { deleteEntryInstance, updateEntryInstance } from '../../app/entry-instances-slice';
import { useAppDispatch } from '../../app/store';
import { EntryInstance } from '../../app/types-constants';
import Button from '../button';
import dayjs from 'dayjs';
import { InputNumber } from 'antd';
import { formatDateTime } from '@/utils/date';

const EntryInstanceForm = ({ entryInstance }: { entryInstance: EntryInstance }) => {
  const dispatch = useAppDispatch();
  const { id, points, notes, entryTypeId, createdAt, updatedAt } = entryInstance;

  console.log('=======entryInstance', entryInstance);
  const { register, handleSubmit, control } = useForm();
  const onSubmit = useCallback(
    (data: any) => {
      console.log('=======onSubmit data', data);
      const points = data?.points ? parseFloat(data.points) : entryInstance.points;
      const notes = data?.notes ?? entryInstance.notes;
      const newEntryInstance = { ...entryInstance, points, notes, updatedAt: dayjs().valueOf() };
      console.log('=======newEntryInstance ', newEntryInstance);
      dispatch(updateEntryInstance(newEntryInstance));
    },
    [dispatch, entryInstance],
  );
  const onError = useCallback((errors: any) => {
    console.error('=======onError', errors);
  }, []);
  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="flex gap-4 rounded-lg border border-black/50 p-2 text-xs md:flex-wrap"
      key={id}
    >
      <div className="flex flex-col items-center gap-1">
        ID<div>{id}</div>
      </div>
      <div className="flex flex-col items-center gap-1">
        entryTypeId
        <div className="rounded-lg border border-black p-1"> {entryTypeId}</div>
      </div>
      <div className="flex flex-col items-center gap-1">
        points
        <Controller
          name="points"
          control={control}
          rules={{ required: 'points is required' }}
          defaultValue={points}
          render={({ field }) => (
            <InputNumber className="w-16 border bg-transparent font-DDin text-xl font-bold" type="number" {...field} />
          )}
        />
      </div>
      <div className="flex  flex-col items-center gap-1">
        notes
        <textarea placeholder="Empty Note" defaultValue={notes} {...register('notes')} />
      </div>
      <div className="flex flex-col items-center gap-1">
        createdAt
        <div>{formatDateTime(createdAt)}</div>
      </div>
      <div className="flex flex-col items-center gap-1">
        updatedAt
        <div>{formatDateTime(updatedAt)}</div>
      </div>
      <Button type="primary" htmlType="submit">
        Update
      </Button>
      <Button
        type="primary"
        danger
        onClick={() => {
          dispatch(deleteEntryInstance(entryInstance));
        }}
      >
        Delete
      </Button>
    </form>
  );
};

export default EntryInstanceForm;
