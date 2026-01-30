import Image from "next/image";
import Link from 'next/link';
import { SidebarRoutes } from "./sidebar-routes";

const Sidebar = () => {
    return (
        <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
            <Link href={"/"} className="w-full flex items-center justify-center p-6">
                <Image
                    height={120}
                    width={120}
                    alt="logo"
                    src="/logo.png"
                    sizes="120px"
                />
            </Link>
            <div className="flex flex-col w-full">
                <SidebarRoutes />
            </div>
        </div>
    );
}

export default Sidebar;