import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const marketingSans = Inter({
  subsets: ["latin"],
  variable: "--marketing-font-sans",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const marketingDisplay = localFont({
  src: "../../../public/fonts/gt-walsheim/GT-Walsheim-Medium-Trial-BF651b7fc728fb3.otf",
  variable: "--marketing-font-display",
  weight: "500",
  style: "normal",
  display: "swap",
  fallback: ["Inter", "system-ui", "sans-serif"],
});
