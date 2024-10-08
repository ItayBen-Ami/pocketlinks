import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

const SUPABASE_URL = 'https://fgtfbeukcedamtskstqh.supabase.co';
const SUPABASE_CLIENT_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZndGZiZXVrY2VkYW10c2tzdHFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODg2MjAsImV4cCI6MjAzODg2NDYyMH0.UQ8TZgJ1gx0V3f3JEiQmp8V9E3fxlcx5sbhW-4H7L2U';

axios.defaults.headers.common = {
  apikey: SUPABASE_CLIENT_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_CLIENT_ANON_KEY}`,
};

export const getWebsites = async (select: string = '*') => {
  const response = await axios.get(`${SUPABASE_URL}/rest/v1/websites`, {
    params: {
      select,
    },
  });

  return response.data;
};

const supabase = createClient(SUPABASE_URL, SUPABASE_CLIENT_ANON_KEY);
export { supabase };
