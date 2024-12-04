import { cn } from '@/lib/utils';

export type LayoutTypes = 'layoutGrid' | 'bentoGrid';

export const containerClassNameByType: Record<LayoutTypes, string> = {
  layoutGrid: 'grid-cols-1 md:grid-cols-4 grid gap-8',
  bentoGrid: 'grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[19rem]',
};

export const itemClassNameByType: Record<LayoutTypes, (index: number) => string> = {
  layoutGrid: () => '',
  bentoGrid: index =>
    cn(
      'row-span-1 p-4 justify-between flex flex-col space-y-4 overflow-hidden',
      index > 0 && index % 3 === 0 ? 'md:col-span-2' : '',
    ),
};
