import { useQuery } from '@tanstack/react-query';
import { useUser } from '../contexts/UserContext';
import { getWebsites } from '@clients/supabase';

export default function useGetWebsites({
  manual = false,
  filters = {},
  listId,
}: {
  manual?: boolean;
  filters?: Record<string, unknown>;
  listId: string | undefined;
}) {
  const { isLoggedIn } = useUser();

  const {
    data: websites,
    error,
    isLoading,
    refetch: refetchWebsites,
  } = useQuery({
    queryKey: ['websites', isLoggedIn],
    queryFn: async () => {
      return getWebsites({ filters: { ...filters, list_id: `eq.${listId}` } });
    },
    enabled: !manual && !!listId,
  });

  return { websites, isLoading, refetchWebsites };
}
