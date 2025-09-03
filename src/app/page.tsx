export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h1 className="text-4xl font-bold text-red-600">Pokédex Portfolio</h1>
      <p className="text-lg text-gray-700">
        🚀 Projeto em Next.js + PokéAPI
      </p>
      <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
        Testar Tailwind
      </button>
    </div>
  );
}
