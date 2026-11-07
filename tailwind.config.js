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
        // Misty slate + one navy accent (liquid-glass reference). Contrast is
        // against white unless noted; full table in docs/SYSTEM_CHANGES.md.
        hf: {
          page: "#EEF1F5", // screen background (ink-700 on it 6.59:1)
          mist: "#F5F7FA", // solid tile surface
          line: "#E1E6EE", // hairlines (graphic only)
          slate: {
            300: "#B9C2D5", // Home haze, lightest stop (no text on it)
            400: "#8F9CB9", // Home haze, deepest stop (no text on it)
          },
          navy: {
            50: "#EDF0F7", // selected / info surface
            100: "#DCE2EE", // info border; text on navy (10.34:1 on 800)
            500: "#56669A", // decorative only
            600: "#36457C", // the accent: buttons, selected ring, links (white 9.13:1)
            700: "#2B386A", // pressed, info title (9.81:1 on navy-50)
            800: "#222C56",
            900: "#161D3B", // total band, toast
          },
          ink: {
            900: "#1B2238", // primary text (13.91:1 on page)
            700: "#4B556B", // secondary text (6.59:1 on page, 5.28:1 on haze glass)
            500: "#7E879C", // graphics only: radio/checkbox borders (3.60:1)
            300: "#CDD3DF", // borders, disabled fills
          },
          amber: {
            50: "#FFF6E8",
            100: "#FBE3BF",
            700: "#9A4B07", // caution title (5.79:1 on amber-50)
          },
          green: {
            50: "#EAF7F0",
            400: "#4ADE80", // icon on navy-900 only (Toast tick)
            600: "#11663A", // money in: 7.03:1 on white, ≥ 4.97:1 on any glass over the haze
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
        // Shadows are tinted with the navy, never neutral black glows.
        "hf-soft": "0 1px 2px rgba(22, 29, 59, 0.04), 0 14px 34px -18px rgba(22, 29, 59, 0.28)",
        "hf-float": "0 18px 40px -16px rgba(22, 29, 59, 0.40), 0 2px 6px rgba(22, 29, 59, 0.06)",
      },
      fontSize: {
        display: ["28px", { lineHeight: "34px", fontWeight: "700" }],
        title: ["20px", { lineHeight: "26px", fontWeight: "600" }],
        body: ["15px", { lineHeight: "22px", fontWeight: "400" }],
        caption: ["13px", { lineHeight: "18px", fontWeight: "400" }],
        // Hi-fi type scale (Geist). Light display weights, regular headings.
        // Money facts never use hf-small.
        "hf-hero": ["42px", { lineHeight: "46px", letterSpacing: "-0.035em", fontWeight: "300" }],
        "hf-h1": ["26px", { lineHeight: "32px", letterSpacing: "-0.025em", fontWeight: "400" }],
        "hf-h2": ["18px", { lineHeight: "24px", letterSpacing: "-0.015em", fontWeight: "500" }],
        "hf-body": ["15px", { lineHeight: "22px", letterSpacing: "-0.005em", fontWeight: "400" }],
        "hf-small": ["13px", { lineHeight: "18px", fontWeight: "400" }],
      },
    },
  },
  plugins: [],
};
