'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Activity, 
  Radio, 
  Bot, 
  BookHeart, 
  Clock, 
  Bell, 
  FileText,
  User
} from 'lucide-react';
import { DEMO_PATIENT } from '@/lib/demo/demo-patient-anima';

export const CaregiverNav: React.FC = () => {
  const pathname = usePathname();

  const links = [
    { href: '/caregiver', label: 'Overview', icon: LayoutDashboard },
    { href: '/caregiver/cognitive-profile', label: 'Cognitive Profile', icon: Activity },
    { href: '/caregiver/change-radar', label: 'Change Radar', icon: Radio },
    { href: '/caregiver/copilot', label: 'Ask Cogniva AI', icon: Bot },
    { href: '/caregiver/memories', label: 'Memory Vault', icon: BookHeart },
    { href: '/caregiver/routine', label: 'Routine & Voice', icon: Clock },
    { href: '/caregiver/alerts', label: 'Alerts', icon: Bell },
    { href: '/caregiver/reports', label: 'Export Reports', icon: FileText },
  ];

  return (
    <aside className="w-full lg:w-64 bg-white/70 backdrop-blur-md border-b lg:border-b-0 lg:border-r border-[#E8E0D5] p-4 lg:p-6 shrink-0">
      {/* Patient selector banner */}
      <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC] mb-6 flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-[#EBF2EC] border border-[#C5DBCB] flex items-center justify-center text-xl shrink-0">
          👵
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-[#849188] uppercase tracking-wider">Active Patient</p>
          <h3 className="text-sm font-bold text-[#2C332D] truncate">{DEMO_PATIENT.name}</h3>
          <p className="text-[11px] text-[#59655D]">{DEMO_PATIENT.age} yrs • {DEMO_PATIENT.state}</p>
        </div>
      </div>

      {/* Nav links */}
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
                  ? 'bg-[#E78C56] text-white shadow-sm font-semibold'
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
