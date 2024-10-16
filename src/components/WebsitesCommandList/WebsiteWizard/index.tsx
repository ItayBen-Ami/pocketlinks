import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { WebsiteForm } from './WebsiteForm';
import { useMutation } from 'react-query';
import { Website } from '../../../clients/supabase/types';
import { createNewWebsite } from '../../../clients/supabase';
import { useToast } from '@/components/hooks/useToast';

type WebsiteWizardProps = {
  isOpen: boolean;
  onChangeOpen: (isOpen: boolean) => void;
  categories: string[];
};

export default function WebsiteWizard({ isOpen, onChangeOpen, categories }: WebsiteWizardProps) {
  const { toast } = useToast();

  const { mutate: createWebsite, isLoading } = useMutation({
    mutationFn: (data: Website) => createNewWebsite({ ...data, list_id: 1 }),
    onSuccess: () => {
      toast({
        title: 'Website added successfully',
        variant: 'success',
      });
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onChangeOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a new site to your list</DialogTitle>
        </DialogHeader>
        <WebsiteForm categories={categories} onSubmit={createWebsite} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
}
