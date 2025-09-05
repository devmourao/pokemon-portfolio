import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="bg-gray-50">
        {/* Cabeçalho fixo */}
        <header className="bg-red-600 text-white p-4 shadow-md">
          <div className="max-w-6xl mx-auto">
            <Link href="/" className="text-lg font-bold hover:underline">
              Pokédex Portfolio
            </Link>
          </div>
        </header>

        {/* Conteúdo principal */}
        <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
