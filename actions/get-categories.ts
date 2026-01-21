import { db } from "@/lib/db";

export const getCategories = async (): Promise<{ id: string; name: string }[]> => {
    try {
        const categories = await db.category.findMany({
            select: {
                name: true,
                id: true,
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