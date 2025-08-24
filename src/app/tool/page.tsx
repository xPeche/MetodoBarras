
"use client";

import React from 'react';
import { BlockDivision } from "@/components/block-division"

export default function ToolPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1 p-4 md:p-8 flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto h-full">
          <BlockDivision />
        </div>
      </main>
    </div>
  )
}
