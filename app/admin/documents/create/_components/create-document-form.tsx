"use client";

import * as z from "zod";
import axios from "axios";
import Link from "next/link";
import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Combobox } from "@/components/ui/combobox";
import { FileUpload } from "@/components/file-upload";

const formSchema = z.object({
    title: z.string().min(1, { message: "Title is required!" }),
    description: z.string().min(1, { message: "Description is required!" }),
    imageUrl: z.string().min(1, { message: "Image is required!" }),
    categoryId: z.string().min(1, { message: "Category is required!" }),
});

export function CreateDocumentForm({
    categoryOptions,
}: {
    categoryOptions: { label: string; value: string }[];
}) {
    const router = useRouter();
    const [creatingCategory, setCreatingCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            imageUrl: "",
            categoryId: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const options = useMemo(() => categoryOptions, [categoryOptions]);

    const createCategory = async () => {
        const name = newCategoryName.trim();
        if (!name) {
            toast.error("Category name is required.");
            return;
        }

        try {
            setCreatingCategory(true);
            const res = await axios.post(
                "/api/category",
                { title: name },
                { withCredentials: true }
            );
            const created = res.data as { id: string; name: string };
            form.setValue("categoryId", created.id, { shouldValidate: true });
            setNewCategoryName("");
            toast.success("Category created!");
            router.refresh();
        } catch (e) {
            toast.error("Could not create category.");
            // eslint-disable-next-line no-console
            console.log(e);
        } finally {
            setCreatingCategory(false);
        }
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/document", values, {
                withCredentials: true,
            });
            router.push(`/admin/documents/${response.data.id}`);
            toast.success("Document Created!");
        } catch (error) {
            toast.error("Something went wrong!");
            // eslint-disable-next-line no-console
            console.log("Something went wrong:", error);
        }
    };
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Document Title</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isSubmitting}
                                    placeholder="e.g. 'Previous year paper'"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>What is name this document?</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    disabled={isSubmitting}
                                    placeholder="e.g. 'This document is about...'"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                A short summary students will see on the document page.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cover image</FormLabel>
                            <FormControl>
                                <div className="space-y-3">
                                    <FileUpload
                                        endpoint="documentImage"
                                        onChange={(url) => {
                                            if (url) field.onChange(url);
                                        }}
                                    />
                                </div>
                            </FormControl>
                            <FormDescription>16:9 aspect ratio recommended.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Combobox options={options} {...field} />
                            </FormControl>
                            <FormMessage />

                            <div className="pt-3">
                                <div className="mb-2 text-xs text-muted-foreground">
                                    Don&apos;t see your category? Create one.
                                </div>
                                <div className="flex gap-2">
                                    <Input
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        placeholder="New category name"
                                        disabled={isSubmitting || creatingCategory}
                                    />
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={createCategory}
                                        disabled={isSubmitting || creatingCategory}
                                    >
                                        Create
                                    </Button>
                                </div>
                            </div>
                        </FormItem>
                    )}
                />

                <div className="flex items-center justify-end gap-x-2 md:col-span-2">
                    <Link href="/admin/documents">
                        <Button type="button" variant="ghost">
                            Cancel
                        </Button>
                    </Link>
                    <Button type="submit" disabled={!isValid || isSubmitting}>
                        Create Document
                    </Button>
                </div>
            </form>
        </Form>
    );
}