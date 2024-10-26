import { QueryClient } from '@tanstack/react-query';
import { getSitePreviews, getUserFileUrl, supabase } from '../clients/supabase';
import { Params, defer } from 'react-router-dom';
import { Website } from '@clients/supabase/types';
import { PostgrestMaybeSingleResponse } from '@supabase/supabase-js';

export const websitesLoader =
  (queryClient: QueryClient) =>
  async ({ params }: { params: Params }) => {
    const { listId } = params;

    const [{ data: websites }, { data: lists }] = await Promise.all([
      queryClient.ensureQueryData({
        queryKey: ['websites', listId ? parseInt(listId) : ''],
        queryFn: async () =>
          (await supabase
            .from('websites')
            .select('*')
            .eq('list_id', listId)
            .order('created_at', { ascending: true })) as PostgrestMaybeSingleResponse<Website[]>,
      }),
      queryClient.ensureQueryData({
        queryKey: ['lists', listId ? parseInt(listId) : ''],
        queryFn: async () =>
          (await supabase.from('lists').select('*').eq('id', listId)) as PostgrestMaybeSingleResponse<unknown[]>,
      }),
    ]);

    if (!lists?.length || !websites) throw new Error('Invalid list ID');

    const siteImages = websites.map(({ icon, url }) => ({ icon, url })).filter(icon => !!icon);
    const imageUrlsPromise = Promise.all(
      siteImages.map(async ({ icon, url }) => ({
        icon: await queryClient.ensureQueryData({
          queryKey: ['signedUrls', icon],
          queryFn: async () => await getUserFileUrl(icon as string),
          staleTime: 1000 * 60 * 60 * 2,
        }),
        url,
      })),
    );

    const listIdParam = parseInt(listId as string);
    const sitePreviewsPromise = queryClient.ensureQueryData({
      queryKey: ['sitePreviews', websites, listIdParam],
      queryFn: async () => await getSitePreviews(listIdParam),
    });

    return defer({
      websites,
      images: imageUrlsPromise,
      sitePreviews: sitePreviewsPromise,
    });
  };
