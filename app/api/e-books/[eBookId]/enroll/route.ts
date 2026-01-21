import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { eBookId: string } }
) {
    try {
        const eBook = await db.eBooks.findUnique({
            where: {
                id: params.eBookId,
                isPublished: true,
            },
            select: {
                id: true,
            }
        });

        if (!eBook) {
            return new NextResponse("eBook not found", { status: 404 });
        }

        return new NextResponse("Enrolled successfully", { status: 200 });
    } catch (error) {
        console.error("[FREE_eBook_ENROLL]: ", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}