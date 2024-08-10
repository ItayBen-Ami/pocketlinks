import { groupBy } from "lodash";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import { Website } from "../clients/supabase/types";

type WebsitesCommandListProps = {
    websites: Website[],
    loading: boolean
}

export default function WebsitesCommandList({ websites, loading }: WebsitesCommandListProps) {
    const websitesByCategory = groupBy(websites, "category")

    return (
        <div>
            <Command className="rounded-lg border shadow-md w-96">
                <CommandInput placeholder="Search..." />
                <CommandList>
                    <CommandEmpty>{loading ? "Loading..." : "No results found."}</CommandEmpty>
                    {
                        Object.keys(websitesByCategory).map((categoryName, index) => (
                            <div>
                                <CommandGroup heading={categoryName}>
                                    {
                                        websitesByCategory[categoryName].map((website) => (
                                            <CommandItem>
                                                <div className="flex gap-2 size-full items-center cursor-pointer"
                                                    onClick={() => { window.open(website.url, "_blank") }}>
                                                    <img src={website.icon} className="size-4" />
                                                    <span>{website.name}</span>
                                                </div>
                                            </CommandItem>
                                        ))
                                    }
                                </CommandGroup>
                                {index < Object.keys(websitesByCategory).length - 1 && <CommandSeparator />}
                            </div>
                        ))
                    }
                </CommandList>
            </Command>
        </div>
    )
}