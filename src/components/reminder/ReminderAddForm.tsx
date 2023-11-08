import { createReminder } from '@/app/reminder-records-slice';
import { selectReminderRecordArray, useAppDispatch, useAppSelector } from '@/app/store';
import { ReminderConstructor, ReminderRecord, ReminderType } from '@/app/types-constants';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import _ from 'lodash-es';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '../button';
import Segmented from '../segmented';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

const FormSchema = z.object({
  title: z.string().trim().min(1, { message: 'This field cannot be empty. Please fill it in.' }),
  content: z.string().optional(),
  type: z.nativeEnum(ReminderType), // ReminderType
});

const options = [
  { value: ReminderType.weekly },
  { value: ReminderType.monthly },
  { value: ReminderType.annual },
  { value: ReminderType.since },
];
export default function ReminderAddForm() {
  const [type, setType] = useState<ReminderType>(ReminderType.weekly);
  const [weekOpt, setWeekOpt] = useState<number>(0);
  const dispatch = useAppDispatch();
  const updatingReminderId = useAppSelector((state) => state.uiState.addPage.updatingReminderId);
  const reminderRecords = useAppSelector(selectReminderRecordArray);
  const updatingReminder = useMemo(
    () => reminderRecords.find((reminder) => reminder.id === updatingReminderId),
    [reminderRecords, updatingReminderId],
  );
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: updatingReminder?.title ?? '',
      // type: updatingReminder?.type ?? ReminderType.weekly,
    },
  });
  console.log({ updatingReminderId, updatingReminder, form });

  useEffect(() => {
    if (!updatingReminderId || !updatingReminder) return;
    form.setValue('title', updatingReminder?.title ?? '');
    form.setValue('content', updatingReminder?.content);
    form.setValue('type', updatingReminder?.type ?? ReminderType.weekly);
    setWeekOpt(updatingReminder?.weekDay ?? 0);
  }, [form, updatingReminder, updatingReminderId]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const submitData: ReminderRecord = ReminderConstructor({
      ...data,
      weekDay: data?.type === ReminderType.weekly ? weekOpt : undefined,
    });
    dispatch(createReminder(submitData));
  }

  const renderPushConfig = useCallback(() => {
    if (form.getValues('type') === ReminderType.weekly) {
      const weekOpts = _.range(0, 7).map((value) => ({
        label: dayjs().day(value).format('ddd'),
        value,
      }));
      return (
        <div>
          <FormItem>
            <FormLabel>Week Day</FormLabel>
            <FormControl>
              <Segmented
                className="bg-background"
                onChange={(value) => {
                  setWeekOpt(value as number);
                }}
                options={weekOpts}
              />
            </FormControl>
            <FormDescription>Defaults to 10am + 8pm, 15 minute reminder events</FormDescription>
            <FormMessage style={{ marginTop: '.125rem' }} />
          </FormItem>
        </div>
      );
    }
  }, [form]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="text-red-500">*</span>Title
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your title here" {...field} />
              </FormControl>
              <FormMessage style={{ marginTop: '.125rem' }} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Input placeholder="Enter your content here" {...field} />
              </FormControl>
              <FormMessage style={{ marginTop: '.125rem' }} />
            </FormItem>
          )}
        />
        <div className="flex flex-wrap items-start gap-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Segmented className="bg-background" options={options} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          {renderPushConfig()}
        </div>
        <div className="mt-2 flex items-center justify-center">
          <Button type="primary" size="large" htmlType="submit">
            Submit
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
