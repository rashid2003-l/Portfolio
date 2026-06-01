import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rashid | AI Engineer & Full-Stack Developer",
  description:
    "Personal portfolio showcasing expertise in Artificial Intelligence, Machine Learning, Full-Stack Web Development, Network Engineering, Cybersecurity, and Data Analytics.",
  keywords: [
    "AI Engineer",
    "Full-Stack Developer",
    "Network Engineer",
    "Cybersecurity",
    "Portfolio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable} dark`}>
      <body className="min-h-screen bg-[#050508] text-[#e0e0e8] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
