'use client';

import React from 'react';
import { HealthNav } from '@/components/health/HealthNav';

export default function HealthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col lg:flex-row">
      <HealthNav />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto">
        {children}
      </main>
    </div>
  );
}
