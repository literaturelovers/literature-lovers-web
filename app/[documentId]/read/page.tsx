import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { PDFViewer } from "../_components/SecurePdfViewer";

const DocumentReadPage = async ({ params }: { params: { documentId: string } }) => {
  const Document = await db.document.findUnique({
    where: { id: params.documentId, isPublished: true },
    include: { attachments: true },
  });

  if (!Document) {
    return redirect("/documents");
  }

  const pdfUrl = Document.attachments?.[0]?.url || Document.resourceUrl;

  if (!pdfUrl) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="text-sm text-muted-foreground">
          No PDF resource available for this document.
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

export default DocumentReadPage;

