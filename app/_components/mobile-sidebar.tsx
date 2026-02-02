"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const homeRoutes = [
  {
    label: "Home",
    href: "https://www.literaturelovers.in",
  },
  {
    label: "Courses",
    href: "https://www.literaturelovers.in/courses",
  },
  {
    label: "UGC NET PREVIOUS YEAR PAPERS",
    href: "/",
  },
];

const MobileSidebar = () => {
    const pathname = usePathname();

    return (
        <div className="h-full border-r flex flex-col items-center gap-y-3 overflow-y-auto bg-white shadow-sm">
            {
                homeRoutes.map((route, idx) => {
                    const isActive =
                        pathname === route.href ||
                        (route.href.startsWith("http") && false); // external links won't match pathname

                    return (
                    <Link key={idx} href={route.href} className="w-full">
                        <button
                            className={cn(
                                "text-base font-normal px-6 py-5 hover:bg-[#F4182810] rounded min-h-min w-full tracking-wide text-[#F41828]",
                                isActive &&
                                "bg-[#F4182810] font-bold"
                        )}
                        >
                            {route.label}
                        </button>
                    </Link>
                    );
                })
            }

            <Link href="https://courses.literaturelovers.in/login?orgCode=wuhud" className="block md:hidden">
                <button
                    className="h-[52px] max-w-min text-sm font-bold active:font-bold tracking-wide px-6 py-4 rounded-[8px] bg-[#F41828] text-white"
                >
                    Login
                </button>
            </Link>
        </div>
    );
};

export default MobileSidebar;