"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { EditCategoryDialog } from "@/components/modals/edit-category.modal"
import { CreateCategoryDialog } from "@/components/modals/create-category.modal"
import { ConfirmModal } from "@/components/modals/confirm.modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Category {
    id: string;
    name: string;
    createdAt: Date;
}

interface CategoryClientProps {
  categories: Category[];
}

const CategoryClient = ({ categories }: CategoryClientProps) => {

  const deleteCategory = async (categoryId: string) => {
    try {
        await axios.delete(`/api/category/${categoryId}`)
        toast.success("Category deleted");
    } catch (error) {
        toast.error("Something went wrong.")
        console.log("Error while deleting category: ", error)
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <CreateCategoryDialog />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="group border border-muted bg-card/60 hover:bg-card hover:shadow-md hover:border-primary/80 transition duration-500"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  {category.name}
                </CardTitle>

                <div className="flex items-center gap-2">
                  <EditCategoryDialog category={category} />
                  <ConfirmModal onConfirm={() => deleteCategory(category.id)}>
                    <button
                      type="button"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-destructive/30 bg-destructive/5 text-destructive shadow-sm transition hover:bg-destructive/10"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 18.5C2.45 18.5 1.97933 18.3043 1.588 17.913C1.19667 17.5217 1.00067 17.0507 1 16.5V3.5H0V1.5H5V0.5H11V1.5H16V3.5H15V16.5C15 17.05 14.8043 17.521 14.413 17.913C14.0217 18.305 13.5507 18.5007 13 18.5H3ZM13 3.5H3V16.5H13V3.5ZM5 14.5H7V5.5H5V14.5ZM9 14.5H11V5.5H9V14.5Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </ConfirmModal>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <p className="text-xs text-muted-foreground">
                Created on{" "}
                {new Date(category.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryClient;