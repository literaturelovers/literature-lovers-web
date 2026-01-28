import { db } from "@/lib/db";

export const getCategories = async (): Promise<{ id: string; name: string, createdAt: Date }[]> => {
    try {
        const categories = await db.category.findMany({
            select: {
                name: true,
                id: true,
                createdAt: true
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