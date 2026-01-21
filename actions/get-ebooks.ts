import { db } from "@/lib/db";
import { EBooks } from "@prisma/client";

export const getEbooks = async (): Promise<EBooks[]> => {
    try {
        const ebooks = await db.eBooks.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                imageUrl: true,
                categoryId: true,
                isPublished: true,
                createdAt: true,
                resourceUrl: true,
                updatedAt: true,
            },
            orderBy: {
                title: "asc"
            }
        })

        return ebooks;
    } catch (error) {
        console.log("[GET_EBOOKS: ", error);
        return [];
    }
}