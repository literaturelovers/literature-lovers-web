"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Pencil, Loader2 } from "lucide-react";
import { Combobox } from "@/components/ui/combobox";
import { EBooks } from "@prisma/client";

interface CategoryFormProps {
    initialData: EBooks;
    eBookId: string;
    options: { label: string; value: string; }[];
}

const formSchema = z.object({
    categoryId: z.string().min(1),
});

export const CategoryForm = ({
    initialData,
    eBookId,
    options,
} : CategoryFormProps) => {
    const router = useRouter()
    const [ isEditing, setIsEditing ] = useState(false)

    const toggleEdit = () => setIsEditing((current) => !current)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryId: initialData?.categoryId || ""
        }
    })

    const { isSubmitting, isValid } = form.formState;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/e-books/${eBookId}`, values)
            toast.success("eBook updated!");
            toggleEdit()
            router.refresh()
        } catch (error) {
            toast.error("Something went wrong!")
            console.log(error)
        }
    }

    const selectedOption = options.find((option) => option.value === initialData.categoryId);

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
                eBook Category
                <Button onClick={toggleEdit} variant="ghost">
                    {
                        isEditing ? (
                            <>
                                Cancel
                            </>
                        ) : (
                            <>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit Category
                            </>
                        )
                    }
                </Button>
            </div>
            {
                !isEditing ? (
                    <p className={cn(
                        "text-sm mt-2",
                        !initialData.categoryId && "text-slate-500 italic"
                    )}>
                        {selectedOption?.label || "No Category"}
                    </p>
                ) : (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4 mt-4"
                        >
                            <FormField
                                control={form.control}
                                name="categoryId"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Combobox
                                                options={options}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center gap-x-2">
                                <Button
                                    disabled={!isValid || isSubmitting}
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </div>
                        </form>
                    </Form>
                )
            }

            {
                !initialData.categoryId && (
                    <span className="text-sm text-red-600">This field is required.</span>
                )
            }
        </div>
    );
}