import { Website } from '@clients/supabase/types';
import CardBody from './CardBody';
import { Skeleton } from '@components/ui/skeleton';

type CardSkeletonProps = {
  website: Website;
};

export default function CardSkeleton({ website }: CardSkeletonProps) {
  return (
    <>
      <CardBody
        website={website}
        header={<Skeleton className="size-6 rounded-full" />}
        body={<Skeleton className="h-44 w-full rounded-xl" />}
        footer={<Skeleton className="h-[125px] w-full rounded-xl" />}
      />
    </>
  );
}
