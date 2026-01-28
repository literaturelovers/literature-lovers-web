"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Name is required!"
    }),
})

export const CreateCategoryDialog = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        },
    })
    const { isSubmitting, isValid } = form.formState;
    const [open, setOpen] = useState(false);

     const onSubmit = async(values: z.infer<typeof formSchema>) => {
        try {
            await axios.post("/api/category", values);
            router.push(`/admin/category`)
            toast.success("Category added!")
            router.refresh()
            setOpen(false);
        } catch (error) {
            toast.error("Something went wrong!")
            console.log("Something went wrong:", error)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    New category
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create category</DialogTitle>
                    <DialogDescription>
                        Add title to create category. You can edit it later.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Category name</label>
                    <Input
                        {...form.register("title")}
                        placeholder="Enter category name"
                        disabled={isSubmitting}
                    />
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={form.handleSubmit(onSubmit)}
                        disabled={!isValid || isSubmitting}
                    >
                        {isSubmitting ? "Creating..." : "Create"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};