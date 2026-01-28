"use client";

import { Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import { useState } from "react";

export const MobileSidebar = () => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(false);
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
                <Menu />
            </SheetTrigger>
            <SheetContent
                side="left"
                className="p-0 bg-white"
                onClick={handleClick}
            >
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
};
