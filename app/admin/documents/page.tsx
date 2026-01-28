import { redirect } from "next/navigation";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { isAdmin } from "@/lib/admin";
import { getDocuments } from "@/actions/get-documents";

const DocumentsPage = async () => {
    if (!isAdmin()) {
        return redirect("/");
    }
    const documents = await getDocuments();

    return (
        <div className="p-6">
            <DataTable columns={columns} data={documents} />
        </div>
    );
}

export default DocumentsPage;