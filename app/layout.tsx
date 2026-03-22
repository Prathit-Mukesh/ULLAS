import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Box Office Atlas — Track & Predict Box Office Performance",
  description:
    "The most comprehensive movie analytics platform. Historical box office data, advanced predictions, and deep insights across India and the world.",
  keywords: [
    "box office", "movie analytics", "bollywood", "hollywood", "tollywood",
    "box office prediction", "movie collection", "film industry",
    "movie data", "box office tracker", "indian cinema"
  ],
  authors: [{ name: "Box Office Atlas" }],
  openGraph: {
    title: "Box Office Atlas",
    description: "Track the Past. Predict the Future of Box Office.",
    type: "website",
    locale: "en_US",
    siteName: "Box Office Atlas",
  },
  twitter: {
    card: "summary_large_image",
    title: "Box Office Atlas",
    description: "Track the Past. Predict the Future of Box Office.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
