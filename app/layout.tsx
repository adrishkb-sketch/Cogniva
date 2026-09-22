import type { Metadata } from "next";
import "./globals.css";
import { DemoModeBar } from "@/components/shared/DemoModeBar";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { NERStateProvider } from "@/components/shared/NERStateContext";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

export const metadata: Metadata = {
  title: "Cogniva — Cognitive Rehabilitation & Daily-Life Memory Companion (NER)",
  description: "An adaptive cognitive rehabilitation and memory assistance platform designed around the everyday lives, memories, languages, and routines of elderly people in the North Eastern Region.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-[var(--bg-main)] text-[var(--text-primary)]">
      <body className="min-h-screen flex flex-col antialiased bg-[var(--bg-main)]">
        <AnimatedBackground />
        <NERStateProvider>
          <DemoModeBar />
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </NERStateProvider>
      </body>
    </html>
  );
}
