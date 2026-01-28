"use client";

import { useMemo, useState } from "react";
import { DocumentsGrid } from "./documents-grid";
import { CategoryTabs } from "@/app/_components/category-tabs";

interface Document {
  id: string;
  title: string;
  imageUrl: string | null;
  description?: string | null;
  categoryId?: string | null;
}

interface CategoryWithCount {
  id: string;
  name: string;
  count: number;
}

interface HomeMainProps {
  documents: Document[];
  categories: CategoryWithCount[];
}

export const HomeMain = ({ documents, categories }: HomeMainProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");

  const tabs = useMemo(
    () => [
      {
        id: "all",
        label: `All Categories (${documents.length})`,
      },
      ...categories.map((c) => ({
        id: c.id,
        label: `${c.name} (${c.count})`,
      })),
    ],
    [documents.length, categories],
  );

  const filteredDocuments = useMemo(
    () =>
      selectedCategoryId === "all"
        ? documents
        : documents.filter((document) => document.categoryId === selectedCategoryId),
    [documents, selectedCategoryId],
  );

  return (
    <>
      <CategoryTabs
        tabs={tabs}
        initialSelectedId="all"
        onChange={setSelectedCategoryId}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto pb-10">
        <div className="p-6 space-y-4">
          <DocumentsGrid
            documents={filteredDocuments.map((document) => ({
              id: document.id,
              title: document.title,
              imageUrl: document.imageUrl,
              description: document.description,
            }))}
          />
          {filteredDocuments.length === 0 && (
            <div className="min-h-[300px] flex items-center justify-center text-sm text-muted-foreground mt-10">
              No documents found
            </div>
          )}
        </div>
      </main>
    </>
  );
};

