import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";
import { getCategories } from "@/actions/get-categories";
import CategoryClient from "./_components/category-client";


const CategoryPage = async () => {
    if (!isAdmin()) {
        return redirect("/");
    }

    const categories = await getCategories();

    return (
        <div className="p-6">
            <CategoryClient categories={categories} />
        </div>
    );
}

export default CategoryPage;