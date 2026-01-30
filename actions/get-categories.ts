import { db } from "@/lib/db";
import { Document } from "@prisma/client";

export const getCategories = async (): Promise<{ id: string; name: string, createdAt: Date, documents: Document[] }[]> => {
    try {
        const categories = await db.category.findMany({
            select: {
                name: true,
                id: true,
                createdAt: true,
                documents: {
                    select: {
                        id: true,
                        title: true,
                        categoryId: true,
                        isPublished: true,
                        createdAt: true,
                        updatedAt: true,
                        resourceUrl: true,
                        description: true,
                    },
                }
            },
            orderBy: {
                name: "asc"
            }
        })

        return categories;
    } catch (error) {
        console.log("[GET_CATEGORIES: ", error);
        return [];
    }
}