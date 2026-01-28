"use client";

import * as z from "zod";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Document } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle, Loader2 } from "lucide-react";

interface ImageFormProps {
    initialData: Document;
    documentId: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "Image is required",
    }),
});

export const ImageForm = ({
    initialData,
    documentId
} : ImageFormProps) => {
    const router = useRouter()
    const [ isEditing, setIsEditing ] = useState(false)
    const [ isSubmitting, setIsSubmitting ] = useState(false)

    const toggleEdit = () => setIsEditing((current) => !current)

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true)
        try {
            await axios.patch(`/api/document/${documentId}`, values)
            toast.success("Document updated!");
            toggleEdit()
            setIsSubmitting(false)
            router.refresh()
        } catch (error) {
            toast.error("Something went wrong!")
            console.log(error)
            setIsSubmitting(false)
        }
    }
    return (
        <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
            {
                isSubmitting && (
                    <div
                        className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center"
                    >
                        <Loader2
                            className="animate-spin h-6 w-6 text-black"
                        />
                    </div>
                )
            }
            <div className="font-medium flex items-center justify-between">
                Document Image
                <Button onClick={toggleEdit} variant="ghost">
                    {
                        isEditing && (
                            <>
                                Cancel
                            </>
                        )
                    }
                    {
                        !isEditing && !initialData.imageUrl && (
                            <>
                                <PlusCircle className="h-4 w-4 mr-2"/>
                                Add an Image
                            </>
                        )
                    }
                    { !isEditing && initialData.imageUrl && (
                            <>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit Image
                            </>
                        )
                    }
                </Button>
            </div>
            {
                !isEditing && (
                    !initialData.imageUrl ? (
                        <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                            <ImageIcon className="h-10 w-10 text-slate-500" />
                        </div>
                    ) : (
                        <div className="relative aspect-video mt-2">
                            <Image
                                alt="Upload"
                                fill
                                className="object-cover rounded-md"
                                src={initialData.imageUrl}
                            />
                        </div>
                    )
                )
            }
            {
                isEditing && (
                    <div>
                        <FileUpload
                            endpoint="documentImage"
                            onChange={(url) => {
                                if (url) {
                                    onSubmit({ imageUrl: url });
                                }
                            }}
                        />
                        <div className="text-xs text-muted-foreground mt-4">
                            16:9 aspect ratio recommended.
                        </div>
                    </div>
                )
            }
            {
                !initialData.imageUrl && (
                    <span className="text-sm text-red-600">This field is required.</span>
                )
            }
        </div>
    );
}