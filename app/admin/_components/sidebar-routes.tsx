"use client"
import { Layers3, NotebookText } from "lucide-react"
import { SidebarItem } from "./sidebar-item";

const adminRoutes = [
    {
        icon: NotebookText,
        label: "Documents",
        href: "/admin/documents",
    },
    {
        icon: Layers3,
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