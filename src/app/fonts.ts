import localFont from "next/font/local";

export const roobert = localFont({
  src: [
    { path: "../../public/fonts/Roobert-Light.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/Roobert-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/Roobert-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-roobert",
  display: "swap",
});

export const roobertMono = localFont({
  src: [
    { path: "../../public/fonts/RoobertMono-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/RoobertMono-Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/RoobertMono-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-roobert-mono",
  display: "swap",
});
