import { Website } from '@clients/supabase/types';
import { useState } from 'react';
import WebsiteWizard from '../../WebsitesCommandList/WebsiteWizard';
import DeleteSiteDialog from '../../DeleteSiteDialog';
import CardBody from './CardBody';
import CardImage from './CardImage';
import Favicon from '../../Favicon';
import { motion } from 'framer-motion';

export default function WebsiteCard({
  website,
  description,
  categories,
  icon,
  onActiveChange,
  onAddPinnedWebsite,
  onRemovePinnedWebsite,
  isPinned,
}: {
  website: Website;
  description: string;
  categories: string[];
  icon: string;
  onActiveChange: (src: string) => void;
  onAddPinnedWebsite: (newWebsite: { title: string; icon: React.ReactNode; href: string; id: string }) => void;
  onRemovePinnedWebsite: (websiteToRemoveId: string) => void;
  isPinned: boolean;
}) {
  const [isEditWebsiteDialogOpen, setIsEditWebsiteDialogOpen] = useState(false);
  const [isDeleteWebsiteDialogOpen, setIsDeleteWebsiteDialogOpen] = useState(false);

  return (
    <>
      <CardBody
        website={website}
        header={<Favicon website={website} />}
        body={<CardImage website={website} icon={icon} onClick={onActiveChange} />}
        footer={
          <motion.div layoutId={`description-${description}-${website.id}`}>
            <div className="max-h-[125px] overflow-auto">{description}</div>
          </motion.div>
        }
        onEditClick={() => setIsEditWebsiteDialogOpen(true)}
        onDeleteClick={() => setIsDeleteWebsiteDialogOpen(true)}
        onAddPinnedWebsite={onAddPinnedWebsite}
        onRemovePinnedWebsite={onRemovePinnedWebsite}
        isPinned={isPinned}
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
