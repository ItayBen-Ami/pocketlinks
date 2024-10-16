import { Button } from '@/components/ui/button';
import { Command as CommandIcon } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { useState } from 'react';
import useCommandKeyListener from '@/hooks/useCommandKeyListener';
import ActionsMenu from './ActionsMenu';
import { Badge } from '@/components/ui/badge';
import WebsiteWizard from '../WebsiteWizard';

type CommandActionsProps = {
  categories: string[];
};

export default function CommandActions({ categories }: CommandActionsProps) {
  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);
  const [isAddWebsiteDialogOpen, setAddWebsiteDialogOpen] = useState(false);

  const handleChangeActionMenuOpen = () => {
    if (isActionsMenuOpen) {
      setAddWebsiteDialogOpen(false);
    }
    setIsActionsMenuOpen(!isActionsMenuOpen);
  };

  useCommandKeyListener({ key: 'a', callback: handleChangeActionMenuOpen });
  useCommandKeyListener({
    key: 'p',
    callback: () => {
      setAddWebsiteDialogOpen(!isAddWebsiteDialogOpen);
    },
  });

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
              A
            </Badge>
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent side="top" align="end">
        <ActionsMenu openAddWebsiteDialog={() => setAddWebsiteDialogOpen(true)} />
      </PopoverContent>
      <WebsiteWizard isOpen={isAddWebsiteDialogOpen} onChangeOpen={setAddWebsiteDialogOpen} categories={categories} />
    </Popover>
  );
}
