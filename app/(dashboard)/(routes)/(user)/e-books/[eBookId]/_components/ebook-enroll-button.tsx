"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface EBookEnrollButtonProps {
    eBookId: string;
}

export const EBookEnrollButton = ({
    eBookId,
}: EBookEnrollButtonProps) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);
            await axios.post(`/api/e-books/${eBookId}/enroll`);
            toast.success("Enrolled successfully!");
            router.refresh();
            return;

        } catch (error) {
            console.error("Payment error: ", error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            onClick={onClick}
            disabled={isLoading}
            className="w-full text-lg font-semibold"
            variant="secondary"
        >
            Get now
        </Button>
    );
};