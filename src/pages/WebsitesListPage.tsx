import { useQuery } from 'react-query';
import { getWebsites } from '../clients/supabase';
import WebsitesCommandList from '../components/WebsitesCommandList';
import { useUser } from '../contexts/UserContext';
import WebsitesCardsList from '../components/WebsitesCardsList';

export default function WebsitesListPage() {
  const { accessToken } = useUser();

  const { data: websites, isLoading } = useQuery({
    queryKey: ['websites', accessToken],
    queryFn: async () => {
      return getWebsites({ accessToken });
    },
  });

  const categories = Array.from(
    (websites ?? []).reduce((acc, current) => {
      acc.add(current.category);

      return acc;
    }, new Set<string>()),
  );

  return (
    <div className="flex justify-center items-center mt-[4.5rem]">
      <WebsitesCardsList websites={websites ?? []} loading={isLoading} categories={categories} />
      <WebsitesCommandList websites={websites ?? []} loading={isLoading} categories={categories} />
    </div>
  );
}
