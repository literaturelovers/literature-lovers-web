"use client";
import React from "react";

interface TabButtonsProps {
  selectedTab: 'documents' | 'categories';
  setSelectedTab: (tab: 'documents' | 'categories') => void;
}

const TABS = [
  { key: 'documents', label: 'document' },
  { key: 'categories', label: 'Categories' },
] as const;

const TabButtons: React.FC<TabButtonsProps> = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className="relative flex gap-4 max-w-[300px] mx-auto mb-6 bg-gray-100 rounded-full p-1 shadow-inner">
      <div
        className={`
          absolute top-1 left-1 h-[calc(100%-0.5rem)] w-1/2 rounded-full bg-black z-0
          transition-transform duration-300
        `}
        style={{
          transform: selectedTab === "documents" ? "translateX(0%)" : "translateX(100%)",
        }}
      />
      {TABS.map((tab) => (
        <button
          key={tab.key}
          className={`
            relative flex-1 px-2 py-2 rounded-full text-sm font-medium z-10
            transition-colors duration-300
            ${selectedTab === tab.key
              ? "text-white"
              : "text-gray-700 hover:bg-gray-200"}
          `}
          onClick={() => setSelectedTab(tab.key)}
          aria-pressed={selectedTab === tab.key}
          tabIndex={0}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabButtons;