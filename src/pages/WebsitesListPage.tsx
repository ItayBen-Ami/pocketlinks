import WebsitesCommandList from '../components/WebsitesCommandList';
import WebsitesCardsList from '../components/WebsitesCardsList';
import useGetWebsites from '@hooks/useGetWebsites';

export default function WebsitesListPage() {
  const { websites, isLoading } = useGetWebsites({});

  const categories = Array.from(
    (websites ?? []).reduce((acc, current) => {
      acc.add(current.category);

      return acc;
    }, new Set<string>()),
  ) as string[];

  return (
    <div className="flex justify-center items-center mt-[4.5rem]">
      <WebsitesCardsList websites={websites ?? []} loading={isLoading} categories={categories} />
      <WebsitesCommandList websites={websites ?? []} loading={isLoading} categories={categories} />
    </div>
  );
}
