"use client";

import { Navigation } from "@/components/navigation";
import { ModeToggle } from "@/components/mode-toggle";

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="font-bold text-xl">ERP Järjestelmä</div>
        <div className="mx-6">
          <Navigation />
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}