export interface Website {
  id?: string;
  name: string;
  url: string;
  icon?: string;
  category: string;
  list_id?: number;
}

export type SitePreview = {
  title: string;
  description: string;
  image: string;
  url: string;
  faviconUrl: string;
};

export type List = {
  id?: string;
  name: string;
  is_public: boolean;
  user_id?: string;
  imageUrl: string;
};
