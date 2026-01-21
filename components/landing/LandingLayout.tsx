import React from "react";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      {children}
    </main>
  );
}
