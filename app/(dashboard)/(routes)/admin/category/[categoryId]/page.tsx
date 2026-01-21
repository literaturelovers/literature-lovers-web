"use client";

import * as z from "zod";
import axios from "axios";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const formSchema = z.object({
    title: z.string().min(1, {
        message: "Name is required!"
    }),
})

const EditCategoryPage = ({
    params
}: {
    params: { categoryId: string }
}) => {
    const router = useRouter();
    const [oldCategoryName, setOldCategoryName] = useState("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: oldCategoryName,
        },
    })

    const { isSubmitting, isValid } = form.formState;

    useEffect(() => {
        const fetchCategory = async () => {
            if (params.categoryId) {
                try {
                    const response = await axios.get(`/api/category/${params.categoryId}`);
                    setOldCategoryName(response.data.name);
                } catch (error) {
                    console.error("Error fetching category:", error);
                }
            }
        };

        fetchCategory();
    }, [params.categoryId]);

    useEffect(() => {
        if (oldCategoryName) {
            form.reset({ title: oldCategoryName }); // Reset form values when oldCategoryName changes
        }
    }, [oldCategoryName, form]);

    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/category/${params.categoryId}`, values);
            router.push(`/admin/category`);
            toast.success("Category Updated!");
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong!");
            console.log("Something went wrong:", error);
        }
    }

    return (
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div>
                <h1 className="text-2xl">
                    Edit Category
                </h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Link href="/admin/category">
                                <Button
                                    type="button"
                                    variant="ghost"
                                >
                                    Cancel
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default EditCategoryPage;