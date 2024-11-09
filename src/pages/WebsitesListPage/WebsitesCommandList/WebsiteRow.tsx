import { Website } from '@clients/supabase/types';
import { CommandItem } from '@components/ui/command';
import Favicon from '../Favicon';

export default function WebsiteRow({ website }: { website: Website }) {
  return (
    <CommandItem className="h-11">
      <div
        className="flex gap-3 size-full items-center cursor-pointer"
        onClick={() => {
          window.location.href = website.url;
        }}
      >
        <Favicon website={website} withAnimation={false} />
        <span className="text-md">{website.name}</span>
      </div>
    </CommandItem>
  );
}
