import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Choco Aventuras - Alquiler de Cuatrimotos",
  description: "Aventuras en cuatrimoto para toda la familia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="/choco-aventuras-effects.css" />
        <link rel="stylesheet" href="/oro18k-effects.css" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
