import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@components/ui/dialog';
import { ListForm } from './ListForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { List } from '@clients/supabase/types';
import { uploadFile, BUCKETS_URL, supabase } from '@clients/supabase';
import z from 'zod';
import { useToast } from '@components/hooks/useToast';
import { formSchema } from '../../../utils/listForm';
import { WizardModes } from './constants';
import { AxiosError } from 'axios';
import { useRevalidator } from 'react-router-dom';

type ListWizardProps = {
  list?: List | undefined;
  isOpen: boolean;
  onChangeOpen: (isOpen: boolean) => void;
};

export default function ListWizard({ list = undefined, isOpen, onChangeOpen }: ListWizardProps) {
  const mode = list ? WizardModes.Edit : WizardModes.Create;

  const { revalidate } = useRevalidator();

  const queryClient = useQueryClient();

  const { toast } = useToast();

  const handleFormSubmit = async (formData: z.infer<typeof formSchema>) => {
    let imageUrl;

    if (formData.imageUrl) {
      const { data, error } = await uploadFile(formData.imageUrl);
      imageUrl = !error ? `${BUCKETS_URL}/${data?.fullPath}` : undefined;
    }

    if (list) {
      editList({ ...formData, id: list.id, imageUrl });
    } else {
      createList({ ...formData, imageUrl: imageUrl ?? '' });
    }
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const { mutate: createList, isLoading: isCreateListLoading } = useMutation({
    mutationFn: async (data: List) => {
      const { error } = await supabase.from('lists').insert(data);
      if (error) throw error;
    },
    onSuccess: async () => {
      toast({
        title: 'List added successfully',
        variant: 'success',
      });
      await queryClient.refetchQueries({ queryKey: ['lists'] });
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const { mutate: editList, isLoading: isEditListLoading } = useMutation({
    mutationFn: async (data: List & { imageUrl: string | undefined }) => {
      const { error } = await supabase.from('lists').update(data).eq('id', data.id);
      if (error) throw error;
    },
    onSuccess: async () => {
      toast({
        title: 'List edited successfully',
        variant: 'success',
      });
      await queryClient.refetchQueries({ queryKey: ['lists'] });
      revalidate();
      onChangeOpen(false);
    },
    onError: (error: AxiosError) => {
      toast({
        title: `An error occurred: ${(error.response?.data as { message: string }).message}`,
        variant: 'destructive',
      });
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onChangeOpen}>
      <DialogContent className="sm:max-w-md" aria-description="Website wizard form">
        <DialogHeader>
          <DialogTitle>{mode === WizardModes.Create ? 'Create a new list' : `Edit ${list?.name}`}</DialogTitle>
        </DialogHeader>
        <ListForm
          list={list}
          onSubmit={handleFormSubmit}
          onClose={() => onChangeOpen(false)}
          isLoading={mode === WizardModes.Create ? isCreateListLoading : isEditListLoading}
          mode={mode}
        />
      </DialogContent>
    </Dialog>
  );
}
