"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Logo } from "@/app/(dashboard)/(routes)/admin/_components/logo";

export const NavbarRoutes = () => {
    const userName = "John Doe"; // This would typically come from user session data

    return (
        <>
            <Link href="/home" className="md:hidden">
                <Logo/>
            </Link>
            <div className="flex gap-x-2 ml-auto">
                <Link href="/home" className="hidden md:block">
                    <Button size="sm" variant="ghost">
                        Home
                    </Button>
                </Link>
                <Link href="/dashboard" className="hidden md:block">
                    <Button size="sm" variant="ghost">
                        Dashboard
                    </Button>
                </Link>
                <div className="text-sm">
                    <Button size="sm" variant="ghost">
                        {userName}
                    </Button>
                </div>
                <Link href="/logout" className="hidden md:block">
                    <Button size="sm" variant="ghost">
                        Logout
                    </Button>
                </Link>
            </div>
        </>
    )
}