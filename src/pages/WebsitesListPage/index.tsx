import WebsitesCommandList from './WebsitesCommandList';
import WebsitesCardsList from './WebsitesCardsList';
import { Link, useLoaderData } from 'react-router-dom';
import { Website } from '@clients/supabase/types';
import useLocalStorage from '../../hooks/useLocalStorage';
import WebsitesDock from './WebsitesDock';
import { ArrowLeft } from 'lucide-react';

export default function WebsitesListPage() {
  const { websites } = useLoaderData() as { websites: Website[] };

  const categories = Array.from(
    websites.reduce((acc, current) => {
      acc.add(current.category);

      return acc;
    }, new Set<string>()),
  ) as string[];

  const [pinnedWebsites, setPinnedWebsites] = useLocalStorage<
    { title: string; icon: React.ReactNode; href: string; id: string }[]
  >('pinnedWebsites', []);

  return (
    <div className="h-full">
      <div className="ml-2 mt-5">
        <Link to="/lists" className="flex gap-1 text-blue-500">
          <ArrowLeft strokeWidth={1} />
          <div>Back to lists page</div>
        </Link>
      </div>
      <div className="flex justify-center items-center">
        <WebsitesCardsList
          websites={websites}
          categories={categories}
          pinnedWebsites={pinnedWebsites}
          onPinnedWebsitesChange={setPinnedWebsites}
        />
        <WebsitesCommandList websites={websites} loading={false} categories={categories} />
      </div>
      <WebsitesDock websites={pinnedWebsites} />
    </div>
  );
}
