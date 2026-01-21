import { db } from "@/lib/db";
import { NextResponse } from "next/server"
import { isAdmin } from "@/lib/admin";

export async function DELETE(
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

        const deletedeBook = await db.eBooks.delete({
            where: {
                id: eBookId,
            }
        })

        return NextResponse.json(deletedeBook)
    } catch (error) {
        console.log("[eBook_DELETE]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params } : { params: { eBookId: string } }
) {
    try {
        const { eBookId } = params;
        const values = await req.json();

        if(!isAdmin()) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        const existingEBook = await db.eBooks.findUnique({
            where: {
                id: eBookId,
            },
        })

        if(!existingEBook) {
            return new NextResponse("Not Found!", {status: 404})
        }

        const eBook = await db.eBooks.update({
            where: {
                id: eBookId,
            },
            data: {
                ...values,
            }
        })

        return NextResponse.json(eBook)
    } catch (error) {
        console.log("[eBook_ID]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}