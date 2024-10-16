import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { formSchema } from '../../../utils/websiteForm';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Combobox from '@/components/ui/combobox';
import { useMemo, useState } from 'react';
import { Website } from '../../../clients/supabase/types';

type WebsiteFormProps = {
  categories: string[];
  onSubmit: (data: Website) => void;
  isLoading: boolean;
};

export function WebsiteForm({ categories, onSubmit, isLoading }: WebsiteFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      url: '',
      icon: '',
      category: '',
    },
  });

  const initialCategoryOptions = useMemo(() => categories.map(category => ({ label: category, value: category })), [categories]);

  const [categoryOptions, setCategoryOptions] = useState(initialCategoryOptions);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="name"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <div className="w-full">
                    <Combobox
                      mode="single"
                      placeholder="Select category..."
                      options={categoryOptions}
                      selected={field.value}
                      onChange={field.onChange}
                      onCreate={newOption => {
                        setCategoryOptions([...initialCategoryOptions, { label: newOption, value: newOption }]);
                        field.onChange(newOption);
                      }}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="url"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link URL</FormLabel>
              <FormControl>
                <Input placeholder="URL" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="icon"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="Image" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormMessage />
        <div className="flex justify-around gap-2 mt-8">
          <Button variant="secondary" disabled={isLoading}>
            Close
          </Button>
          <Button type="submit" disabled={isLoading}>
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}
