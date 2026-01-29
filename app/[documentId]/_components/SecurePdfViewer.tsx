'use client';

import { PDFViewer } from '@embedpdf/react-pdf-viewer';

export const PdfViewer = ({ pdfUrl }: { pdfUrl: string }) => {
    return (
        <div className="w-full h-full">
            <PDFViewer
                config={{
                src: pdfUrl,
                }}
            />
        </div>
    );
};