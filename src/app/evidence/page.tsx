"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { EvidenceTab } from "@/components/dashboard/EvidenceTab";
import { DEMO_EVIDENCE } from "@/lib/demoData";

export default function GlobalEvidencePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onToggleMobileMenu={() => setMobileMenuOpen(true)}
          title="Evidence Locker"
          subtitle="Grounded Audit Trail"
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
          <EvidenceTab evidenceList={DEMO_EVIDENCE} />
        </main>
      </div>
    </div>
  );
}
