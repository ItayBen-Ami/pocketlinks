import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { formSchema } from '../../../utils/listForm';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';
import { SyntheticEvent } from 'react';
import Dropzone from '@components/ui/Dropzone';
import { List } from '@clients/supabase/types';
import { WizardModes } from './constants';
import { Switch } from '../../../components/ui/switch';

type ListFormProps = {
  list: List | undefined;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  isLoading: boolean;
  onClose: () => void;
  mode: WizardModes;
};

export function ListForm({ list, onSubmit, isLoading, onClose, mode }: ListFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: list?.name || '',
      is_public: list?.is_public ?? false,
    },
  });

  const handleClose = (e: SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };

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
                <FormLabel>List Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="is_public"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Access</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-1">
                    <Switch checked={field.value} onClick={() => field.onChange(!field.value)} />
                    Public
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="gap-2 flex flex-col">
          <FormField
            control={form.control}
            name="imageUrl"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span>Upload a list image</span>
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
