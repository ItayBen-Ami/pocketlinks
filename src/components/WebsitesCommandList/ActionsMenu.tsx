import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ActionsMenu() {
    return (
        <div className="flex flex-col gap-y-2">
            <Button variant="ghost" className="w-full">
                <div className="flex justify-start items-center gap-2 w-full">
                    <CirclePlus className="text-green-500" />
                    <div>Add Link</div>
                </div>
            </Button>
        </div>
    )
}