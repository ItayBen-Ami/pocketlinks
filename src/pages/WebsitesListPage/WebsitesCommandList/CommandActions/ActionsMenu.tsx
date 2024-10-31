import { CirclePlus, CommandIcon } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';

type ActionMenuProps = {
  openAddWebsiteDialog: () => void;
};

export default function ActionsMenu({ openAddWebsiteDialog }: ActionMenuProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <Button variant="ghost" onClick={openAddWebsiteDialog}>
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <CirclePlus className="text-green-600" />
            <div>Add Link</div>
          </div>
          <div className="flex items-center gap-0.5">
            <Badge variant="secondary" className="py-1">
              <CommandIcon className="size-3" />
            </Badge>
            <Badge variant="secondary" className="px-3">
              L
            </Badge>
          </div>
        </div>
      </Button>
    </div>
  );
}
