import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexora | Know your gaps. Own your path.",
  description: "Free AI-powered skill diagnosis and personalized two-week roadmap for students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
