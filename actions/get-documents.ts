import { db } from "@/lib/db";
import { Document } from "@prisma/client";

export const getDocuments = async (): Promise<Document[]> => {
    try {
        const documents = await db.document.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                categoryId: true,
                isPublished: true,
                createdAt: true,
                resourceUrl: true,
                updatedAt: true,
                category: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
            orderBy: {
                title: "asc"
            }
        })

        return documents;
    } catch (error) {
        console.log("[GET_DOCS: ", error);
        return [];
    }
}