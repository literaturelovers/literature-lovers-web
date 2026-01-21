import Link from "next/link"
import { Logo } from "../../admin/_components/logo"
import { Button } from "@/components/ui/button"

export const Navbar = () => {
    return (
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
             <Link href="/home" className="p-2">
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
            </div>
        </div>
    )
}