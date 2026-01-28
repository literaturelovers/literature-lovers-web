import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { documentId: string } }
) {
    try {
        const document = await db.document.findUnique({
            where: {
                id: params.documentId,
                isPublished: true,
            },
            select: {
                id: true,
            }
        });

        if (!document) {
            return new NextResponse("Document not found", { status: 404 });
        }

        return new NextResponse("Enrolled successfully", { status: 200 });
    } catch (error) {
        console.error("[FREE_document_ENROLL]: ", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}