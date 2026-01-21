"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EBookAttachment, EBooks } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { File, Loader2, PlusCircle, X } from "lucide-react";
import { FileUpload } from "@/components/file-upload";

interface EBookResourceFormProps {
    initialData: EBooks & { attachments: EBookAttachment[] };
    eBookId: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = z.object({
    url: z.string().min(1),
    name: z.string().optional(),
});

export const EBookResourceForm = ({
    initialData,
    eBookId
} : EBookResourceFormProps) => {
    const router = useRouter()
    const [ isEditing, setIsEditing ] = useState(false);
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ isDeleting, setIsDeleting ] = useState(false);
    const [ deletingId, setDeletingId ] = useState<string | null>(null);
    const [customName, setCustomName] = useState("");


    const toggleEdit = () => setIsEditing((current) => !current)

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true)
        try {
            await axios.post(`/api/e-books/${eBookId}/attachments`, {
                url: values.url,
                name: customName || values.url.split("/").pop(),
            })
            toast.success("Resource added!");
            toggleEdit()
            setCustomName("");
            setIsSubmitting(false)
            router.refresh()
        } catch (error) {
            toast.error("Something went wrong!")
            console.log(error)
            setIsSubmitting(false)
        }
    }

    const onDelete = async(id: string) => {
        try {
            setIsDeleting(true)
            setDeletingId(id)
            await axios.delete(`/api/e-books/${eBookId}/attachments/${id}`)
            toast.success("Attachment deleted.")
            router.refresh()
        } catch (error) {
            toast.error("Something went wrong.");
            console.log("Error while deleting attachment: ", error)
        } finally {
            setDeletingId(null)
            setIsDeleting(false)
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            {(isSubmitting || isDeleting) && (
                <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
                    <Loader2 className="animate-spin h-6 w-6 text-black" />
                </div>
            )}
            <div className="font-medium flex items-center justify-between">
                eBook Attachments
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? "Cancel" : <><PlusCircle className="h-4 w-4 mr-2"/>Add a file</>}
                </Button>
            </div>
            {!isEditing && (
                <>
                    {initialData.attachments.length === 0 ? (
                        <p className="text-sm mt-2 text-slate-500 italic">No attachments yet.</p>
                    ) : (
                        <div className="space-y-2">
                            {initialData.attachments.map((attachment) => (
                                <div key={attachment.id} className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-black rounded-md">
                                    <File className="h-4 w-4 mr-2 flex-shrink-0" />
                                    <a href={attachment.url} target="_blank" rel="noopener noreferrer" className="text-xs line-clamp-1 underline">
                                        {attachment.name}
                                    </a>
                                    {deletingId === attachment.id ? (
                                        <div><Loader2 className="h-4 w-4 animate-spin" /></div>
                                    ) : (
                                        <button onClick={() => onDelete(attachment.id)} className="ml-auto hover:opacity-75 transition">
                                            <X className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="eBookAttachment"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ url: url });
                            }
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Rename file (optional)"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        className="mt-3 w-full px-3 py-2 text-sm border rounded-md outline-none"
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        Upload your PDFs, resources, etc. for this ebook here.
                    </div>
                </div>
            )}
        </div>
    );
}