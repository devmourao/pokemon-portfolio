import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokédex - Portfolio",
  description: "Projeto de estudo em Next.js com PokéAPI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <main className="min-h-screen bg-gray-100 text-gray-900">
          <header className="p-4 bg-red-600 text-white font-bold">
            Pokédex Portfolio
          </header>
          <section className="p-4">{children}</section>
        </main>
      </body>
    </html>
  );
}
