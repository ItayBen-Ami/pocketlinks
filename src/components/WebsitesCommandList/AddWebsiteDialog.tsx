import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CirclePlus, CommandIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { formSchema } from '../../utils/websiteForm';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

type AddWebsiteDialogProps = {
  isOpen: boolean;
  handleChangeOpen: (isOpen: boolean) => void;
};

export function AddWebsiteForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      url: '',
      image: '',
      category: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormDescription>The name for your link</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Category" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="url"
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
          name="image"
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
          <Button variant="secondary">Close</Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}

export default function AddWebsiteDialog({ isOpen, handleChangeOpen }: AddWebsiteDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={handleChangeOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" onClick={() => handleChangeOpen(true)}>
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <CirclePlus className="text-green-500" />
              <div>Add Link</div>
            </div>
            <div className="flex items-center gap-0.5">
              <Badge variant="secondary" className="py-1">
                <CommandIcon className="size-3" />
              </Badge>
              <Badge variant="secondary" className="px-3">
                A
              </Badge>
            </div>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add link</DialogTitle>
        </DialogHeader>
        <AddWebsiteForm />
      </DialogContent>
    </Dialog>
  );
}
