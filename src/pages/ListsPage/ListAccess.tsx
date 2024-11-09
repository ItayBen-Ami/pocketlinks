import clsx from 'clsx';
import { LockKeyhole, LockKeyholeOpen } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@clients/supabase';

export default function ListAccess({ isPublic, listId }: { isPublic: boolean; listId: string }) {
  const queryClient = useQueryClient();

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setIsAccessPublic(!isAccessPublic);
    updateListAcces(!isAccessPublic);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
  };

  const [isAccessPublic, setIsAccessPublic] = useState(isPublic);

  const { mutate: updateListAcces } = useMutation({
    mutationFn: async (isPublic: boolean) =>
      await supabase.from('lists').update({ is_public: isPublic }).eq('id', listId),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['lists'] }),
  });

  return (
    <div className="relative" onClick={handleClick}>
      <div
        className={clsx(
          'absolute inset-0 transition-opacity duration-200 size-6',
          isAccessPublic ? 'opacity-0' : 'opacity-100',
        )}
      >
        <Tooltip>
          <TooltipTrigger>
            <Button variant="ghost">
              <LockKeyhole className="text-muted-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Public</TooltipContent>
        </Tooltip>
      </div>
      <div
        className={
          (clsx('absolute inset-0 transition-opacity duration-200 size-6'),
          isAccessPublic ? 'opacity-100' : 'opacity-0')
        }
      >
        <Tooltip>
          <TooltipTrigger>
            <Button variant="ghost">
              <LockKeyholeOpen className="text-primary" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Private</TooltipContent>
        </Tooltip>
      </div>
      {isClicked && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="flex size-full justify-start items-center pl-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className={`spark animate-spark-${i} bg-blue-300 size-1 rounded-full`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
