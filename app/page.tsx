import { db } from "@/lib/db";
import { Footer } from "@/app/_components/footer";
import type { Prisma } from "@prisma/client";
import { Navbar } from "./_components/navbar";
import { getCategories } from "../actions/get-categories";
import { HomeMain } from "./_components/home-main";

interface SearchParamsProps {
  searchParams: {
    title?: string;
    categoryId?: string;
  };
}

const HomePage = async ({ searchParams }: SearchParamsProps) => {
  const where: Prisma.DocumentWhereInput = {
    isPublished: true,
  };
  if (searchParams?.title) {
    where.title = { contains: searchParams.title, mode: "insensitive" };
  }

  const documents = await db.document.findMany({
    where,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      imageUrl: true,
      description: true,
      categoryId: true,
    },
  });

  const categories = await getCategories();
  const categoryCounts: Record<string, number> = {};
  documents.forEach((document) => {
    if (document.categoryId) {
      categoryCounts[document.categoryId] =
        (categoryCounts[document.categoryId] || 0) + 1;
    }
  });

  const categoriesWithCounts = categories.map((cat) => ({
    ...cat,
    count: categoryCounts[cat.id] || 0,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <HomeMain documents={documents} categories={categoriesWithCounts} />
      <Footer />
    </div>
  );
};

export default HomePage;
