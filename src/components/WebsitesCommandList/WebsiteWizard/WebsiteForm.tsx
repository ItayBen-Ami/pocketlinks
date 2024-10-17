import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { formSchema } from '../../../utils/websiteForm';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Combobox from '@/components/ui/combobox';
import { SyntheticEvent, useMemo, useState } from 'react';
import Dropzone from '../../Dropzone';
import { Link } from 'lucide-react';
import { Website } from '@clients/supabase/types';
import { WizardModes } from './constants';

type WebsiteFormProps = {
  website: Website | undefined;
  categories: string[];
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  isLoading: boolean;
  onClose: () => void;
  mode: WizardModes;
};

export function WebsiteForm({ website, categories, onSubmit, isLoading, onClose, mode }: WebsiteFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: website?.name || '',
      url: website?.url || '',
      category: website?.category || '',
    },
  });

  const initialCategoryOptions = useMemo(
    () => categories.map(category => ({ label: category, value: category })),
    [categories],
  );

  const handleClose = (e: SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };

  const [categoryOptions, setCategoryOptions] = useState(initialCategoryOptions);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="name"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Site Name</FormLabel>
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
        <div className="gap-2 flex flex-col">
          <FormField
            control={form.control}
            name="url"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <div className="flex gap-2 items-center">
                    Site URL <Link className="size-3.5" />
                  </div>
                </FormLabel>
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
                <FormLabel>
                  <span>Upload a site icon</span>
                  <span className="italic"> (optional)</span>
                </FormLabel>
                <FormControl>
                  <Dropzone file={field.value} onImageDrop={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormMessage />
        <div className="flex justify-around gap-2 mt-4">
          <Button variant="secondary" disabled={isLoading} onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" disabled={isLoading}>
            {mode === WizardModes.Create ? 'Create' : 'Edit'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
