"use client"

import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { Category } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Trash, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm.modal";

const deleteCategory = async (categoryId: string) => {
    try {
        await axios.delete(`/api/category/${categoryId}`)
        toast.success("Category deleted");
    } catch (error) {
        toast.error("Something went wrong.")
        console.log("Error while deleting category: ", error)
    }
};

export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Category Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const { id } = row.original;

            return (
                <Link href={`/admin/category/${id}`}>
                    <Button size="sm" variant="outline" >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                    </Button>
                </Link>
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const { id } = row.original;

            return (
                <div className="flex space-x-2">
                    <ConfirmModal onConfirm={() => deleteCategory(id)}>
                        <Button size="sm">
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                    </ConfirmModal>
                </div>
            )
        }
    }
]