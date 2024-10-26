import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { WebsiteForm } from './WebsiteForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Website } from '@clients/supabase/types';
import { createNewWebsite, uploadFile, BUCKETS_URL, editWebsite } from '@clients/supabase';
import z from 'zod';
import { useToast } from '@/components/hooks/useToast';
import { formSchema } from '../../../utils/websiteForm';
import { useMemo } from 'react';
import { WizardModes } from './constants';
import { AxiosError } from 'axios';
import { useRevalidator } from 'react-router-dom';

type WebsiteWizardProps = {
  website: Website | undefined;
  isOpen: boolean;
  onChangeOpen: (isOpen: boolean) => void;
  categories: string[];
};

export default function WebsiteWizard({ website = undefined, isOpen, onChangeOpen, categories }: WebsiteWizardProps) {
  const mode = useMemo(() => (website ? WizardModes.Edit : WizardModes.Create), [website]);

  const { revalidate } = useRevalidator();

  const queryClient = useQueryClient();

  const { toast } = useToast();

  const handleFormSubmit = async (formData: z.infer<typeof formSchema>) => {
    let iconUrl;

    if (formData.icon) {
      const { data, error } = await uploadFile(formData.icon);
      iconUrl = !error ? `${BUCKETS_URL}/${data?.fullPath}` : undefined;
    }

    if (website) {
      editSite({ ...formData, id: website.id, list_id: 1, icon: iconUrl || website.icon });
    } else {
      createWebsite({ ...formData, icon: iconUrl, list_id: 1 });
    }
  };

  const { mutate: createWebsite, isLoading: isCreateSiteLoading } = useMutation({
    mutationFn: (data: Website) => createNewWebsite({ ...data }),
    onSuccess: async () => {
      toast({
        title: 'Website added successfully',
        variant: 'success',
      });
      await queryClient.removeQueries({ queryKey: ['websites', website?.list_id] });
      revalidate();
    },
    onError: (error: AxiosError) => {
      toast({
        title: `An error occurred: ${error.response?.data!.message}`,
        variant: 'destructive',
      });
    },
  });

  const { mutate: editSite, isLoading: isEditSiteLoading } = useMutation({
    mutationFn: (data: Website) => editWebsite({ ...data }),
    onSuccess: async () => {
      toast({
        title: 'Website edited successfully',
        variant: 'success',
      });
      await queryClient.removeQueries({ queryKey: ['websites', website?.list_id] });
      revalidate();
      onChangeOpen(false);
    },
    onError: (error: AxiosError) => {
      toast({
        title: `An error occurred: ${error.response?.data!.message}`,
        variant: 'destructive',
      });
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onChangeOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === WizardModes.Create ? 'Add a new site to your list' : `Edit ${website?.name}`}
          </DialogTitle>
        </DialogHeader>
        <WebsiteForm
          website={website}
          categories={categories}
          onSubmit={handleFormSubmit}
          onClose={() => onChangeOpen(false)}
          isLoading={mode === WizardModes.Create ? isCreateSiteLoading : isEditSiteLoading}
          mode={mode}
        />
      </DialogContent>
    </Dialog>
  );
}
