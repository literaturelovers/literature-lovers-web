import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { PDFViewer } from "../_components/SecurePdfViewer";

const EBookReadPage = async ({ params }: { params: { eBookId: string } }) => {
  const eBook = await db.eBooks.findUnique({
    where: { id: params.eBookId, isPublished: true },
    include: { attachments: true },
  });

  if (!eBook) {
    return redirect("/e-books");
  }

  const pdfUrl = eBook.attachments?.[0]?.url || eBook.resourceUrl;

  if (!pdfUrl) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="text-sm text-muted-foreground">
          No PDF resource available for this e-book.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-8xl mx-auto p-4 flex justify-center items-center">
      <PDFViewer pdfUrl={pdfUrl} />
    </div>
  );
};

export default EBookReadPage;

