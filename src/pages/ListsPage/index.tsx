import { useLoaderData, useNavigate } from 'react-router-dom';
import { List } from '@clients/supabase/types';
import { DataTable } from '@components/ui/data-table';
import { getColumns } from './columns';
import { Button } from '../../components/ui/button';
import ListWizard from './ListWizard';
import { useState } from 'react';

export default function ListsPage() {
  const { lists } = useLoaderData() as {
    lists: (List & { websitesCount: number })[];
  };

  const navigate = useNavigate();

  const [isListWizardOpen, setListWizardOpen] = useState(false);
  const [selectedList, setSelectedList] = useState<List | undefined>(undefined);

  const columns = getColumns(setSelectedList, () => setListWizardOpen(true));
  return (
    <>
      <div className="flex flex-col gap-8 mt-8">
        <div className="flex items-start justify-start container text-3xl">My Lists</div>
        <div className="container flex justify-end">
          <Button onClick={() => setListWizardOpen(true)}>Add List</Button>
        </div>
        <div className="container mx-auto">
          <DataTable
            columns={columns}
            data={lists}
            onRowClick={(id: string) => {
              const listId = lists.find(list => list.id === id)?.id;
              if (listId) navigate(`/lists/${listId}/websites`);
            }}
          />
        </div>
      </div>
      <ListWizard list={selectedList} isOpen={isListWizardOpen} onChangeOpen={setListWizardOpen} />
    </>
  );
}
