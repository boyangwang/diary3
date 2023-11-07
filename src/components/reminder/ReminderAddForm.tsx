import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import Button from '../button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { ReminderType } from '@/app/types-constants';

const FormSchema = z.object({
  title: z.string().trim().min(1, { message: 'This field cannot be empty. Please fill it in.' }),
  content: z.string().optional(),
  type: z.nativeEnum(ReminderType), // ReminderType
});

export default function ReminderAddForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log({ data });
    toast.success('Add Success');
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
                <Input {...field} />
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
