import { Website } from '@clients/supabase/types';
import { useState } from 'react';
import WebsiteWizard from '../../WebsitesCommandList/WebsiteWizard';
import DeleteSiteDialog from '../../DeleteSiteDialog';
import CardBody from './CardBody';
import CardImage from './CardImage';
import Favicon from '../../Favicon';

export default function WebsiteCard({
  website,
  description,
  categories,
  icon,
}: {
  website: Website;
  description: string;
  categories: string[];
  icon: string;
}) {
  const [isEditWebsiteDialogOpen, setIsEditWebsiteDialogOpen] = useState(false);
  const [isDeleteWebsiteDialogOpen, setIsDeleteWebsiteDialogOpen] = useState(false);

  return (
    <>
      <CardBody
        website={website}
        header={<Favicon website={website} />}
        body={<CardImage website={website} icon={icon} />}
        footer={<div className="max-h-[125px] overflow-auto">{description}</div>}
        onEditClick={() => setIsEditWebsiteDialogOpen(true)}
        onDeleteClick={() => setIsDeleteWebsiteDialogOpen(true)}
      />
      <WebsiteWizard
        website={website}
        isOpen={isEditWebsiteDialogOpen}
        onChangeOpen={setIsEditWebsiteDialogOpen}
        categories={categories}
      />
      <DeleteSiteDialog
        isOpen={isDeleteWebsiteDialogOpen}
        onClose={() => setIsDeleteWebsiteDialogOpen(false)}
        website={website}
      />
    </>
  );
}
