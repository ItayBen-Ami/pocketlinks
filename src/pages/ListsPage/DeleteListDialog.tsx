import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@components/ui/dialog';
import { List } from '@clients/supabase/types';
import { Button } from '@components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@clients/supabase';
import { useToast } from '@components/hooks/useToast';
import { useRevalidator } from 'react-router-dom';

type DeleteListDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  list: List | undefined;
};

export default function DeleteListDialog({ isOpen, onClose, list }: DeleteListDialogProps) {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { revalidate } = useRevalidator();

  const { mutate: deleteListMutation } = useMutation({
    mutationFn: async () => await supabase.from('lists').delete().eq('id', list.id),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['lists'] });
      revalidate();
      toast({
        title: `${list.name} was removed`,
        variant: 'success',
      });
      onClose();
    },
  });

  if (!list) return;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md flex flex-col gap-12 justify-between" aria-description="Delete list dialog">
        <DialogHeader>
          <DialogTitle>{`Are you sure you want to remove ${list.name}?`}</DialogTitle>
        </DialogHeader>
        <div className="flex justify-around">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => deleteListMutation()}>
            Remove
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
