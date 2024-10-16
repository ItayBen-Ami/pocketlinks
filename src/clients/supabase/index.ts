import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { SitePreview, Website } from './types';

const SUPABASE_URL = 'https://fgtfbeukcedamtskstqh.supabase.co';
const SUPABASE_CLIENT_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZndGZiZXVrY2VkYW10c2tzdHFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODg2MjAsImV4cCI6MjAzODg2NDYyMH0.UQ8TZgJ1gx0V3f3JEiQmp8V9E3fxlcx5sbhW-4H7L2U';

axios.defaults.headers.common = {
  apikey: SUPABASE_CLIENT_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_CLIENT_ANON_KEY}`,
};

const getToken = async () => {
  const session = await supabase.auth.getSession();

  return session.data.session?.access_token;
};

export const getWebsites = async ({
  select = '*',
  accessToken,
}: {
  select?: string;
  accessToken: string | undefined;
}): Promise<Website[]> => {
  const response = await axios.get(`${SUPABASE_URL}/rest/v1/websites`, {
    params: {
      select,
    },
    headers: {
      apikey: SUPABASE_CLIENT_ANON_KEY,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const createNewWebsite = async (website: Website) => {
  const accessToken = await getToken();

  const response = await axios.post(`${SUPABASE_URL}/rest/v1/websites`, website, {
    headers: {
      apikey: SUPABASE_CLIENT_ANON_KEY,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data as Website[];
};

export const getSitePreviews = async (urls: string[]) => {
  const accessToken = await getToken();

  const response = await axios.post(
    `${SUPABASE_URL}/functions/v1/sitePreview`,
    { urls },
    {
      headers: {
        apikey: SUPABASE_CLIENT_ANON_KEY,
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data as SitePreview[];
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_CLIENT_ANON_KEY);
