/**
 * NovaKit Lite — design tokens.
 * These are the shared vocabulary every screen should build from.
 */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Brand — indigo, with a full tint ramp for surfaces, hovers and emphasis.
        brand: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          400: "#818CF8",
          DEFAULT: "#4F46E5", // primary
          pressed: "#3730A3",
          800: "#312E81",
        },
        // Accent — warm amber, for highlights and expressive moments.
        accent: {
          50: "#FFF7E6",
          100: "#FDECC8",
          DEFAULT: "#F59E0B",
          600: "#B45309",
        },
        neutral: {
          50: "#FAFAFA",
          100: "#F2F2F2",
          200: "#ECECEC",
          300: "#D9D9D9",
          500: "#808080",
          700: "#4D4D4D",
          900: "#1A1A1A",
        },
        success: "#1E9E5A",

        // ── NovaKit Hi-Fi (the "High fidelity" view) ────────────────────────
        // Its own namespace, so the wireframe tokens above stay untouched.
        // Contrast is measured against white unless noted; see DESIGN.md §10.
        hf: {
          page: "#E8EEF8", // behind sheets and tiles
          mist: "#F3F6FB", // tile surface on white
          line: "#E3E9F3", // dividers and hairlines (graphic only)
          blue: {
            50: "#EEF4FF", // selected surface, info Notice
            100: "#DCE7FD", // text on navy (12.79:1)
            400: "#5B8DEF", // decorative glows only (3.23:1, never text)
            600: "#2560D8", // primary action, hero (white on it 5.61:1)
            700: "#1D4CB0", // hero top, pressed, links on blue-50 (7.01:1)
          },
          navy: {
            800: "#1A2B63",
            900: "#121F4A", // "Total you repay" band, Toast (white 15.9:1)
          },
          ink: {
            900: "#0E1629", // primary text (18.02:1)
            700: "#3D4A63", // secondary text (8.91:1; 8.22:1 on mist)
            500: "#6B7894", // graphics/placeholders only (4.09:1 on mist)
            300: "#C9D2E3", // borders, disabled fills
          },
          amber: {
            50: "#FFF6E8",
            100: "#FBE3BF",
            700: "#9A4B07", // caution title (5.79:1 on amber-50)
          },
          green: {
            50: "#EAF7F0",
            400: "#4ADE80", // icon on navy-900 only (Toast tick, 10.3:1)
            600: "#16804A", // money in (4.98:1)
          },
        },
      },
      fontFamily: {
        geist: ['"Geist Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "20px",
        "hf-sm": "14px",
        "hf-md": "20px",
        "hf-lg": "28px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0, 0, 0, 0.08)",
        // Shadows are tinted with the hero blue, never neutral black glows.
        "hf-soft": "0 1px 2px rgba(14, 22, 41, 0.04), 0 12px 32px -14px rgba(29, 76, 176, 0.22)",
        "hf-float": "0 16px 40px -14px rgba(18, 31, 74, 0.38), 0 2px 6px rgba(18, 31, 74, 0.08)",
        "hf-press": "0 8px 20px -10px rgba(37, 96, 216, 0.9)", // primary button lift
        "hf-sheet": "0 -6px 20px -14px rgba(18, 31, 74, 0.3)", // sheet rising over the hero
        "hf-glass":"inset 0 1px 0 rgba(255, 255, 255, 0.28), inset 0 0 0 1px rgba(255, 255, 255, 0.14)",
      },
      fontSize: {
        display: ["28px", { lineHeight: "34px", fontWeight: "700" }],
        title: ["20px", { lineHeight: "26px", fontWeight: "600" }],
        body: ["15px", { lineHeight: "22px", fontWeight: "400" }],
        caption: ["13px", { lineHeight: "18px", fontWeight: "400" }],
        // Hi-fi type scale (Geist). Money facts never go below hf-body.
        "hf-hero": ["44px", { lineHeight: "48px", letterSpacing: "-0.035em", fontWeight: "600" }],
        "hf-h1": ["26px", { lineHeight: "32px", letterSpacing: "-0.025em", fontWeight: "600" }],
        "hf-h2": ["19px", { lineHeight: "24px", letterSpacing: "-0.015em", fontWeight: "600" }],
        "hf-body": ["15px", { lineHeight: "22px", letterSpacing: "-0.005em", fontWeight: "400" }],
        "hf-small": ["13px", { lineHeight: "18px", fontWeight: "500" }],
      },
    },
  },
  plugins: [],
};
