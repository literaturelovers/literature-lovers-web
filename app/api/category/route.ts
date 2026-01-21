import { db } from "@/lib/db";
import { isAdmin } from "@/lib/admin";
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
) {
    try {
        const { title } = await req.json()
        if(!isAdmin()) {
            return new NextResponse("Unauthorized request", { status: 401 })
        }

        const existingCategory = await db.category.findFirst({
            where: {
                name: title
            }
        });

        if (existingCategory) {
            return new NextResponse("Category already exists", { status: 400 });
        }

        const category = await db.category.create({
            data: {
                name: title,
            }
        })

        return NextResponse.json(category)
    } catch (error) {
        console.log("[CATEGORY]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}