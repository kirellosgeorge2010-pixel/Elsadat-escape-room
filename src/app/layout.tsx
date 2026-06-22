import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
});

export const metadata: Metadata = {
  title: "The Sadat Family Mystery | Escape Room",
  description: "Can you escape the night? An immersive Egyptian escape room experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cairo.variable} h-full antialiased`}>
      <body className="min-h-full m-0 p-0">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
