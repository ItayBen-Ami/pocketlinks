import { Website } from '@clients/supabase/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import useGetSignedUrl from '@hooks/useGetSignedUrl';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WebsiteWizard from '../../WebsitesCommandList/WebsiteWizard';
import Favicon from '../../Faxicon';

export default function WebsiteCard({
  website,
  description,
  imageUrl,
  categories,
}: {
  website: Website;
  description: string;
  imageUrl: string;
  categories: string[];
}) {
  const { signedUrl } = useGetSignedUrl({ icon: website.icon });
  const altImage = 'https://www.google.com/s2/favicons?domain=' + website.url;

  const getImageSource = () => {
    if (imageUrl === altImage) return signedUrl || altImage;

    return !useSignedUrl ? imageUrl : signedUrl;
  };

  const [useSignedUrl, setUseSignedUrl] = useState(false);
  const [isEditWebsiteDialogOpen, setIsEditWebsiteDialogOpen] = useState(false);

  return (
    <>
      <Card key={website.id}>
        <div className="flex flex-col gap-2 divide-y">
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center">
                <div className="flex gap-2 justify-start items-center">
                  <Favicon domain={website.url} fallback={signedUrl || ''} />
                  <div
                    className="truncate text-lg hover:underline hover:cursor-pointer"
                    onClick={() => {
                      window.location.href = website.url;
                    }}
                  >
                    {website.name}
                  </div>
                </div>
                <Button variant="outline" size="icon" onClick={() => setIsEditWebsiteDialogOpen(true)}>
                  <Pencil strokeWidth={2} className="size-4 absolute" />
                </Button>
              </div>
            </CardTitle>
            <CardDescription>
              <img className="h-44 w-full" src={getImageSource()} onError={() => setUseSignedUrl(true)} />
            </CardDescription>
          </CardHeader>
          <div className="mt-8 pt-4">
            <CardContent>{description}</CardContent>
          </div>
        </div>
      </Card>
      <WebsiteWizard
        website={website}
        isOpen={isEditWebsiteDialogOpen}
        onChangeOpen={setIsEditWebsiteDialogOpen}
        categories={categories}
      />
    </>
  );
}
