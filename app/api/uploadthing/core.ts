import { isAdmin } from "@/lib/admin";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = () => {
    if (!isAdmin()) {
        throw new UploadThingError("Unauthorized");
    }

    return { role: "admin" };
}

export const ourFileRouter = {
    eBookImage: f({
            image: { maxFileSize: "4MB", maxFileCount: 1 }
        })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),

    eBookAttachment: f({ pdf: { maxFileSize: "64MB" }, text: { maxFileSize: "64MB" } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
