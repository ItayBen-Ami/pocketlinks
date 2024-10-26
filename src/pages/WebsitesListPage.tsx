import WebsitesCommandList from '../components/WebsitesCommandList';
import WebsitesCardsList from '../components/WebsitesCardsList';
import { useLoaderData } from 'react-router-dom';
import { Website } from '../types/website';

export default function WebsitesListPage() {
  const { websites } = useLoaderData() as { websites: Website[] };

  const categories = Array.from(
    websites.reduce((acc, current) => {
      acc.add(current.category);

      return acc;
    }, new Set<string>()),
  ) as string[];

  return (
    <div className="flex justify-center items-center mt-[4.5rem]">
      <WebsitesCardsList websites={websites} categories={categories} />
      <WebsitesCommandList websites={websites} loading={false} categories={categories} />
    </div>
  );
}
