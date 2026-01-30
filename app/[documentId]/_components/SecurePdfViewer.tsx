'use client';

import { useEffect, useState } from "react";
import { PDFViewer, ZoomMode, type PluginRegistry, type UISchema } from "@embedpdf/react-pdf-viewer";
import type { CommandsCapability } from "@embedpdf/plugin-commands/preact";
import type { UICapability } from "@embedpdf/plugin-ui/preact";


export const PdfViewer = ({ pdfUrl }: { pdfUrl: string }) => {
  const [height, setHeight] = useState<number | null>(null);

  // Start with an empty schema; we will populate the toolbar with the *actual*
  // command IDs available in this build at runtime.
  const baseUiSchema: UISchema = {
    id: "minimal-ui",
    version: "1.0.0",
    toolbars: {},
    menus: {},
    sidebars: {},
    modals: {},
    selectionMenus: {},
  };

  const onReady = (registry: PluginRegistry) => {
    const commands = registry.getPlugin("commands")?.provides?.() as CommandsCapability | undefined;
    const ui = registry.getPlugin("ui")?.provides?.() as UICapability | undefined;
    if (!commands || !ui) return;

    // Resolve the real command IDs by category (these vary by build).
    const zoomOutId = commands.getCommandsByCategory("zoom-out")?.[0]?.id;
    const zoomInId = commands.getCommandsByCategory("zoom-in")?.[0]?.id;
    const fullscreenId = commands.getCommandsByCategory("document-fullscreen")?.[0]?.id;

    // If any are missing, don't crash the viewer.
    if (!zoomOutId || !zoomInId || !fullscreenId) return;

    ui.mergeSchema({
      toolbars: {
        "main-toolbar": {
          id: "main-toolbar",
          position: { placement: "top", slot: "main", order: 0 },
          permanent: true,
          items: [
            {
              type: "group",
              id: "minimal-toolbar-group",
              gap: 2,
              alignment: "start",
              items: [
                { type: "command-button", id: "zoom-out", commandId: zoomOutId, variant: "icon" },
                { type: "command-button", id: "zoom-in", commandId: zoomInId, variant: "icon" },
                { type: "spacer", id: "spacer", flex: true },
                { type: "command-button", id: "fullscreen", commandId: fullscreenId, variant: "icon" },
              ],
            },
          ],
        },
      },
    });

    // Ensure only our toolbar is shown in the main/top slot.
    ui.setActiveToolbar("top", "main", "main-toolbar");
  };

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
          zoom: {
            defaultZoomLevel: ZoomMode.FitWidth,
          },
          ui: {
            schema: baseUiSchema,
            // Hide any default UI categories so only our custom toolbar remains.
            // (Keep 'zoom' and 'document' enabled for zoom controls + fullscreen.)
            disabledCategories: ["annotation", "redaction", "page", "panel", "tools", "selection", "history", "export", "print"],
          },
          permissions: {
            // Ignore PDF flags entirely
            enforceDocumentPermissions: false,
            // Or override specific flags
            overrides: {
              print: false, // Disable printing for everyone
              copyContents: false,// Allow copying even if PDF forbids it
              modifyAnnotations: false
            }
          }
        }}
        onReady={onReady}
        style={{
          width: "100%",
          height,
        }}
      />
    </div>
  );
};