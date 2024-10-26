import { Website } from '@clients/supabase/types';
import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { IMAGES } from '../../../utils/images';

export default function CardImage({ website, icon }: { website: Website; icon: string }) {
  const { images } = useLoaderData() as { images: Promise<{ icon: string; url: string }[]> };

  if (!website.icon) return <img className="h-44 w-full object-cover rounded-xl" src={icon || IMAGES.websiteDefault} />;

  return (
    <Suspense fallback={<Skeleton className="h-44 w-full rounded-xl" />}>
      <Await
        resolve={images}
        children={(resolvedImages: { icon: string; url: string }[]) => (
          <img
            className="h-44 w-full object-cover rounded-xl"
            src={resolvedImages.find(({ url }) => url === website.url)?.icon || IMAGES.websiteDefault}
          />
        )}
        errorElement={<img className="h-44 w-full object-cover rounded-xl" src={IMAGES.websiteDefault} />}
      />
    </Suspense>
  );
}
