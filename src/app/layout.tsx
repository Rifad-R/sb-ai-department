import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI & Data Science | St. Berchmans College Changanassery",
  description:
    "Department of Artificial Intelligence & Data Science at St. Berchmans College (Autonomous), Changanassery. BSc (Hons) AI & Data Science — First Batch 2026-2030. Cutting-edge curriculum in AI, Machine Learning, and Data Analytics.",
  keywords: [
    "St Berchmans College",
    "AI and Data Science",
    "Changanassery",
    "BSc AI",
    "Data Science Kerala",
    "Artificial Intelligence",
    "Machine Learning",
  ],
  openGraph: {
    title: "AI & Data Science | St. Berchmans College Changanassery",
    description:
      "Department of Artificial Intelligence & Data Science — First Batch 2026-2030",
    type: "website",
  },
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
