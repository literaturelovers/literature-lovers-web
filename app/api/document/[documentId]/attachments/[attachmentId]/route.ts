import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";

export async function DELETE(
    req: Request,
    { params }:  { params: { documentId: string, attachmentId: string }}
) {
    try {
        const { attachmentId } = params;
        if (!isAdmin()) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const deleted = await db.documentAttachment.delete({
            where: {
                id: attachmentId,
                documentId: params.documentId
            },
        });
        return NextResponse.json(deleted);
    } catch (error) {
        console.log("[DOC_ATTACHMENT_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
