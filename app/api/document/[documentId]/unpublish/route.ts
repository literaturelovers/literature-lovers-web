import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";

export async function PATCH(
    req: Request,
    { params } : { params: { documentId: string } }
) {
    try {
        const { documentId } = params;

        if(!isAdmin()) {
            return new NextResponse("Unauthorized user", {status: 401})
        }

        const document = await db.document.findUnique({
            where: {
                id: documentId,
            },
        })

        if(!document) {
            return new NextResponse("Not Found!", {status: 404})
        }

        const unpublishedDocument = await db.document.update({
            where: {
                id: documentId,
            },
            data: {
                isPublished: false,
            }
        })

        return NextResponse.json(unpublishedDocument)
    } catch (error) {
        console.log("[DOC_UNPUBLISH]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}