import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "StratosCode — Legacy Code Modernization Engine",
  description:
    "AI-powered platform that transforms COBOL, Java 7, and .NET Framework codebases into production-ready modern code with IaC, tests, and architecture docs.",
  keywords: [
    "legacy modernization",
    "COBOL migration",
    "code transformation",
    "GenAI",
    "AWS Bedrock",
  ],
  openGraph: {
    title: "StratosCode",
    description: "Legacy in. Cloud-native out.",
    url: "https://stratoscode.io",
    siteName: "StratosCode",
    images: [
      {
        url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=Fira+Code:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-void text-text-primary font-body antialiased">
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
