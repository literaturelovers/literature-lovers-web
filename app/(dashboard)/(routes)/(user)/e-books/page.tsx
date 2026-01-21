// import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { SearchInput } from "@/components/search-input";
import { EbooksGrid } from "@/app/(dashboard)/(routes)/(user)/e-books/_components/ebooks-grid";
import { Prisma } from "@prisma/client";

interface SearchParamsProps {
    searchParams: {
        title?: string;
        categoryId?: string;
    }
}

const EBookPage = async ({
    searchParams
}: SearchParamsProps) => {
    // const { userId } = auth();

    // if (!userId) {
    //     return redirect("/home");
    // }

    // Fetch e-books for the logged-in user, with basic search support (by title)
    const where: Prisma.EBooksWhereInput = {
        isPublished: true,
        // Optionally add more filters for user-based logic if needed
    };
    if (searchParams?.title) {
        where.title = { contains: searchParams.title, mode: 'insensitive' };
    }
    // Note: No category for e-books right now

    const ebooks = await db.eBooks.findMany({
        where,
        orderBy: {
            createdAt: "desc"
        }
    });

    return (
        <div className="h-full mb-20">
            <div className="px-6 pt-6 block">
                <SearchInput />
            </div>
            <div className="p-6 space-y-4 h-full">
                <EbooksGrid
                    ebooks={ebooks.map((ebook) => ({
                        id: ebook.id,
                        title: ebook.title,
                        imageUrl: ebook.imageUrl || "/tally-book.png",
                        description: ebook.description,
                    }))}
                />
                {ebooks.length === 0 && (
                    <div className="text-center text-sm text-muted-foreground mt-10">
                        No e-books found
                    </div>
                )}
            </div>
        </div>
    );
}

export default EBookPage;