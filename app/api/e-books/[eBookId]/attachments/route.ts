import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";

export async function POST(
    req: Request,
    { params }: { params: { eBookId: string } }
) {
    try {
        const { eBookId } = params;
        const { url, name } = await req.json();

        if (!isAdmin()) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const attachment = await db.eBookAttachment.create({
            data: {
                url,
                name: name || url.split("/").pop(),
                eBookId,
            },
        });
        return NextResponse.json(attachment);
    } catch (error) {
        console.log("[EBOOK_ATTACHMENT_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(
    req: Request,
    { params }: { params: { eBookId: string } }
) {
    try {
        const { eBookId } = params;
        const attachments = await db.eBookAttachment.findMany({
            where: { eBookId },
            orderBy: { createdAt: "desc" }
        });
        return NextResponse.json(attachments);
    } catch (error) {
        console.log("[EBOOK_ATTACHMENT_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
