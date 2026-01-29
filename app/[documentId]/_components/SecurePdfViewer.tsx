'use client';

import { useEffect, useState } from "react";
import { PDFViewer } from "@embedpdf/react-pdf-viewer";

export const PdfViewer = ({ pdfUrl }: { pdfUrl: string }) => {
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    const updateHeight = () => {
      // Fallback to 600px if window is not available for some reason
      const h = typeof window !== "undefined" ? window.innerHeight : 600;
      setHeight(h);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  // Avoid rendering the viewer until we know the height
  if (!height) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-sm text-muted-foreground">
        Loading document...
      </div>
    );
  }

  return (
    <div className="w-full" style={{ height }}>
      <PDFViewer
        config={{
          src: pdfUrl,
        }}
        style={{
          width: "100%",
          height,
        }}
      />
    </div>
  );
};