import AddWebsiteDialog from './AddWebsiteDialog';

type ActionMenuProps = {
  isAddWebsiteDialogOpen: boolean;
  handleChangeAddWebsiteDialogOpen: (isOpen: boolean) => void;
};

export default function ActionsMenu({ isAddWebsiteDialogOpen, handleChangeAddWebsiteDialogOpen }: ActionMenuProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <AddWebsiteDialog isOpen={isAddWebsiteDialogOpen} handleChangeOpen={handleChangeAddWebsiteDialogOpen} />
    </div>
  );
}
