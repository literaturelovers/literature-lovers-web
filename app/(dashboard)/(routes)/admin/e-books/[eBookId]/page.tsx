import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { Banner } from "@/components/banner";
import { Actions } from "./_components/actions";
import { LayoutDashboard, CircleDollarSign, File } from "lucide-react";
import { redirect } from "next/navigation";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { EBookResourceForm } from "./_components/resources-form";
import { EBookAttachment, EBooks } from "@prisma/client"
import { isAdmin } from "@/lib/admin";
import { CategoryForm } from "./_components/category-form";

const EBookIdPage = async({
    params
} : {
    params: { eBookId: string }
}) => {
    if (!isAdmin()) {
        return redirect("/");
    }

    const eBook = await db.eBooks.findUnique({
        where: {
            id: params.eBookId,
        },
        include: { attachments: true },
    })

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc",
        },
    })

    if(!eBook){
        return redirect("/home");
    }

    const requireFields = [
        eBook.title,
        eBook.description,
        eBook.imageUrl,
    ];

    const totalFields = requireFields.length;
    const completedFields = requireFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`

    const isComplete = requireFields.every(Boolean);

    return (
        <>
            {
                !eBook.isPublished && (
                    <Banner
                        variant="warning"
                        label="This eBook is unpublished. It will not be visible to the students."
                    />
                )
            }
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-2">
                        <h1 className="text-2xl font-medium">
                            eBook Setup
                        </h1>
                        <span className="text-sm text-slate-700">
                            Complete all fields {completionText}
                        </span>
                    </div>
                    <Actions
                        disabled={!isComplete}
                        eBookId={params.eBookId}
                        isPublished={eBook.isPublished}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={LayoutDashboard} />
                            <h2 className="text-xl">
                                Customize your eBook
                            </h2>
                        </div>
                        <TitleForm
                            initialData = {eBook}
                            eBookId = {eBook.id}
                        />
                        <DescriptionForm
                            initialData = {eBook}
                            eBookId = {eBook.id}
                        />
                        <ImageForm
                            initialData = {eBook}
                            eBookId = {eBook.id}
                        />
                        <CategoryForm
                            initialData = {eBook}
                            eBookId = {eBook.id}
                            options = {categories.map((category) => ({
                                label: category.name,
                                value: category.id,
                            }))}
                        />
                    </div>
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={CircleDollarSign} />
                                <h2 className="text-xl">
                                    Sell your eBook
                                </h2>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={File} />
                                <h2 className="text-xl">
                                    Resources
                                </h2>
                            </div>
                            <EBookResourceForm
                                initialData = {eBook as EBooks & { attachments: EBookAttachment[] }}
                                eBookId = {params.eBookId}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EBookIdPage;