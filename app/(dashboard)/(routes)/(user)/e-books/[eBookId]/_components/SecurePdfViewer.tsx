"use client";
import { createPluginRegistration } from '@embedpdf/core';
import { EmbedPDF } from '@embedpdf/core/react';
import { usePdfiumEngine } from '@embedpdf/engines/react';
import { useMemo, useState, useEffect, useRef } from "react";
import { useScroll } from '@embedpdf/plugin-scroll/react';
import { ZoomIn, ZoomOut, Maximize, Minimize, ChevronLeft, ChevronRight } from "lucide-react";

// Import the essential plugins
import { Viewport, ViewportPluginPackage } from '@embedpdf/plugin-viewport/react';
import { Scroller, ScrollPluginPackage } from '@embedpdf/plugin-scroll/react';
import { LoaderPluginPackage } from '@embedpdf/plugin-loader/react';
import { RenderLayer, RenderPluginPackage } from '@embedpdf/plugin-render/react';
import { Button } from "@/components/ui/button";

export const PDFViewer = ({ pdfUrl }: { pdfUrl: string }) => {
    const { engine, isLoading } = usePdfiumEngine();
    const [scale, setScale] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const plugins = useMemo(
        () => [
            createPluginRegistration(LoaderPluginPackage, {
                loadingOptions: {
                    type: 'url',
                    pdfFile: {
                        id: 'ebook-pdf',
                        url: pdfUrl,
                    },
                },
            }),
            createPluginRegistration(ViewportPluginPackage),
            createPluginRegistration(ScrollPluginPackage),
            createPluginRegistration(RenderPluginPackage),
        ],
        [pdfUrl],
    );

    // Handle fullscreen
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const toggleFullscreen = async () => {
        if (!containerRef.current) return;

        if (!document.fullscreenElement) {
            await containerRef.current.requestFullscreen();
        } else {
            await document.exitFullscreen();
        }
    };

    const handleZoomIn = () => {
        setScale((prev) => Math.min(prev + 0.25, 3));
    };

    const handleZoomOut = () => {
        setScale((prev) => Math.max(prev - 0.25, 0.5));
    };

    const handleZoomFit = () => {
        setScale(1);
    };

    if (isLoading || !engine) {
        return <div className="flex items-center justify-center h-[800px]">Loading PDF Engine...</div>;
    }

    return (
        <div
            ref={containerRef}
            className={`relative w-full bg-gray-100 rounded-lg overflow-hidden border border-gray-200 ${
                isFullscreen ? 'h-screen' : 'h-[800px]'
            }`}
        >
            {/* Controls Bar */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 py-2 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                    <PDFControls
                        onZoomIn={handleZoomIn}
                        onZoomOut={handleZoomOut}
                        onZoomFit={handleZoomFit}
                        onToggleFullscreen={toggleFullscreen}
                        isFullscreen={isFullscreen}
                        scale={scale}
                    />
                </div>
            </div>

            {/* PDF Content */}
            <div className={`${isFullscreen ? 'h-[calc(100vh-3rem)]' : 'h-[calc(100%-3rem)]'} pt-12`}>
                <EmbedPDF engine={engine} plugins={plugins}>
                    <Viewport
                        style={{
                            backgroundColor: '#f1f3f5',
                            height: '100%',
                        }}
                    >
                        <Scroller
                            renderPage={({ width, height, pageIndex, scale: baseScale }) => (
                                <div
                                    style={{
                                        width: width * scale,
                                        height: height * scale,
                                        transform: `scale(${scale})`,
                                        transformOrigin: 'top left',
                                    }}
                                >
                                    <RenderLayer pageIndex={pageIndex} scale={baseScale * scale} />
                                </div>
                            )}
                        />
                    </Viewport>
                </EmbedPDF>
            </div>
        </div>
    );
};

interface PDFControlsProps {
    onZoomIn: () => void;
    onZoomOut: () => void;
    onZoomFit: () => void;
    onToggleFullscreen: () => void;
    isFullscreen: boolean;
    scale: number;
}

const PDFControls = ({
    onZoomIn,
    onZoomOut,
    onZoomFit,
    onToggleFullscreen,
    isFullscreen,
    scale
}: PDFControlsProps) => {
    const { currentPage, totalPages, scrollToNextPage, scrollToPreviousPage } = useScroll();

    return (
        <>
            {/* Page Navigation */}
            <div className="flex items-center gap-1 border-r border-gray-300 pr-3 mr-3">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => scrollToPreviousPage?.()}
                    disabled={currentPage <= 1 || !scrollToPreviousPage}
                    className="h-8 w-8"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium px-2 min-w-[80px] text-center">
                    {currentPage} / {totalPages || '?'}
                </span>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => scrollToNextPage?.()}
                    disabled={currentPage >= (totalPages || 1) || !scrollToNextPage}
                    className="h-8 w-8"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1 border-r border-gray-300 pr-3 mr-3">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onZoomOut}
                    disabled={scale <= 0.5}
                    className="h-8 w-8"
                    title="Zoom Out"
                >
                    <ZoomOut className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onZoomFit}
                    className="h-8 px-3 text-xs"
                    title="Fit to Page"
                >
                    {Math.round(scale * 100)}%
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onZoomIn}
                    disabled={scale >= 3}
                    className="h-8 w-8"
                    title="Zoom In"
                >
                    <ZoomIn className="h-4 w-4" />
                </Button>
            </div>

            {/* Fullscreen */}
            <Button
                variant="ghost"
                size="icon"
                onClick={onToggleFullscreen}
                className="h-8 w-8"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
                {isFullscreen ? (
                    <Minimize className="h-4 w-4" />
                ) : (
                    <Maximize className="h-4 w-4" />
                )}
            </Button>
        </>
    );
};