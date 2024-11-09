import { Await, useLoaderData } from 'react-router-dom';
import { SitePreview } from '@clients/supabase/types';
import { Suspense } from 'react';
import { Skeleton } from '@components/ui/skeleton';
import { FloatingDock } from '@components/ui/floating-dock';

export default function WebsitesDock({
  websites,
}: {
  websites: { title: string; icon: React.ReactNode; href: string; id: string }[];
}) {
  const { sitePreviews } = useLoaderData() as { sitePreviews: Promise<SitePreview[]> };

  return (
    <div className="w-full flex justify-center fixed bottom-6">
      <FloatingDock
        items={websites.map(website => ({
          ...website,
          icon: (
            <Suspense key={website.id} fallback={<Skeleton className="rounded-full" />}>
              <Await
                resolve={sitePreviews}
                children={(resolvedPreviews: SitePreview[]) => {
                  const resolvedPreview = resolvedPreviews.find(preview => preview.url === website.href);

                  return <img src={resolvedPreview?.faviconUrl ?? ''} className="size-5" />;
                }}
              />
            </Suspense>
          ),
        }))}
        className="max-w-[50%]"
      />
    </div>
  );
}
