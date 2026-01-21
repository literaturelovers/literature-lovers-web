import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";

export async function DELETE(
    req: Request,
    { params }:  { params: { eBookId: string, attachmentId: string }}
) {
    try {
        const { attachmentId } = params;
        if (!isAdmin()) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const deleted = await db.eBookAttachment.delete({
            where: {
                id: attachmentId,
                eBookId: params.eBookId
            },
        });
        return NextResponse.json(deleted);
    } catch (error) {
        console.log("[EBOOK_ATTACHMENT_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
