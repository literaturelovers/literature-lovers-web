"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { EditCategoryDialog } from "@/components/modals/edit-category.modal"
import { CreateCategoryDialog } from "@/components/modals/create-category.modal"
import { ConfirmModal } from "@/components/modals/confirm.modal";
import { Document } from "@prisma/client";
interface Category {
  id: string;
  name: string;
  createdAt: Date;
  documents: Document[];
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
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Manage Categories</h1>
          <p className="text-sm text-muted-foreground">Manage and organize your categories</p>
        </div>
        <CreateCategoryDialog />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center gap-2 xl:gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="
              relative rounded-xl border border-[#E6EAF2]
              bg-[#ACABBF]
              transition
              hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]
            "
          >
            <div className="bg-[#FBFCFF] p-3 rounded-l-sm rounded-r-xl ml-[6px]">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  {/* Title */}
                  <h3 className="text-[18px] font-semibold text-[#0F172A]">
                    {category.name}
                  </h3>

                  {/* Created On */}
                  <div className="mt-1 flex gap-2">
                    <span
                      className="
                        rounded-full
                        bg-[#F1F5F9]
                        px-3
                        py-1
                        text-[11px]
                        font-semibold
                        tracking-wide
                        text-[#475569]
                      "
                    >
                      {category.documents.length || 0} {category.documents.length === 1 ? "Document" : "Documents"}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 text-[#94A3B8]">
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

              {/* Pills */}
              <div className="mt-5 flex items-center gap-2 text-[13px] text-[#44484e]">
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M8 2v4M16 2v4M3 10h18" />
                </svg>

                <span>
                  Created on{" "}
                  {new Date(category.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default CategoryClient;