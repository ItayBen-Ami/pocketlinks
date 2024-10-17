import { Website } from '@clients/supabase/types';
import useGetSignedUrl from '@hooks/useGetSignedUrl';
import { CommandItem } from '@/components/ui/command';

export default function WebsiteRow({ website }: { website: Website }) {
  const { signedUrl } = useGetSignedUrl({ icon: website.icon });

  return (
    <CommandItem className="h-11">
      <div
        className="flex gap-3 size-full items-center cursor-pointer"
        onClick={() => {
          window.location.href = website.url;
        }}
        key={website.id}
      >
        <img src={signedUrl ?? 'https://www.google.com/s2/favicons?domain=' + website.url} className="size-5" />
        <span className="text-md">{website.name}</span>
      </div>
    </CommandItem>
  );
}
