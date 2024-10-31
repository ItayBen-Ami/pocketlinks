import { useLoaderData } from 'react-router-dom';
import { List } from '@clients/supabase/types';

export default function ListsPage() {
  const { lists } = useLoaderData() as { lists: List[] };

  return <div className="flex items-start justify-start mt-8 ml-24 text-3xl">My Lists</div>;
}
