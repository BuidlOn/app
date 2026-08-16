import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque, Fragment_Mono } from "next/font/google";
import { AppProviders } from "@/providers/app-providers";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-bricolage",
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-fragment-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://buidlon.dev"),
  title: {
    default: "BuidlOn — The Open Source Contribution Platform",
    template: "%s — BuidlOn",
  },
  description:
    "Earn rewards for GitHub contributions. Claim on-chain rewards for verified pull requests on Avalanche projects.",
  openGraph: {
    title: "BuidlOn — The Open Source Contribution Platform",
    description:
      "Earn rewards for GitHub contributions. Join the future of decentralized open source development.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bricolage.variable} ${fragmentMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body text-body selection:bg-primary selection:text-on-primary">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
