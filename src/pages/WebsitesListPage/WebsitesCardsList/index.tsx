import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@components/ui/accordion';
import { groupBy } from 'lodash';
import WebsiteCard from './WebsiteCard';
import { Suspense, useState } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import { SitePreview, Website } from '@clients/supabase/types';
import CardSkeleton from './WebsiteCard/CardSkeleton';
import { ExpandableCard } from '../../../components/ui/expanded-card';
import { IMAGE_FETCH_ERROR_MESSAGE, IMAGES } from '../../../utils/images';
import { containerClassNameByType, itemClassNameByType, LayoutTypes } from './layout';
import LayoutToggleGroup from './LayoutToggleGroup';
import useLocalStorage from '@hooks/useLocalStorage';
import { Button } from '@components/ui/button';
import WebsiteWizard from '../WebsitesCommandList/WebsiteWizard';

type WebsitesCardsProps = {
  websites: Website[];
  categories: string[];
  pinnedWebsites: { title: string; icon: React.ReactNode; href: string; id: string }[];
  onPinnedWebsitesChange: React.Dispatch<
    React.SetStateAction<{ title: string; icon: React.ReactNode; href: string; id: string }[]>
  >;
};

export default function WebsitesCardsList({
  websites,
  categories,
  pinnedWebsites,
  onPinnedWebsitesChange,
}: WebsitesCardsProps) {
  const websitesByCategory = groupBy(websites, 'category');
  const { sitePreviews } = useLoaderData() as { sitePreviews: Promise<SitePreview[]> };

  const [isAddWebsiteDialogOpen, setAddWebsiteDialogOpen] = useState(false);

  const [selectedLayout, setSelectedLayout] = useLocalStorage<LayoutTypes>('selectedLayout', 'layoutGrid');

  const [active, setActive] = useState<
    | {
        title: string;
        content: () => JSX.Element;
        link: string;
        description: string;
        src: string;
        id: string;
        favicon: string;
      }
    | boolean
    | null
  >(null);

  const handleAddPinnedWebsite = (newWebsite: { title: string; icon: React.ReactNode; href: string; id: string }) =>
    onPinnedWebsitesChange(currentWebsites => [...currentWebsites, newWebsite]);

  const handleRemovePinnedWebsite = (websiteToRemoveId: string) =>
    onPinnedWebsitesChange(pinnedWebsites => pinnedWebsites.filter(({ id }) => id !== websiteToRemoveId));

  return (
    <div className="size-full p-16">
      <div className="flex justify-between">
        <LayoutToggleGroup currentLayout={selectedLayout} onCurrentLayoutChange={setSelectedLayout} />
        <Button onClick={() => setAddWebsiteDialogOpen(true)}>Add Website</Button>
      </div>
      {
        <Accordion type="multiple" defaultValue={categories ? categories : []}>
          {categories.map(category => (
            <AccordionItem value={category} key={category}>
              <AccordionTrigger>
                <div className="text-xl no-underline">{category}</div>
              </AccordionTrigger>
              <AccordionContent>
                <div className={containerClassNameByType[selectedLayout]}>
                  {websitesByCategory[category].map((website, index) => (
                    <Suspense key={website.id} fallback={<CardSkeleton website={website} />}>
                      <Await
                        resolve={sitePreviews}
                        children={(resolvedPreviews: SitePreview[]) => {
                          const resolvedPreview = resolvedPreviews.find(preview => preview.url === website.url);

                          const handleActiveChange = (src: string) =>
                            setActive({
                              title: website.name,
                              description: website.category,
                              content: () => <p>{resolvedPreview?.description ?? ''}</p>,
                              link: website.url,
                              src,
                              id: website.id ?? '',
                              favicon:
                                !resolvedPreview?.faviconUrl ||
                                resolvedPreview?.faviconUrl === IMAGE_FETCH_ERROR_MESSAGE
                                  ? IMAGES.websiteDefault
                                  : resolvedPreview?.faviconUrl,
                            });

                          return (
                            <div className={itemClassNameByType[selectedLayout](index)}>
                              <WebsiteCard
                                website={website}
                                description={resolvedPreview?.description ?? ''}
                                categories={categories}
                                icon={resolvedPreview?.image ?? ''}
                                onActiveChange={handleActiveChange}
                                onAddPinnedWebsite={handleAddPinnedWebsite}
                                onRemovePinnedWebsite={handleRemovePinnedWebsite}
                                isPinned={pinnedWebsites.some(({ id }) => id === website.id)}
                              />
                            </div>
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
      <ExpandableCard active={active} onActiveChange={setActive} />
      <WebsiteWizard
        website={undefined}
        isOpen={isAddWebsiteDialogOpen}
        onChangeOpen={setAddWebsiteDialogOpen}
        categories={categories}
      />
    </div>
  );
}
