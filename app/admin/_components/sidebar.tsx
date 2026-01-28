import { Logo } from "./logo";
import Link from 'next/link';
import { SidebarRoutes } from "./sidebar-routes";

const Sidebar = () => {
    return (
        <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
            <Link href={"/"} className="p-6">
                <Logo />
            </Link>
            <div className="flex flex-col w-full">
                <SidebarRoutes />
            </div>
        </div>
    );
}

export default Sidebar;