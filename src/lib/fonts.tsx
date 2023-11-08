import localFont from "next/font/local";

export const clashDisplayFont = localFont({
  src: [
    {
      path: "./fonts/clash_display_medium.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-clash",
  display: "swap",
});

export const hkGuiseFont = localFont({
  src: [
    {
      path: "./fonts/hk_guise_regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/hk_guise_medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-guise",
  display: "swap",
});
