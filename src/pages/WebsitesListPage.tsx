import { useMutation, useQuery } from 'react-query';
import { createNewWebsite, getWebsites } from '../clients/supabase';
import WebsitesCommandList from '../components/WebsitesCommandList';
import { useUser } from '../contexts/UserContext';

export default function WebsitesListPage() {
  const { accessToken } = useUser();

  const { data: websites, isLoading } = useQuery({
    queryKey: ['websites', accessToken],
    queryFn: async () => {
      return getWebsites({ accessToken });
    },
  });

  // useMutation({ mutationFn: website => createNewWebsite(accessToken, website) });

  return (
    <div className="flex justify-center items-center mt-[4.5rem]">
      <WebsitesCommandList websites={websites} loading={isLoading} />
    </div>
  );
}
