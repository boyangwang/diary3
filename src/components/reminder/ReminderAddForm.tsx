import { createReminder } from '@/app/reminder-records-slice';
import { selectReminderRecordArray, useAppDispatch, useAppSelector } from '@/app/store';
import { ReminderConstructor, ReminderRecord, ReminderType } from '@/app/types-constants';
import { exitReminderEdit } from '@/app/ui-slice';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddToCalendarButton } from 'add-to-calendar-button-react';
import dayjs from 'dayjs';
import _ from 'lodash-es';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '../button';
import Segmented from '../segmented';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';

const FormSchema = z.object({
  title: z.string().trim().min(1, { message: 'This field cannot be empty. Please fill it in.' }),
  content: z.string().optional(),
  type: z.nativeEnum(ReminderType), // ReminderType
  isSendReminderEmail: z.boolean().optional(),
});

const options = [
  { value: ReminderType.weekly },
  { value: ReminderType.monthly },
  { value: ReminderType.annual },
  { value: ReminderType.since },
];
export default function ReminderAddForm() {
  const [weekOpt, setWeekOpt] = useState<number>(0);
  const [monthDayOpt, setMonthDayOpt] = useState<number>(0);
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
      content: updatingReminder?.content ?? '',
      type: updatingReminder?.type ?? ReminderType.weekly,
      isSendReminderEmail: updatingReminder?.isSendReminderEmail ?? false,
    },
  });

  useEffect(() => {
    if (!updatingReminderId || !updatingReminder) return;
    form.setValue('title', updatingReminder?.title ?? '');
    form.setValue('content', updatingReminder?.content);
    form.setValue('type', updatingReminder?.type ?? ReminderType.weekly);
    if (updatingReminder?.isSendReminderEmail) form.setValue('isSendReminderEmail', true);
    else form.setValue('isSendReminderEmail', false);
    setWeekOpt(updatingReminder?.weekDay ?? 0);
    setMonthDayOpt(updatingReminder?.monthDay ?? 0);
  }, [form, updatingReminder, updatingReminderId]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const submitData: ReminderRecord = ReminderConstructor({
      ...data,
      weekDay: data?.type === ReminderType.weekly ? weekOpt : undefined,
      monthDay: data?.type === ReminderType.monthly ? monthDayOpt : undefined,
    });
    dispatch(createReminder(submitData));
  }

  const renderPushConfig = useCallback(() => {
    const type = form.getValues('type');
    const weekOpts = _.range(0, 7).map((value) => ({
      label: dayjs().day(value).format('ddd'),
      value,
    }));
    const monthDayOpts = _.range(0, 31).map((value) => ({
      label: (value + 1).toString(),
      value,
    }));
    return (
      <>
        {type === ReminderType.weekly && (
          <FormItem>
            <FormLabel>Week Day</FormLabel>
            <FormControl>
              <Segmented
                className="bg-background"
                value={weekOpt}
                onChange={(value) => {
                  setWeekOpt(value as number);
                }}
                options={weekOpts}
              />
            </FormControl>
            <FormDescription>Defaults to 10am + 8pm, 15 minute reminder events</FormDescription>
          </FormItem>
        )}
        {type === ReminderType.monthly && (
          <FormItem>
            <FormLabel>Month Day</FormLabel>
            <FormControl>
              <Segmented
                className="flex-wrap bg-background"
                optionClass="w-10"
                value={monthDayOpt}
                onChange={(value) => {
                  setMonthDayOpt(value as number);
                }}
                options={monthDayOpts}
              />
            </FormControl>
          </FormItem>
        )}
        <FormField
          control={form.control}
          name="isSendReminderEmail"
          render={({ field }) => (
            <FormItem className="mt-2 flex flex-col">
              <FormLabel className="leading-5">Send Reminder Email</FormLabel>
              <FormControl className="mt-2">
                <Switch disabled checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
      </>
    );
  }, [form, monthDayOpt, weekOpt]);

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
        <div className="mt-2 flex items-center justify-center gap-2">
          {updatingReminderId !== null ? (
            <Button size="large" className="rounded-full" htmlType="button" onClick={() => dispatch(exitReminderEdit())}>
              Cancel
            </Button>
          ) : null}
          <Button type="primary" size="large" className="rounded-full" htmlType="submit">
            {updatingReminderId !== null ? 'Update' : 'Submit'}
          </Button>
          <AddToCalendarButton
            name={form.getValues('title')}
            description={form.getValues('content')}
            startDate="2023-11-9"
            endDate="2023-11-9"
            startTime="10:15"
            endTime="23:30"
            recurrence="weekly"
            recurrence_interval={1}
            // recurrence_byDay="MO"
            // recurrence_byMonth="1,2,3,4"
            // recurrence_byMonthDay="4,5"
            buttonStyle="round"
            options={['Apple', 'Google', 'iCal', 'Microsoft365', 'MicrosoftTeams', 'Outlook.com', 'Yahoo']}
            hideCheckmark
            size="5"
          />
        </div>
      </form>
    </FormProvider>
  );
}
