import { db } from "@/lib/db";
import {  isAdmin } from "@/lib/admin";
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
) {
    try {
        const { title } = await req.json()

        if(!isAdmin()) {
            return new NextResponse("Unauthorized request", { status: 401 })
        }

        const ebook = await db.eBooks.create({
            data: {
                title,
            }
        })

        return NextResponse.json(ebook)
    } catch (error) {
        console.log("[EBOOK]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}