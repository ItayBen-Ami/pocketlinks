import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@components/ui/card';
import { Website } from '@clients/supabase/types';
import { ButtonGroup } from '@components/ui/button-group';
import { Button } from '@components/ui/button';
import { Pencil, Pin, PinOff, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

type CardBodyProps = {
  website: Website;
  header: React.ReactElement;
  body: React.ReactElement;
  footer: React.ReactElement;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  onAddPinnedWebsite?: (newWebsite: { title: string; icon: React.ReactNode; href: string; id: string }) => void;
  onRemovePinnedWebsite?: (websiteToRemoveId: string) => void;
  isPinned?: boolean;
};

export default function CardBody({
  website,
  header,
  body,
  footer,
  onEditClick,
  onDeleteClick,
  onAddPinnedWebsite,
  onRemovePinnedWebsite,
  isPinned,
}: CardBodyProps) {
  return (
    <Card className="size-full">
      <div className="flex flex-col gap-1">
        <CardHeader>
          <CardTitle>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex gap-3 justify-start items-center">
                {header}
                <motion.div layoutId={`card-${website.name}-${website.id}`}>
                  <div
                    className="truncate text-lg hover:underline hover:cursor-pointer"
                    onClick={() => {
                      window.location.href = website.url;
                    }}
                  >
                    {website.name}
                  </div>
                </motion.div>
              </div>
              <ButtonGroup>
                <Button variant="outline" size="icon" onClick={onEditClick} disabled={!onEditClick}>
                  <Pencil strokeWidth={2} className="size-4 absolute" />
                </Button>
                <Button variant="outline" size="icon" onClick={onDeleteClick} disabled={!onDeleteClick}>
                  <Trash2 strokeWidth={2} className="size-4 absolute" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    isPinned && onRemovePinnedWebsite
                      ? onRemovePinnedWebsite(website.id ?? '')
                      : onAddPinnedWebsite &&
                        onAddPinnedWebsite({
                          title: website.name,
                          icon: website.icon,
                          id: website.id ?? '',
                          href: website.url,
                        })
                  }
                >
                  {isPinned ? (
                    <PinOff strokeWidth={2} className="size-4 absolute" />
                  ) : (
                    <Pin strokeWidth={2} className="size-4 absolute" />
                  )}
                </Button>
              </ButtonGroup>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>{body}</CardContent>
        <CardFooter>{footer}</CardFooter>
      </div>
    </Card>
  );
}
