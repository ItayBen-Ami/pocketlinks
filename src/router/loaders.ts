import { QueryClient } from '@tanstack/react-query';
import { getLists, getSitePreviews, getUserFileUrl, getWebsites } from '../clients/supabase';
import { Params, defer } from 'react-router-dom';

export const websitesLoader =
  (queryClient: QueryClient) =>
  async ({ params }: { params: Params }) => {
    const { listId } = params;

    const [websites, lists] = await Promise.all([
      queryClient.ensureQueryData({
        queryKey: ['websites', listId],
        queryFn: async () => getWebsites({ listId: listId ?? '' }),
      }),
      queryClient.ensureQueryData({
        queryKey: ['lists', listId],
        queryFn: async () => getLists({ filters: { id: `eq.${listId}` } }),
      }),
    ]);

    if (!lists.length) throw new Error('Invalid list ID');

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
