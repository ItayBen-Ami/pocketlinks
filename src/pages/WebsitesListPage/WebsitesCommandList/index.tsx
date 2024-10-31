import { groupBy } from 'lodash';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandSeparator,
} from '@components/ui/command';
import { Website } from '@clients/supabase/types';
import EmptyState from './EmptyState';
import CommandActions from './CommandActions';
import useCommandKeyListener from '@hooks/useCommandKeyListener';
import { useCallback, useState } from 'react';
import WebsiteRow from './WebsiteRow';

type WebsitesCommandListProps = {
  websites: Website[];
  loading: boolean;
  categories: string[];
};

export default function WebsitesCommandList({ websites = [], loading, categories }: WebsitesCommandListProps) {
  const websitesByCategory = groupBy(websites, 'category');

  const websitesFilter = useCallback(
    (value: string, search: string) => {
      const website = websites.find(({ name }) => name === value);

      const searchString = search.toUpperCase();

      if (website?.name.toUpperCase().includes(searchString) || website?.category.toUpperCase().includes(searchString))
        return 1;

      return 0;
    },
    [websites],
  );

  const [commandMenuOpen, setCommandMenuOpen] = useState(false);

  useCommandKeyListener({ key: 'k', callback: () => setCommandMenuOpen(!commandMenuOpen) });

  return (
    <CommandDialog filter={websitesFilter} open={commandMenuOpen} onOpenChange={setCommandMenuOpen}>
      <CommandInput placeholder="Search..." />
      <CommandList className="h-4/5">
        <CommandEmpty>{loading ? 'Loading...' : <EmptyState />}</CommandEmpty>
        {Object.keys(websitesByCategory).map((categoryName, index) => (
          <div>
            <CommandGroup heading={categoryName}>
              {websitesByCategory[categoryName].map(website => (
                <WebsiteRow website={website} />
              ))}
            </CommandGroup>
            {index < Object.keys(websitesByCategory).length - 1 && <CommandSeparator />}
          </div>
        ))}
      </CommandList>
      <CommandSeparator />
      <div className="flex justify-end w-full">
        <CommandActions categories={categories} />
      </div>
    </CommandDialog>
  );
}
