'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-[var(--bg-panel)] border border-[var(--border-subtle)] flex items-center justify-center opacity-50">
        <Sun className="h-5 w-5 opacity-0" />
      </div>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[var(--bg-panel)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] transition-colors overflow-hidden group"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          y: isDark ? 0 : 30,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="absolute"
      >
        <Moon className="h-5 w-5 text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          y: isDark ? -30 : 0,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="absolute"
      >
        <Sun className="h-5 w-5 text-[var(--text-primary)] group-hover:text-[var(--accent-orange)] transition-colors" />
      </motion.div>
    </button>
  );
}
