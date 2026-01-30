"use client"

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Document } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Document>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "category.name",
        header: () => {
            return (
                <Button
                    variant="ghost"
                >
                    Category
                </Button>
            )
        },
    },
    {
        accessorKey: "isPublished",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Published
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const isPublished = row.getValue("isPublished") || false;

            return (
                <Badge className={cn(
                    "bg-slate-500",
                    isPublished && "bg-black"
                )}>
                    {
                        isPublished ? "Published" : "Draft"
                    }
                </Badge>
            )
        }
    },
    {
        id: "actions",
        header: () => {
            return (
                <Button
                    variant="ghost"
                >
                    Actions
                </Button>
            )
        },
        cell: ({ row }) => {
            const { id } = row.original;

            return (
                <Link href={`/admin/documents/${id}`} className="w-full flex items-center justify-center">
                    <Button variant="outline">
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                    </Button>
                </Link>
            )
        }
    }
]
