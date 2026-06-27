import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: "Aetherys — Digital Agency | AI Systems, Full Stack & Growth",
  description: "Aetherys is a futuristic digital agency specializing in Full Stack Development, AI Systems & Integration, Automation & AI Agents, and Digital Growth Engineering. We build scalable digital systems, not just websites.",
  keywords: ["digital agency", "AI integration", "full stack development", "automation", "AI agents", "SaaS development", "digital growth"],
  openGraph: {
    title: "Aetherys — Digital Agency",
    description: "We build scalable digital systems, not just websites.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ overflowX: 'hidden', maxWidth: '100%' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#0A0A0A" />
      </head>
      <body style={{ overflowX: 'hidden', maxWidth: '100%', position: 'relative' }}>{children}</body>
    </html>
  );
}
