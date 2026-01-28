import { db } from "@/lib/db";
import { NextResponse } from "next/server"
import { isAdmin } from "@/lib/admin";

export async function DELETE(
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

        const deletedDocument = await db.document.delete({
            where: {
                id: documentId,
            }
        })

        return NextResponse.json(deletedDocument)
    } catch (error) {
        console.log("[DOCUMENT_DELETE]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params } : { params: { documentId: string } }
) {
    try {
        const { documentId } = params;
        const values = await req.json();

        if(!isAdmin()) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        const existingDocument = await db.document.findUnique({
            where: {
                id: documentId,
            },
        })

        if(!existingDocument) {
            return new NextResponse("Not Found!", {status: 404})
        }

        const updatedDocument = await db.document.update({
            where: {
                id: documentId,
            },
            data: {
                ...values,
            }
        })

        return NextResponse.json(updatedDocument)
    } catch (error) {
        console.log("[DOC_ID]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}