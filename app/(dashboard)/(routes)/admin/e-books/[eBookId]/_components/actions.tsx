"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm.modal";
import { useRouter } from "next/navigation";
import { useConfettiStore } from "@/hooks/use-confetti-store";


interface ActionsProps {
    disabled: boolean;
    eBookId: string;
    isPublished: boolean;
}
export const Actions = ({
    disabled,
    eBookId,
    isPublished
}: ActionsProps) => {

    const router = useRouter()
    const confetti = useConfettiStore()
    const [ isLoading, setIsLoading ] = useState(false)

    const onClick = async () => {
        try {
            setIsLoading(true)

            if (isPublished) {
                await axios.patch(`/api/e-books/${eBookId}/unpublish`)
                toast.success("eBook unpublished.")
            } else {
                await axios.patch(`/api/e-books/${eBookId}/publish`)
                toast.success("eBook published.")
                confetti.onOpen();
            }

            router.refresh()
        } catch (error) {
            toast.error("Something went wrong")
            console.log("Error while publishing/unpublishing eBook: ", error)
        } finally {
            setIsLoading(false)
        }
    }

    const onDelete = async() => {
        try {
            setIsLoading(true)

            await axios.delete(`/api/e-books/${eBookId}`)
            toast.success("eBook deleted");
            router.refresh();
            router.push(`/admin/e-books`);

        } catch (error) {
            toast.error("Something went wrong.")
            console.log("Error while deleting eBook: ", error)
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onClick}
                disabled={disabled || isLoading}
                variant="outline"
                size="sm"
            >
                {
                    isPublished ? "Unpublish" : "Publish"
                }
            </Button>
            <ConfirmModal onConfirm={onDelete}>
                <Button size="sm" disabled={isLoading}>
                    <Trash className="h-4 w-4" />
                </Button>
            </ConfirmModal>
        </div>
    )
}