import { QueryClient } from '@tanstack/react-query';
import { getSitePreviews, getUserFileUrl, supabase } from '../clients/supabase';
import { Params, defer } from 'react-router-dom';
import { List, Website } from '@clients/supabase/types';
import { PostgrestMaybeSingleResponse } from '@supabase/supabase-js';
import _ from 'lodash';

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
          (await supabase.from('lists').select('*').eq('id', listId)) as PostgrestMaybeSingleResponse<List[]>,
      }),
    ]);

    if (!lists?.length || !websites) throw new Error('Invalid list ID');

    const siteImages = websites.map(({ icon, url }) => ({ icon, url })).filter(icon => !!icon);
    const imageUrlsPromise = Promise.all(
      siteImages.map(async ({ icon, url }) => ({
        icon: await queryClient.ensureQueryData({
          queryKey: ['signedUrls', icon],
          queryFn: () => getUserFileUrl(icon as string),
          staleTime: 1000 * 60 * 60 * 2,
        }),
        url,
      })),
    );

    const listIdParam = parseInt(listId as string);
    const sitePreviewsPromise = queryClient.ensureQueryData({
      queryKey: ['sitePreviews', websites, listIdParam],
      queryFn: () => getSitePreviews(listIdParam),
    });

    return defer({
      websites,
      images: imageUrlsPromise,
      sitePreviews: sitePreviewsPromise,
    });
  };

export const listsLoader = (queryClient: QueryClient) => async () => {
  const { data: lists } = await queryClient.ensureQueryData({
    queryKey: ['lists'],
    queryFn: async () => (await supabase.from('lists').select('*')) as PostgrestMaybeSingleResponse<List[]>,
  });

  if (!lists || !lists.length) return { lists: [] };

  const listIds = lists.map(({ id }) => id);
  const { data: websites } = (await supabase
    .from('websites')
    .select('list_id')
    .in('list_id', listIds)) as PostgrestMaybeSingleResponse<Website[]>;

  const websitesByListId = _.groupBy(websites, 'list_id');
  const parsedLists = lists.map(list => ({ ...list, websitesCount: websitesByListId?.[list?.id ?? '']?.length ?? 0 }));

  const siteImages = lists.map(({ id, imageUrl }) => ({ id, imageUrl })).filter(({ imageUrl }) => !!imageUrl);
  const imageUrlsPromise = Promise.all(
    siteImages.map(async ({ id, imageUrl }) => ({
      image: await queryClient.ensureQueryData({
        queryKey: ['listSignedUrls', imageUrl],
        queryFn: async () => await getUserFileUrl(imageUrl as string),
        staleTime: 1000 * 60 * 60 * 2,
      }),
      id,
    })),
  );

  return defer({ lists: parsedLists, images: imageUrlsPromise });
};