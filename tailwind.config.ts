import type { Config } from "tailwindcss";
import typographyPlugin from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        guise: ["var(--font-guise)", "var(--font-family-base)"],
        clash: ["var(--font-clash)", "var(--font-family-base)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "islamic-black": {
          50: "#E6E6E6",
          100: "#CFCFCF",
          200: "#9E9E9E",
          300: "#6E6E6E",
          400: "#3D3D3D",
          500: "#0C0C0C",
          600: "#0A0A0A",
          700: "#080808",
          800: "#050505",
          900: "#030303",
        },
        "islamic-green": {
          50: "#E6FFF5",
          100: "#CDFEEB",
          200: "#87FDD0",
          300: "#05F599",
          400: "#04E690",
          500: "#04D484",
          600: "#04BE77",
          700: "#03AA6A",
          800: "#038C57",
          900: "#026942",
        },
        "islamic-red": {
          50: "#FFF5F5",
          100: "#FFE5E5",
          200: "#FFCCCC",
          300: "#FFA8A8",
          400: "#FF7A7A",
          500: "#F50000",
          600: "#E00000",
          700: "#C70000",
          800: "#A30000",
          900: "#7A0000",
        },
        "haqq-primary": {
          50: "#f7fbfd",
          100: "#eff7fa",
          200: "#d6eaf3",
          300: "#bdddeb",
          400: "#8cc4dc",
          500: "#5baacd",
          600: "#5299b9",
          700: "#44809a",
          800: "#37667b",
          900: "#2d5364",
        },
        "islamic-modal-overlay": "#0c0c0c66",
        "haqq-border": "#FFFFFF3D",
        "haqq-black": "#0D0D0E",
        "haqq-orange": "#EC5728",
        "haqq-blue": "#091D53",
        "haqq-seaweed": "#157C83",
        "haqq-bigfoot-feet": "#E98C50",
        "haqq-azure": "#ECFEFE",
        "haqq-modal-overlay": "#0D0D0ECC",
        "islamic-primary-green": "#01B26E",
        "islamic-primary-green-hover": "#0BD286",
        "islamic-classic-green": "#18FFAC",
        "islamic-classic-green-hover": "#99FFDA",
        "islamic-primary-graphite": "#181E25A8",
      },
      boxShadow: {
        "islamic-dropdown": "0px 0px 20px rgb(0 0 0 / 20%)",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [typographyPlugin],
};
export default config;
