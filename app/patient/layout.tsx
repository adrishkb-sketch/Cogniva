'use client';

import React from 'react';
import { PatientNav } from '@/components/patient/PatientNav';

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C332D] pb-24 md:pb-12 flex flex-col select-none">
      <PatientNav />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 md:py-8">
        {children}
      </main>
    </div>
  );
}
