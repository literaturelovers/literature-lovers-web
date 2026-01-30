'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { MobileNav } from "./mobile-nav";
import { cn } from "@/lib/utils";


const routes = [
    { label: "Home", href: "https://www.literaturelovers.in" },
    { label: "Courses", href: "https://www.literaturelovers.in/courses" },
    { label: "UGC NET PREVIOUS YEAR PAPERS", href: "/" },
];

export const Navbar = () => {
    const pathname = usePathname();
    return (
        <div className="w-full p-4 lg:px-10 lg:py-5 border-b h-[100px] flex items-center bg-white shadow-[0px_2px_8px_rgba(10,22,41,0.1)]">
            <div className="w-full flex items-center justify-between">
                <Link href="https://www.literaturelovers.in">
                    <Logo/>
                </Link>
                <div className="flex gap-x-5">
                    {
                        routes.map((route, idx) => {
                            const isActive =
                                pathname === route.href ||
                                (route.href.startsWith("http") && false); // external links won't match pathname

                            return (
                                <Link key={idx} href={route.href} target={route.href.startsWith("http") ? "_blank" : undefined}>
                                    <button
                                        className={cn(
                                            "hidden md:block px-6 py-5 rounded text-base font-normal tracking-wide text-[#F41828] hover:bg-[#F4182810]",
                                            isActive && "bg-[#F4182810] font-bold"
                                        )}
                                    >
                                        {route.label}
                                    </button>
                                </Link>
                            );
                        })
                    }
                    <Link href="/login" className="hidden md:block">
                        <button className="text-sm font-bold active:font-bold tracking-wide px-6 py-4 rounded-[8px] bg-[#F41828] text-white">
                            Login
                        </button>
                    </Link>
                </div>
            </div>
            <MobileNav/>
        </div>
    )
}