import { ToggleGroup, ToggleGroupItem } from '@components/ui/toggle-group';
import { LayoutTypes } from './layout';
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip';
import { LayoutGrid, TableCellsMerge } from 'lucide-react';

export default function LayoutToggleGroup({
  currentLayout,
  onCurrentLayoutChange,
}: {
  currentLayout: string;
  onCurrentLayoutChange: (value: LayoutTypes) => void;
}) {
  return (
    <div className="flex justify-start">
      <div className="flex flex-col items-start gap-2">
        <div className="text-lg">Layout</div>
        <ToggleGroup
          onValueChange={value => value && onCurrentLayoutChange(value as LayoutTypes)}
          value={currentLayout}
          type="single"
          className="gap-0"
        >
          <Tooltip>
            <TooltipTrigger>
              <ToggleGroupItem value="layoutGrid">
                <LayoutGrid />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>Grid</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <ToggleGroupItem value="bentoGrid">
                <TableCellsMerge />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>Bento</TooltipContent>
          </Tooltip>
        </ToggleGroup>
      </div>
    </div>
  );
}
