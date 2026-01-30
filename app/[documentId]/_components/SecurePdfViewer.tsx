'use client';

import { useEffect, useState } from "react";
import { PDFViewer, ZoomMode, type PluginRegistry, type UISchema } from "@embedpdf/react-pdf-viewer";
import type { CommandsCapability } from "@embedpdf/plugin-commands/preact";
import type { UICapability } from "@embedpdf/plugin-ui/preact";

type CommandButtonItem = Extract<
  UISchema["toolbars"][string]["items"][number],
  { type: "command-button" }
>;

export const PdfViewer = ({ pdfUrl }: { pdfUrl: string }) => {
  const [height, setHeight] = useState<number | null>(null);

  const baseUiSchema: UISchema = {
    id: "minimal-ui",
    version: "1.0.0",
    toolbars: {},
    menus: {},
    sidebars: {},
    modals: {},
    selectionMenus: {},
  };

  const commandButton = (
    id: string,
    commandId?: string
  ): CommandButtonItem | null => {
    if (!commandId) return null;

    return {
      type: "command-button",
      id,
      commandId,
    };
  };

  const onReady = (registry: PluginRegistry) => {
    const commands = registry.getPlugin("commands")?.provides?.() as CommandsCapability | undefined;
    const ui = registry.getPlugin("ui")?.provides?.() as UICapability | undefined;
    if (!commands || !ui) return;

    const get = (id: string): string | undefined =>
      commands.getAllCommands().find(c => c.id === id)?.id;

    const leftItems: CommandButtonItem[] = [
      commandButton("zoom-out", get("zoom:out")),
      commandButton("zoom-in", get("zoom:in")),
      commandButton("pan", get("pan:toggle")),
      commandButton("pointer", get("pointer:toggle")),
    ].filter((i): i is CommandButtonItem => i !== null);

    const rightItems: CommandButtonItem[] = [
      commandButton("prev", get("scroll:previous-page")),
      commandButton("next", get("scroll:next-page")),
      commandButton("search", get("panel:toggle-search")),
      commandButton("fullscreen", get("document:fullscreen")),
    ].filter((i): i is CommandButtonItem => i !== null);

    ui.mergeSchema({
      toolbars: {
        "main-toolbar": {
          id: "main-toolbar",
          position: { placement: "top", slot: "main", order: 0 },
          permanent: true,
          items: [
            { type: "group", id: "left", items: leftItems },
            { type: "spacer", id: "spacer", flex: true },
            { type: "group", id: "right", items: rightItems },
          ],
        },
      },
    });

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
            disabledCategories: [
              "annotation",
              "redaction",
              "selection",
              "history",
              "export",
              "print"
            ],
          },
          permissions: {
            // Ignore PDF flags entirely
            enforceDocumentPermissions: true,
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