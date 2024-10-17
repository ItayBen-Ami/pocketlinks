import { useQuery } from 'react-query';
import { useUser } from '../contexts/UserContext';
import { getWebsites } from '@clients/supabase';

export default function useGetWebsites({ manual = false }) {
  const { isLoggedIn } = useUser();

  const {
    data: websites,
    isLoading,
    refetch: refetchWebsites,
  } = useQuery(
    ['websites', isLoggedIn],
    async () => {
      return getWebsites({});
    },

    { enabled: !manual },
  );

  return { websites, isLoading, refetchWebsites };
}
