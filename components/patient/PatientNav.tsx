'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Image as ImageIcon, MessageCircle, Sprout, LifeBuoy, ArrowLeft } from 'lucide-react';
import { SyncIndicator } from '@/components/ui/SyncIndicator';
import { CustomLanguageSelector } from '@/components/patient/CustomLanguageSelector';

export const PatientNav: React.FC = () => {
  const pathname = usePathname();
  const isSubPage = pathname !== '/patient';

  const navItems = [
    { href: '/patient', label: 'Home', icon: Home, color: 'text-[#5B8266]' },
    { href: '/patient/day', label: 'My Day', icon: Calendar, color: 'text-[#E78C56]' },
    { href: '/patient/memories', label: 'Memories', icon: ImageIcon, color: 'text-[#8E778E]' },
    { href: '/patient/talk', label: 'Talk', icon: MessageCircle, color: 'text-[#5B8266]' },
    { href: '/patient/garden', label: 'Garden', icon: Sprout, color: 'text-[#5B8266]' },
  ];

  return (
    <>
      {/* Patient Top Bar */}
      <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8E0D5] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isSubPage ? (
            <Link
              href="/patient"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border-2 border-[#E0D8CC] text-[#2C332D] font-bold text-base hover:bg-[#F5EFEB] shadow-sm transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-[#5B8266]" />
              <span>Back Home</span>
            </Link>
          ) : (
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🏡</span>
              <span className="text-xl sm:text-2xl font-bold text-[#2C332D]">Anima’s Safe Space</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <CustomLanguageSelector />
          <SyncIndicator />
          <Link
            href="/patient/help"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#D9654B] text-white font-bold text-base hover:bg-[#C2543B] shadow-md transition-all active:scale-95"
          >
            <LifeBuoy className="w-5 h-5 text-white" />
            <span>I Need Help</span>
          </Link>
        </div>
      </header>

      {/* Patient Bottom Bar for Tablet / Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t-2 border-[#E8E0D5] py-2 px-4 flex items-center justify-around shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center min-w-[64px] min-h-[56px] px-3 py-1.5 rounded-2xl transition-all ${
                isActive
                  ? 'bg-[#EBF2EC] text-[#3F5E47] font-bold scale-105 shadow-xs'
                  : 'text-[#59655D] hover:bg-[#FAF7F2]'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'text-[#3F5E47]' : item.color}`} />
              <span className="text-xs sm:text-sm mt-1">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};
