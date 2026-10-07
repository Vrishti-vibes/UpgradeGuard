import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "UpgradeGuard — Developer Dependency Investigation Console",
  description:
    "A Multi-Agent AI System for Dependency Upgrade Impact Analysis and Risk-Aware Migration Planning. Understand the impact before you upgrade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="bg-[var(--bg-base)] text-[var(--text-primary)] antialiased selection:bg-indigo-500/25 selection:text-indigo-400"
      >
        <ThemeProvider>
          <div className="min-h-screen flex flex-col font-sans">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
