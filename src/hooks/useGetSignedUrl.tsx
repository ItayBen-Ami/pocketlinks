import { useQuery } from 'react-query';
import { getUserFileUrl } from '@clients/supabase';

export default function useGetSignedUrl({ icon }: { icon: string | null | undefined }) {
  const { data: signedUrl } = useQuery(['signedUrl', icon], async () => getUserFileUrl(icon ?? ''), {
    enabled: !!icon,
  });

  return { signedUrl };
}
