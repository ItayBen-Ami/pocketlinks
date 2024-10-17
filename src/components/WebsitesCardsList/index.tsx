import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Website } from '@clients/supabase/types';
import { groupBy, keyBy, uniqBy } from 'lodash';
import { useMemo } from 'react';
import { getSitePreviews } from '@clients/supabase';
import { useQuery } from 'react-query';
import WebsiteCard from './WebsiteCard';

type WebsitesCardsProps = {
  websites: Website[];
  loading: boolean;
  categories: string[];
};

export default function WebsitesCardsList({ websites, loading, categories }: WebsitesCardsProps) {
  const websitesByCategory = groupBy(websites, 'category');
  const siteUrls = useMemo(() => uniqBy(websites, 'url').map(({ url }) => url), [websites]);

  const { data: sitePreviews } = useQuery({
    queryKey: ['sitePreviews', siteUrls],
    queryFn: async () => {
      return getSitePreviews(siteUrls);
    },
  });

  const getSiteImageUrl = (image: string | undefined, siteUrl: string) => {
    const altImage = 'https://www.google.com/s2/favicons?domain=' + siteUrl;

    return !image || image === 'No image found' ? altImage : image;
  };

  const sitePreviewsByKey = keyBy(sitePreviews, 'url');

  return (
    <div className="size-full p-16">
      {categories.length ? (
        <Accordion type="multiple" defaultValue={categories ? categories : []}>
          {categories.map(category => (
            <AccordionItem value={category} key={category}>
              <AccordionTrigger>
                <div className="text-xl no-underline">{category}</div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid-cols-4 grid gap-8">
                  {websitesByCategory[category].map(website => (
                    <WebsiteCard
                      website={website}
                      description={sitePreviewsByKey[website.url]?.description}
                      imageUrl={getSiteImageUrl(sitePreviewsByKey[website.url]?.image, website.url)}
                      categories={categories}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        loading
      )}
    </div>
  );
}
