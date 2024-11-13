import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@components/ui/button';
import { ButtonGroup } from '@components/ui/button-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip';
import { SyntheticEvent } from 'react';
import { List } from '@clients/supabase/types';

export default function ListActions({
  list,
  onSelectedListChange,
  openEditModal,
  openDeleteModal,
}: {
  list: List;
  onSelectedListChange: (list: List) => void;
  openEditModal: () => void;
  openDeleteModal: () => void;
}) {
  const handleOpenEditWizard = (e: SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onSelectedListChange(list);
    openEditModal();
  };

  const handleOpenDeleteWizard = (e: SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onSelectedListChange(list);
    openDeleteModal();
  };

  return (
    <>
      <ButtonGroup>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="icon" onClick={handleOpenEditWizard}>
              <Pencil strokeWidth={2} className="size-4 absolute" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit List</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="icon" onClick={handleOpenDeleteWizard}>
              <Trash2 strokeWidth={2} className="size-4 absolute" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete List</TooltipContent>
        </Tooltip>
      </ButtonGroup>
    </>
  );
}
