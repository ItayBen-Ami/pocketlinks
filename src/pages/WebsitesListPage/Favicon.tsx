import { Suspense } from 'react';
import { SitePreview, Website } from '@clients/supabase/types';
import { Await, useLoaderData } from 'react-router-dom';
import { IMAGE_FETCH_ERROR_MESSAGE, IMAGES } from '../../utils/images';
import { motion } from 'framer-motion';

const Favicon = ({ website, withAnimation = true }: { website: Website; withAnimation?: boolean }) => {
  const { sitePreviews } = useLoaderData() as { sitePreviews: Promise<SitePreview[]> };

  return (
    <Suspense fallback={IMAGES.websiteDefault}>
      <Await
        resolve={sitePreviews}
        children={(resolvedSitePreviews: SitePreview[]) => {
          const sitePreview = resolvedSitePreviews.find(({ url }) => url === website.url);

          const src =
            !sitePreview?.faviconUrl || sitePreview.faviconUrl === IMAGE_FETCH_ERROR_MESSAGE
              ? IMAGES.websiteDefault
              : sitePreview.faviconUrl;

          return withAnimation ? (
            <motion.img src={src} className="size-6 rounded-full" layoutId={`favicon-${src}`} />
          ) : (
            <img src={src} className="size-6 rounded-full" />
          );
        }}
      />
    </Suspense>
  );
};

export default Favicon;
