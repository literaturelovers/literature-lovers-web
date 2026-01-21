import { redirect } from "next/navigation";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { isAdmin } from "@/lib/admin";
import { getEbooks } from "@/actions/get-ebooks";

const EBooksPage = async () => {
    if (!isAdmin()) {
        return redirect("/");
    }
    const ebooks = await getEbooks();

    return (
        <div className="p-6">
            <DataTable columns={columns} data={ebooks} />
        </div>
    );
}

export default EBooksPage;