"use client";

import { Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import MobileSidebar from "./mobile-sidebar";
import { useState } from "react";

export const MobileNav = () => {
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
                className="p-0 bg-white w-full"
                onClick={handleClick}
            >
                <MobileSidebar />
            </SheetContent>
        </Sheet>
    );
};
