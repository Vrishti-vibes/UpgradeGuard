import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Core background layers
        bg: {
          base: "var(--bg-base)",
          surface: "var(--bg-surface)",
          elevated: "var(--bg-elevated)",
          subtle: "var(--bg-subtle)",
        },
        border: {
          subtle: "var(--border-subtle)",
          strong: "var(--border-strong)",
        },
        // Semantic Multi-Accent System
        accent: {
          indigo: {
            DEFAULT: "#6366F1",
            hover: "#4F46E5",
            subtle: "rgba(99, 102, 241, 0.12)",
            border: "rgba(99, 102, 241, 0.28)",
          },
          violet: {
            DEFAULT: "#8B5CF6", // Supervisor / AI Orchestration
            hover: "#7C3AED",
            subtle: "rgba(139, 92, 246, 0.12)",
            border: "rgba(139, 92, 246, 0.28)",
          },
          teal: {
            DEFAULT: "#14B8A6", // Evidence / AST Code Impact
            hover: "#0D9488",
            subtle: "rgba(20, 184, 166, 0.12)",
            border: "rgba(20, 184, 166, 0.28)",
          },
          emerald: {
            DEFAULT: "#10B981", // Verified / Success
            hover: "#059669",
            subtle: "rgba(16, 185, 129, 0.12)",
            border: "rgba(16, 185, 129, 0.28)",
          },
          amber: {
            DEFAULT: "#F59E0B", // Warning / Partial / Migration Required
            hover: "#D97706",
            subtle: "rgba(245, 158, 11, 0.12)",
            border: "rgba(245, 158, 11, 0.28)",
          },
          coral: {
            DEFAULT: "#F43F5E", // High Risk / Breaking Change / Collision
            hover: "#E11D48",
            subtle: "rgba(244, 63, 94, 0.12)",
            border: "rgba(244, 63, 94, 0.28)",
          },
          sky: {
            DEFAULT: "#0284C7", // Informational / Version Hops
            hover: "#0369A1",
            subtle: "rgba(2, 132, 199, 0.12)",
            border: "rgba(2, 132, 199, 0.28)",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Manrope", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      boxShadow: {
        "glass-sm": "0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 0 0 1px var(--border-subtle)",
        "glass-md": "0 8px 24px -4px rgba(0, 0, 0, 0.12), 0 0 0 1px var(--border-subtle)",
        "glass-lg": "0 16px 36px -8px rgba(0, 0, 0, 0.24), 0 0 0 1px var(--border-subtle)",
      },
    },
  },
  plugins: [],
};

export default config;
