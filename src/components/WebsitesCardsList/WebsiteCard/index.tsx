import { Website } from '../../../clients/supabase/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function WebsiteCard({
  website,
  description,
  imageUrl,
}: {
  website: Website;
  description: string;
  imageUrl: string;
}) {
  return (
    <Card key={website.id}>
      <div className="flex flex-col gap-2 divide-y">
        <CardHeader>
          <CardTitle>
            <div className="flex gap-2 justify-start items-center">
              <img className="size-4" src={website.icon} />
              <div
                className="truncate text-lg hover:underline hover:cursor-pointer"
                onClick={() => {
                  window.location.href = website.url;
                }}
              >
                {website.name}
              </div>
            </div>
          </CardTitle>
          <CardDescription>
            <img className="h-44 w-full" src={imageUrl} />
          </CardDescription>
        </CardHeader>
        <div className="mt-8 pt-4">
          <CardContent>{description}</CardContent>
        </div>
      </div>
    </Card>
  );
}
