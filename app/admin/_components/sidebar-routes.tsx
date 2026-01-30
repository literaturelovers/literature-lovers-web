"use client"
import { LayoutDashboard, FileText } from "lucide-react"
import { SidebarItem } from "./sidebar-item";

const adminRoutes = [
    {
        icon: FileText,
        label: "Documents",
        href: "/admin/documents",
    },
    {
        icon: LayoutDashboard,
        label: "Categories",
        href: "/admin/category",
    },
]


export const SidebarRoutes = () => {

    return(
        <div className="flex flex-col w-full">
            {
                adminRoutes.map((route) => (
                    <SidebarItem
                        key={route.href}
                        icon={route.icon}
                        label={route.label}
                        href={route.href}
                    />
                ))
            }
        </div>
    )
}