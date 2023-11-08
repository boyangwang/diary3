import { createReminder } from '@/app/reminder-records-slice';
import { useAppDispatch } from '@/app/store';
import { ReminderConstructor, ReminderRecord, ReminderType } from '@/app/types-constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '../button';
import Segmented from '../segmented';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
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
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      type: ReminderType.weekly,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const submitData: ReminderRecord = ReminderConstructor(data);
    console.log({ data, submitData });
    dispatch(createReminder(submitData));
  }
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
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Segmented
                  className="bg-background"
                  onChange={(value) => {
                    setType(value as ReminderType);
                    field.onChange(value);
                  }}
                  options={options}
                />
              </FormControl>
              <FormMessage style={{ marginTop: '.125rem' }} />
            </FormItem>
          )}
        />
        <div className="mt-2 flex items-center justify-center">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
