import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@components/ui/dialog';
import { Website } from '@clients/supabase/types';
import { Button } from '@components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { deleteWebsite } from '@clients/supabase';
import { useToast } from '@components/hooks/useToast';

type DeleteSiteDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  website: Website;
};

export default function DeleteSiteDialog({ isOpen, onClose, website }: DeleteSiteDialogProps) {
  const { toast } = useToast();

  const { mutate: deleteWebsiteMutation } = useMutation({
    mutationFn: async () => await deleteWebsite(website?.id ?? ''),
    onSuccess: () => {
      toast({
        title: `${website.name} was removed`,
        variant: 'success',
      });
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md flex flex-col gap-12 justify-between">
        <DialogHeader>
          <DialogTitle>{`Are you sure you want to remove ${website.name}?`}</DialogTitle>
        </DialogHeader>
        <div className="flex justify-around">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => deleteWebsiteMutation()}>
            Remove
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
