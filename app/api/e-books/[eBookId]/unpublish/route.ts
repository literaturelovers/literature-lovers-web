import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";

export async function PATCH(
    req: Request,
    { params } : { params: { eBookId: string } }
) {
    try {
        const { eBookId } = params;

        if(!isAdmin()) {
            return new NextResponse("Unauthorized user", {status: 401})
        }

        const eBook = await db.eBooks.findUnique({
            where: {
                id: eBookId,
            },
        })

        if(!eBook) {
            return new NextResponse("Not Found!", {status: 404})
        }

        const unpublishedeBook = await db.eBooks.update({
            where: {
                id: eBookId,
            },
            data: {
                isPublished: false,
            }
        })

        return NextResponse.json(unpublishedeBook)
    } catch (error) {
        console.log("[eBook_UNPUBLISH]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}