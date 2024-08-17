import { Button } from '@/components/ui/button';
import { Command as CommandIcon } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { useState } from 'react';
import useCommandKeyListener from '@/hooks/useCommandKeyListener';
import ActionsMenu from './ActionsMenu';
import { Badge } from '@/components/ui/badge';

export default function ActionsButton() {
  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);
  const [isAddWebsiteDialogOpen, setAddWebsiteDialogOpen] = useState(false);

  const handleChangeActionMenuOpen = () => {
    if (isActionsMenuOpen) {
      setAddWebsiteDialogOpen(false);
    }
    setIsActionsMenuOpen(!isActionsMenuOpen);
  };

  const handleChangeAddWebsiteDialogOpen = () => {
    setIsActionsMenuOpen(!isAddWebsiteDialogOpen);
    setAddWebsiteDialogOpen(!isAddWebsiteDialogOpen);
  };

  useCommandKeyListener({ key: 'k', callback: handleChangeActionMenuOpen });
  useCommandKeyListener({ key: 'a', callback: handleChangeAddWebsiteDialogOpen });

  return (
    <Popover open={isActionsMenuOpen}>
      <PopoverTrigger>
        <div className="flex justify-start p-2" onClick={handleChangeActionMenuOpen}>
          <Button variant="ghost" className="size-lg flex gap-0.5">
            <div className="text-md mx-2">Actions</div>
            <Badge variant="secondary" className="py-1">
              <CommandIcon className="size-3" />
            </Badge>
            <Badge variant="secondary" className="px-3">
              K
            </Badge>
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent side="top" align="end">
        <ActionsMenu isAddWebsiteDialogOpen={isAddWebsiteDialogOpen} handleChangeAddWebsiteDialogOpen={setAddWebsiteDialogOpen} />
      </PopoverContent>
    </Popover>
  );
}
