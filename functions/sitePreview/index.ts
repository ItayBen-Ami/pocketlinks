import { createClient, type PostgrestMaybeSingleResponse } from 'jsr:@supabase/supabase-js@2';
import { DOMParser, Element, HTMLDocument } from 'jsr:@b-fuze/deno-dom';
import { corsHeaders } from './cors.ts';

type Website = {
  id: string;
  name: string;
  url: string;
  icon?: string;
  category: string;
  list_id: number;
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? 'https://fgtfbeukcedamtskstqh.supabase.co';
const SUPABASE_ANON_KEY =
  Deno.env.get('SUPABASE_ANON_KEY') ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZndGZiZXVrY2VkYW10c2tzdHFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODg2MjAsImV4cCI6MjAzODg2NDYyMH0.UQ8TZgJ1gx0V3f3JEiQmp8V9E3fxlcx5sbhW-4H7L2U';

const getFaviconUrl = async (document: HTMLDocument, url: string) => {
  const iconLink =
    document.querySelector('link[rel="icon"]') ||
    document.querySelector('link[rel="shortcut icon"]') ||
    document.querySelector('link[rel="apple-touch-icon"]');

  if (iconLink && iconLink.getAttribute('href')) {
    try {
      return new URL(iconLink.getAttribute('href')!).href;
    } catch {
      return url + iconLink.getAttribute('href');
    }
  }

  const domain = new URL(url).hostname;
  let faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}`;
  try {
    const response = await fetch(faviconUrl);
    if (response.status === 404) faviconUrl = `https://favicone.com/${domain}`;
  } catch {
    faviconUrl = `https://favicone.com/${domain}`;
  }

  return faviconUrl;
};

async function fetchSitePreview(website: Website) {
  try {
    const { url } = website;

    const headers = new Headers();
    headers.set('accept', 'text/html,application/xhtml+xml,application/xml');
    const res = await fetch(url.split('/').slice(0, 3).join('/'), { headers });
    const html = await res.text();

    const document = new DOMParser().parseFromString(html, 'text/html');
    const metaTags = document.querySelectorAll('meta');
    const documentMeta = (Array.from(metaTags) as Element[]).reduce(
      (acc, meta) => {
        const property = meta.getAttribute('property');
        const name = meta.getAttribute('name');
        const content = meta.getAttribute('content');

        if (!content) return acc;
        if (property) acc[property] = content;
        if (name) acc[name] = content;

        return acc;
      },
      {} as Record<string, string>,
    );

    const faviconUrl = await getFaviconUrl(document, url);

    return {
      url,
      title: document.querySelector('title')?.textContent ?? '',
      description:
        documentMeta['description'] || documentMeta['og: description'] || documentMeta['twitter:description'],
      image: documentMeta['og:image'] || documentMeta['twitter:image:src'] || documentMeta['forem:logo'],
      faviconUrl,
    };
  } catch (error) {
    console.error(`Error fetching site preview for ${website.url}:`, error);
    return {
      url: website.url,
      title: 'Error fetching data',
      description: 'Error fetching data',
      image: 'Error fetching data',
      faviconUrl: 'Error fetching data',
    };
  }
}

Deno.serve(async req => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const url = new URL(req.url);

  if (req.method === 'GET' && url.pathname === '/') {
    try {
      const listIdParam = url.searchParams.get('listId');
      if (typeof listIdParam !== 'string') {
        return new Response('Invalid listId', { status: 400 });
      }

      const listId = parseInt(listIdParam as string);

      const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        global: { headers: { Authorization: req.headers.get('Authorization')! } },
      });
      const { data: websites } = (await supabaseClient
        .from('websites')
        .select('*')
        .eq('list_id', listId)) as PostgrestMaybeSingleResponse<Website[]>;

      if (!websites)
        return new Response(JSON.stringify([]), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      const previews = await Promise.all(websites.map(fetchSitePreview));

      return new Response(JSON.stringify(previews), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error processing request:', error);
      return new Response('Internal server error', { status: 500 });
    }
  }

  return new Response('Not found', { status: 404 });
});
