import { db } from "@/lib/db";
import {  isAdmin } from "@/lib/admin";
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
) {
    try {
        const { title, description, categoryId, resourceUrl } = await req.json()

        if(!isAdmin()) {
            return new NextResponse("Unauthorized request", { status: 401 })
        }

        const document = await db.document.create({
            data: {
                title,
                description,
                categoryId,
                resourceUrl,
            }
        })

        return NextResponse.json(document)
    } catch (error) {
        console.log("[DOCUMENT]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}