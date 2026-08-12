import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vinay Suryarao | IT Professional & Web Developer",
  description:
    "Portfolio of Vinay Suryarao — IT Professional, DevOps enthusiast, and Web Developer. Skilled in React, Next.js, Node.js, Docker, AWS, and Red Hat OpenShift.",
  keywords: [
    "Vinay Suryarao",
    "Web Developer",
    "DevOps",
    "Portfolio",
    "React",
    "Next.js",
    "Full Stack Developer",
    "IT Professional",
  ],
  authors: [{ name: "Vinay Suryarao" }],
  openGraph: {
    title: "Vinay Suryarao | IT Professional & Web Developer",
    description:
      "Portfolio of Vinay Suryarao — IT Professional, DevOps enthusiast, and Web Developer.",
    url: "https://suryarao.dev",
    siteName: "Vinay Suryarao Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vinay Suryarao | IT Professional & Web Developer",
    description:
      "Portfolio of Vinay Suryarao — IT Professional, DevOps enthusiast, and Web Developer.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import ThemeProvider from "@/components/ThemeProvider/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
