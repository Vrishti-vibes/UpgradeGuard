import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "UpgradeGuard — Pre-Upgrade Dependency Intelligence",
  description:
    "A Multi-Agent AI System for Dependency Upgrade Impact Analysis and Risk-Aware Migration Planning. Understand the impact before you upgrade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${jetbrainsMono.variable} font-sans bg-[var(--bg-base)] text-[var(--text-primary)] antialiased selection:bg-indigo-500/25 selection:text-indigo-400`}
      >
        <ThemeProvider>
          <div className="min-h-screen bg-tech-grid flex flex-col">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
