import { SitePreview, Website as SupabaseWebsite } from '@clients/supabase/types';

export interface Website extends SupabaseWebsite {
  sitePreview: SitePreview;
}
