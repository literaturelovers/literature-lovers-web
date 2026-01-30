"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { Button } from "./ui/button";
import { Logo } from "@/components/logo";
import { CircleUser } from "lucide-react";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogTrigger
} from "./ui/dialog";


function capitalizeWords(str: string): string {
    return str
        .split(" ")
        .map((word: string) =>
            word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ");
}

export const NavbarRoutes = () => {
    const [userName, setUserName] = useState<string>("");

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUserName(parsedUser?.name || "User");
            } catch {
                setUserName("User");
            }
        }
    }, []);

    const [dialogOpen, setDialogOpen] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await axios.post("/api/auth/logout");
            localStorage.removeItem("user");
            toast(<span><b>Logged out!</b><br />You have been logged out successfully.</span>);
            router.push("/login");
        } catch {
            toast(<span><b>Logout failed</b><br />An error occurred during logout. Please try again.</span>);
        }
    };

    return (
        <>
            <Link href="/" className="md:hidden">
                <Logo/>
            </Link>
            <div className="flex gap-x-2 ml-auto">
                <Link href="/" className="hidden md:block">
                    <Button size="sm" variant="ghost">
                        Home
                    </Button>
                </Link>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <div className="flex items-center gap-1 cursor-pointer">
                            <CircleUser size="28" />
                            <div className="hidden sm:flex flex-col gap-2">
                                <span className="text-sm font-bold leading-none">{ userName ? capitalizeWords(userName) : "Unknown" }</span>
                            </div>
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Log Out</DialogTitle>
                            <div>Are you sure you want to log out?</div>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="destructive" onClick={handleLogout}>Log Out</Button>
                            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}