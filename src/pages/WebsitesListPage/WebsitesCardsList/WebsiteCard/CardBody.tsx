import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@components/ui/card';
import { Website } from '@clients/supabase/types';
import { ButtonGroup } from '@components/ui/button-group';
import { Button } from '@components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

type CardBodyProps = {
  website: Website;
  header: React.ReactElement;
  body: React.ReactElement;
  footer: React.ReactElement;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
};

export default function CardBody({ website, header, body, footer, onEditClick, onDeleteClick }: CardBodyProps) {
  return (
    <Card>
      <div className="flex flex-col gap-1">
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-center">
              <div className="flex gap-3 justify-start items-center">
                {header}
                <div
                  className="truncate text-lg hover:underline hover:cursor-pointer"
                  onClick={() => {
                    window.location.href = website.url;
                  }}
                >
                  {website.name}
                </div>
              </div>
              <ButtonGroup>
                <Button variant="outline" size="icon" onClick={onEditClick} disabled={!onEditClick}>
                  <Pencil strokeWidth={2} className="size-4 absolute" />
                </Button>
                <Button variant="outline" size="icon" onClick={onDeleteClick} disabled={!onDeleteClick}>
                  <Trash2 strokeWidth={2} className="size-4 absolute" />
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
