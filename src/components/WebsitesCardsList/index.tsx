import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { groupBy } from 'lodash';
import WebsiteCard from './WebsiteCard';
import { Website } from '../../types/website';
import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import { SitePreview } from '../../clients/supabase/types';
import CardSkeleton from './WebsiteCard/CardSkeleton';

type WebsitesCardsProps = {
  websites: Website[];
  categories: string[];
};

export default function WebsitesCardsList({ websites, categories }: WebsitesCardsProps) {
  const websitesByCategory = groupBy(websites, 'category');
  const { sitePreviews } = useLoaderData() as { sitePreviews: Promise<SitePreview[]> };

  return (
    <div className="size-full p-16">
      {
        <Accordion type="multiple" defaultValue={categories ? categories : []}>
          {categories.map(category => (
            <AccordionItem value={category} key={category}>
              <AccordionTrigger>
                <div className="text-xl no-underline">{category}</div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid-cols-4 grid gap-8">
                  {websitesByCategory[category].map(website => (
                    <Suspense key={website.id} fallback={<CardSkeleton website={website} />}>
                      <Await
                        resolve={sitePreviews}
                        children={(resolvedPreviews: SitePreview[]) => {
                          const resolvedPreview = resolvedPreviews.find(preview => preview.url === website.url);

                          return (
                            <WebsiteCard
                              website={website}
                              description={resolvedPreview?.description ?? ''}
                              categories={categories}
                              icon={resolvedPreview?.image ?? ''}
                            />
                          );
                        }}
                      />
                    </Suspense>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      }
    </div>
  );
}
