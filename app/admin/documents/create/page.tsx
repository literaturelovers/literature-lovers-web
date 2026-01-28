import { getCategories } from "@/actions/get-categories";
import { CreateDocumentForm } from "./_components/create-document-form";
import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

const CreatePage = async () => {
  if (!isAdmin()) {
    return redirect("/");
  }

  const categories = await getCategories();

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-full p-6">
      <h1 className="text-2xl">Create a Document</h1>
      <p className="text-sm text-slate-600">
        Fill in all details to create your document. You can edit everything later.
      </p>
      <CreateDocumentForm
        categoryOptions={categories.map((c) => ({ label: c.name, value: c.id }))}
      />
    </div>
  );
};

export default CreatePage;