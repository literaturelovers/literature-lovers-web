import Link from "next/link"
import { Logo } from "../admin/_components/logo"
import { Button } from "@/components/ui/button"
import { MobileNav } from "./mobile-nav"

export const Navbar = () => {
    return (
        <div className="w-full p-4 border-b h-[100px] flex items-center bg-white shadow-sm">
            <div className="max-w-7xl mx-auto w-full flex items-center">
                <Link href="/home" className="p-2">
                    <Logo/>
                </Link>
                <div className="flex gap-x-2 ml-auto">
                    <Link href="/" className="hidden md:block">
                        <Button size="sm" variant="customoutlinebtn" className="text-base font-normal px-6 py-4">
                            Home
                        </Button>
                    </Link>
                    <Link href="/courses" className="hidden md:block">
                        <Button size="sm" variant="customoutlinebtn" className="text-base font-normal px-6 py-4">
                            Courses
                        </Button>
                    </Link>
                    <Link href="/ugc-papers" className="hidden md:block">
                        <Button size="sm" variant="customoutlinebtn" className="text-base font-normal px-6 py-4">
                            UGC NET PREVIOUS YEAR PAPERS
                        </Button>
                    </Link>
                    <Link href="/login" className="hidden md:block">
                        <Button size="sm" variant="customprimarybtn" className="text-base font-normal px-6 py-4">
                            Login
                        </Button>
                    </Link>
                </div>
            </div>
            <MobileNav/>
        </div>
    )
}