"use client";

import { useState } from "react";

interface CategoryTab {
  id: string;
  label: string;
}

interface CategoryTabsProps {
  tabs: CategoryTab[];
  initialSelectedId?: string;
  onChange?: (id: string) => void;
}

export const CategoryTabs = ({
  tabs,
  initialSelectedId = "all",
  onChange,
}: CategoryTabsProps) => {
  const [selected, setSelected] = useState<string>(initialSelectedId);

  const handleSelect = (id: string) => {
    setSelected(id);
    onChange?.(id);
  };

  return (
    <div className="w-full pt-8" style={{ background: "#FFF4F4" }}>
      <h2
        className="font-bold text-2xl text-left mb-6 px-8 text-muted-foreground"
      >
        What are you preparing for?
      </h2>
      <div
        className="flex gap-2 md:gap-8 px-4 overflow-x-auto hide-scrollbar mx-auto"
        role="tablist"
        aria-label="Document categories"
        style={{ maxWidth: "1400px" }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleSelect(tab.id)}
            role="tab"
            aria-selected={tab.id === selected}
            tabIndex={tab.id === selected ? 0 : -1}
            className={
              tab.id === selected
                ? "flex items-center px-8 py-3 bg-white text-slate-900 text-xs tracking-[0.3em] uppercase font-bold shadow-md border border-slate-100 border-b-0 whitespace-nowrap"
                : "flex items-center px-8 py-3 text-slate-800 text-xs tracking-[0.3em] uppercase font-medium hover:text-slate-800 whitespace-nowrap transition-colors"
            }
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

