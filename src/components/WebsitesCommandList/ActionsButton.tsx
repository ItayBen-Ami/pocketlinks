import { Button } from "@/components/ui/button";
import { Command as CommandIcon } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useState } from "react";
import useCommandKeyListener from "@/hooks/useCommandKeyListener";
import ActionsMenu from "./ActionsMenu";

export default function ActionsButton() {
    const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);

    const handleChangeActionMenuOpen = () => {
        setIsActionsMenuOpen(!isActionsMenuOpen)
    }

    useCommandKeyListener({ key: "k", callback: handleChangeActionMenuOpen })

    return (
        <Popover open={isActionsMenuOpen}>
            <PopoverTrigger>
                <div className="flex justify-start p-2" onClick={handleChangeActionMenuOpen}>
                    <Button variant="ghost" className="size-lg flex gap-0.5">
                        <div className="text-md mx-2">Actions</div>
                        <Button variant="secondary" size="sm">
                            <CommandIcon className="size-3" />
                        </Button>
                        <Button variant="secondary" size="sm">
                            <div className="text-sm">
                                K
                            </div>
                        </Button>
                    </Button>
                </div>
            </PopoverTrigger>
            <PopoverContent side="top" align="end"><ActionsMenu /></PopoverContent>
        </Popover>
    )
}