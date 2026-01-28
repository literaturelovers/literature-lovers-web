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
            }
        })

        if(!document) {
            return new NextResponse("Not Found!", {status: 404})
        }

        if (!document.title || !document.description || !document.imageUrl){
            return new NextResponse("Missing required fields", { status: 400 } )
        }

         // Ensure at least one attachment exists before publishing
         const attachments = await db.documentAttachment.findMany({
            where: { documentId: document.id }
        });

        if ((attachments ?? []).length === 0) {
            return new NextResponse(
                "No attachments found. Upload file before publishing.",
                { status: 400 }
            );
        }

        const publishedDocument = await db.document.update({
            where: {
                id: documentId,
            },
            data: {
                isPublished: true,
            }
        })

        return NextResponse.json(publishedDocument)
    } catch (error) {
        console.log("[DOC_PUBLISH]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}