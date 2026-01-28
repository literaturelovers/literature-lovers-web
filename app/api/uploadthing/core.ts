import { isAdmin } from "@/lib/admin";
import { db } from "@/lib/db";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";

const f = createUploadthing();

const handleAuth = () => {
    if (!isAdmin()) {
        throw new UploadThingError("Unauthorized");
    }

    return { role: "admin" };
}

export const ourFileRouter = {
    documentImage: f({
            image: { maxFileSize: "4MB", maxFileCount: 1 }
        })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),

    documentAttachment: f({
        pdf: { maxFileSize: "64MB" },
        text: { maxFileSize: "64MB" },
    })
        .input(
            z.object({
                documentId: z.string(),
            }),
        )
        .middleware(async ({ input }) => {
            if (!isAdmin()) {
                throw new UploadThingError("Unauthorized");
            }

            return { documentId: input.documentId };
        })
        .onUploadComplete(async ({ file, metadata }) => {
            await db.documentAttachment.create({
                data: {
                    name: file.name,
                    url: file.url,
                    documentId: metadata.documentId,
                },
            });
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
