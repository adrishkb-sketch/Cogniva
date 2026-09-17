'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, TrendingUp, FileSpreadsheet, ShieldAlert, HeartPulse } from 'lucide-react';
import { DEMO_PATIENT } from '@/lib/demo/demo-patient-anima';

export const HealthNav: React.FC = () => {
  const pathname = usePathname();

  const links = [
    { href: '/health', label: 'Authorized Patients', icon: Users },
    { href: `/health/patients/${DEMO_PATIENT.id}`, label: 'Patient Longitudinal View', icon: TrendingUp },
    { href: '/health/reports', label: 'Longitudinal Clinical Reports', icon: FileSpreadsheet },
    { href: '/health/alerts', label: 'Adherence & Observations', icon: ShieldAlert },
  ];

  return (
    <aside className="w-full lg:w-64 bg-white/70 backdrop-blur-md border-b lg:border-b-0 lg:border-r border-[#E8E0D5] p-4 lg:p-6 shrink-0">
      <div className="p-3.5 rounded-2xl bg-[#F3EEF3] border border-[#DFD3DF] mb-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-[#8E778E] text-white flex items-center justify-center shrink-0">
          <HeartPulse className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] font-bold text-[#8E778E] uppercase tracking-wider">Clinical Portal</span>
          <h4 className="text-xs font-bold text-[#2C332D]">Dr. Nilanjan Roy</h4>
          <p className="text-[10px] text-[#59655D]">Geriatric Neurology</p>
        </div>
      </div>

      <nav className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#8E778E] text-white shadow-sm font-semibold'
                  : 'text-[#59655D] hover:bg-white hover:text-[#2C332D]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#849188]'}`} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
