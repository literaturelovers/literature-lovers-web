import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";
import { Navbar } from "./_components/navbar";
import Sidebar from "./_components/sidebar";

const AdminLayout = async ({
    children
}: {
    children: React.ReactNode;
}) => {

    if (!(await isAdmin())) {
        redirect("/");
    }

    return (
        <div className="">
            <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-40">
                <Navbar/>
            </div>
            <div className="hidden md:flex top-0 left-0 h-full w-56 flex-col fixed inset-y-0 z-40">
                <Sidebar/>
            </div>
            <main className="md:pl-56 pt-[80px] min-h-screen">
                {children}
            </main>
        </div>
    )
}

export default AdminLayout;