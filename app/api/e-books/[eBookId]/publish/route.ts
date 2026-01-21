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
            }
        })

        if(!eBook) {
            return new NextResponse("Not Found!", {status: 404})
        }

        if (!eBook.title || !eBook.description || !eBook.imageUrl){
            return new NextResponse("Missing required fields", { status: 400 } )
        }

         // Ensure at least one attachment exists before publishing
         const attachments = await db.eBookAttachment.findMany({
            where: { eBookId: eBook.id }
        });

        if ((attachments ?? []).length === 0) {
            return new NextResponse(
                "No attachments found. Upload file before publishing.",
                { status: 400 }
            );
        }

        const publishedeBook = await db.eBooks.update({
            where: {
                id: eBookId,
            },
            data: {
                isPublished: true,
            }
        })

        return NextResponse.json(publishedeBook)
    } catch (error) {
        console.log("[eBook_PUBLISH]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}