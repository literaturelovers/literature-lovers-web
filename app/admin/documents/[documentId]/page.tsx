import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import Link from "next/link";
import { Banner } from "@/components/banner";
import { Actions } from "./_components/actions";
import { LayoutDashboard, File, ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { DocumentResourceForm } from "./_components/resources-form";
import { DocumentAttachment, Document } from "@prisma/client"
import { isAdmin } from "@/lib/admin";
import { CategoryForm } from "./_components/category-form";

const DocumentIdPage = async({
    params
} : {
    params: { documentId: string }
}) => {
    if (!isAdmin()) {
        return redirect("/");
    }

    const document = await db.document.findUnique({
        where: {
            id: params.documentId,
        },
        include: { attachments: true },
    })

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc",
        },
    })

    if(!document){
        return redirect("/home");
    }

    const requireFields = [
        document.title,
        document.description,
        document.categoryId,
    ];

    const totalFields = requireFields.length;
    const completedFields = requireFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`

    const isComplete = requireFields.every(Boolean);

    return (
        <>
            {
                !document.isPublished && (
                    <Banner
                        variant="warning"
                        label="This document is unpublished. It will not be visible to the students."
                    />
                )
            }
            <div className="p-6">
                <Link
                    href="/admin/documents"
                    className="flex items-center text-sm hover:opacity-75 transition mb-6"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Documents
                </Link>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-2">
                        <h1 className="text-2xl font-medium">
                            Document Setup
                        </h1>
                        <span className="text-sm text-slate-700">
                            Complete all fields {completionText}
                        </span>
                    </div>
                    <Actions
                        disabled={!isComplete}
                        documentId={params.documentId}
                        isPublished={document.isPublished}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={LayoutDashboard} />
                            <h2 className="text-xl">
                                Customize your document
                            </h2>
                        </div>
                        <TitleForm
                            initialData = {document}
                            documentId = {document.id}
                        />
                        <DescriptionForm
                            initialData = {document}
                            documentId = {document.id}
                        />
                        <CategoryForm
                            initialData = {document}
                            documentId = {document.id}
                            options = {categories.map((category) => ({
                                label: category.name,
                                value: category.id,
                            }))}
                        />
                    </div>
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={File} />
                                <h2 className="text-xl">
                                    Resources
                                </h2>
                            </div>
                            <DocumentResourceForm
                                initialData = {document as Document & { attachments: DocumentAttachment[] }}
                                documentId = {params.documentId}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DocumentIdPage;