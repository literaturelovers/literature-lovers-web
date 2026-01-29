import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { PdfViewer } from "../_components/SecurePdfViewer";
import { ClientOnly } from "../_components/client-only";

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
    <div className="w-full h-screen">
      <ClientOnly>
        <PdfViewer pdfUrl={pdfUrl} />
      </ClientOnly>
    </div>
  );
};

export default DocumentReadPage;

