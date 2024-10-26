import { getUserFileUrl } from '@clients/supabase';
import { useQuery } from '@tanstack/react-query';

export default function useGetSignedUrl({ icon }: { icon: string | null | undefined }) {
  const { data: signedUrl } = useQuery({
    queryKey: ['signedUrl', icon],
    queryFn: async () => getUserFileUrl(icon ?? ''),
    enabled: !!icon,
  });

  return { signedUrl };
}
