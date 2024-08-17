import { groupBy } from "lodash";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Website } from "../../clients/supabase/types";
import ActionsButton from "./ActionsButton";

type WebsitesCommandListProps = {
  websites: Website[];
  loading: boolean;
};

export default function WebsitesCommandList({
  websites,
  loading,
}: WebsitesCommandListProps) {
  const websitesByCategory = groupBy(websites, "category");

  return (
    <div className="w-[60vw] h-[70vh]">
      <Command className="rounded-lg border-border border-2 shadow-2xl">
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>
            {loading ? "Loading..." : "No results found."}
          </CommandEmpty>
          {Object.keys(websitesByCategory).map((categoryName, index) => (
            <div>
              <CommandGroup heading={categoryName}>
                {websitesByCategory[categoryName].map((website) => (
                  <CommandItem className="h-11">
                    <div
                      className="flex gap-3 size-full items-center cursor-pointer"
                      onClick={() => {
                        window.location.href = website.url;
                      }}
                    >
                      <img src={website.icon} className="size-5" />
                      <span className="text-md">{website.name}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
              {index < Object.keys(websitesByCategory).length - 1 && (
                <CommandSeparator />
              )}
            </div>
          ))}
        </CommandList>
        <CommandSeparator />
        <div className="flex justify-end w-full">
          <ActionsButton />
        </div>
      </Command>
    </div>
  );
}
