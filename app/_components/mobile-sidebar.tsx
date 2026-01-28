"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const homeRoutes = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Courses",
    href: "/courses",
  },
  {
    label: "UGC NET PREVIOUS YEAR PAPERS",
    href: "/ugc-papers",
  },
];

const MobileSidebar = () => {
    const pathname = usePathname();

    return (
        <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
            {
                homeRoutes.map((route, idx) => {
                    const isActive = pathname === route.href;

                    return (
                    <Link key={idx} href={route.href}>
                        <Button
                            size="sm"
                            variant="customoutlinebtn"
                            className={cn(
                                "text-base font-normal px-6 py-4 h-[52px] w-full justify-start",
                                isActive &&
                                "bg-[#F4182840]"
                        )}
                        >
                            {route.label}
                        </Button>
                    </Link>
                    );
                })
            }

            <Link href="/login" className="block md:hidden">
                <Button
                    size="sm"
                    variant="customprimarybtn"
                    className="text-base font-normal px-6 py-4 h-[52px] w-full justify-start"
                >
                    Login
                </Button>
            </Link>
        </div>
    );
};

export default MobileSidebar;