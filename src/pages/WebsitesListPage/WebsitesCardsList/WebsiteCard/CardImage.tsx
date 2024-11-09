import { Website } from '@clients/supabase/types';
import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import { Skeleton } from '@components/ui/skeleton';
import { IMAGES } from '../../../../utils/images';
import { motion } from 'framer-motion';

export default function CardImage({
  website,
  icon,
  onClick,
}: {
  website: Website;
  icon: string;
  onClick: (src: string) => void;
}) {
  const { images } = useLoaderData() as { images: Promise<{ icon: string; url: string }[]> };

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => onClick(e.currentTarget.src);

  if (!website.icon)
    return (
      <motion.div layoutId={`image-${website.name}-${website.id}`}>
        <img
          className="h-44 w-full object-cover rounded-xl hover:cursor-pointer hover:opacity-80"
          src={icon || IMAGES.websiteDefault}
          onClick={handleImageClick}
        />
      </motion.div>
    );

  return (
    <Suspense fallback={<Skeleton className="h-44 w-full rounded-xl" />}>
      <Await
        resolve={images}
        children={(resolvedImages: { icon: string; url: string }[]) => (
          <motion.div layoutId={`image-${website.name}-${website.id}`}>
            <img
              className="h-44 w-full object-cover rounded-xl hover:cursor-pointer hover:opacity-80"
              src={resolvedImages.find(({ url }) => url === website.url)?.icon || IMAGES.websiteDefault}
              onClick={handleImageClick}
            />
          </motion.div>
        )}
        errorElement={<img className="h-44 w-full object-cover rounded-xl" src={IMAGES.websiteDefault} />}
      />
    </Suspense>
  );
}
