import { Navbar } from "./_components/navbar";

const UserLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {

    return (
        <div className="">
            <div className="h-[80px] fixed inset-y-0 w-full z-40">
                <Navbar/>
            </div>
            <main className="pt-[80px] min-h-screen">
                {children}
            </main>
        </div>
    )
}

export default UserLayout;