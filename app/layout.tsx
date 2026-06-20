import type { Metadata } from "next";
import { Caveat, Quicksand } from "next/font/google";
import "./globals.css";

const caveat = Caveat({ 
  subsets: ["latin"],
  weight: ['600', '700'],
  variable: '--font-caveat' 
});

const quicksand = Quicksand({ 
  subsets: ["latin"],
  weight: ['500', '600', '700'],
  variable: '--font-quicksand'
});

export const metadata: Metadata = {
  title: "Happy Father's Day!",
  description: "Dad Chat Bot & Favorite Child Proclaimer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${caveat.variable} ${quicksand.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}