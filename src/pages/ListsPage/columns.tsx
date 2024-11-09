import { ColumnDef } from '@tanstack/react-table';
import { List } from '@clients/supabase/types';
import Image from './Image';
import ListAccess from './ListAccess';
import ListActions from './ListActions';

export const getColumns = (
  onSelectedListChange: (list: List) => void,
  openEditModal: () => void,
): ColumnDef<List & { websitesCount: number }>[] => [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ cell, row }) => (
      <div className="flex justify-start items-center gap-4">
        <Image list={row.original} />
        <div className="text-card-foreground">{cell.getValue() as string}</div>
      </div>
    ),
  },
  {
    header: '# of Websites',
    accessorKey: 'websitesCount',
    cell: ({ cell }) => <div className="text-card-foreground">{cell.getValue() as string}</div>,
  },
  {
    header: 'Access',
    accessorKey: 'is_public',
    cell: ({ cell, row }) => <ListAccess isPublic={cell.getValue() as boolean} listId={row.original.id ?? ''} />,
  },
  {
    header: 'Actions',
    cell: ({ row }) => (
      <ListActions list={row.original} onSelectedListChange={onSelectedListChange} openEditModal={openEditModal} />
    ),
  },
];
