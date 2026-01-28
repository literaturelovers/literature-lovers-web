"use client";

import toast from "react-hot-toast";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";

interface FileUploadProps {
    onChange?: (url?: string) => void;
    endpoint: keyof typeof ourFileRouter;
    input?: Record<string, unknown>;
    onUploadComplete?: (res: unknown) => void;
}

export const FileUpload = ({
    onChange,
    endpoint,
    input,
    onUploadComplete,
}: FileUploadProps) => {
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                if (!res || res.length === 0) return;

                const firstFile = res[0] as { url?: string } | undefined;
                onChange?.(firstFile?.url);
                onUploadComplete?.(res);
            }}
            // @ts-expect-error: input is not part of UploadDropzoneProps typing but required for dynamic endpoints
            input={input}
            onUploadError={(error: Error) => {
                console.log(error);
                toast.error(`${error?.message}`);
            }}
        />
    )
}