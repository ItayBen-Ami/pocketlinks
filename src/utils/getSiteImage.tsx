import { Website } from '@clients/supabase/types';

const FAVICON_URL = 'https://www.google.com/s2/favicons?domain=';

export const getSiteImage = (signedUrl: string, website: Website) => {
  return signedUrl || `${FAVICON_URL}/${website.url}`;
};
