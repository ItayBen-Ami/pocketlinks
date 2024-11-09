import { List } from '@clients/supabase/types';
import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import { Skeleton } from '@components/ui/skeleton';
import { IMAGES } from '../../utils/images';

export default function Image({ list }: { list: List }) {
  const { images } = useLoaderData() as { images: Promise<{ image: string; id: string }[]> };

  if (!list.imageUrl) return <img className="size-16 object-cover rounded-xl" src={IMAGES.websiteDefault} />;

  return (
    <Suspense fallback={<Skeleton className="size-16 rounded-xl" />}>
      <Await
        resolve={images}
        children={(resolvedImages: { image: string; id: string }[]) => (
          <img
            className="size-16 object-cover rounded-xl"
            src={resolvedImages.find(({ id }) => id === list.id)?.image || IMAGES.websiteDefault}
          />
        )}
        errorElement={<img className="size-16 object-cover rounded-xl" src={IMAGES.websiteDefault} />}
      />
    </Suspense>
  );
}
