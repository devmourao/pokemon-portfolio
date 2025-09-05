import PokemonCard from "@/components/PokemonCard";
import SearchBar from "@/components/SearchBar";
import { getPokemonList, PokemonDetails, searchPokemon, PokemonListResponse } from "@/lib/pokeapi";

interface HomeProps {
  searchParams: Promise<{ page?: string; q?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const q = (params?.q ?? "").trim();

  let results: Array<{ name: string; url?: string } | PokemonDetails> = [];
  let next: string | null | undefined = undefined;

  if (q) {
    // Busca por nome
    const found = await searchPokemon(q);
    results = found ? [found] : [];
    next = undefined; // sem paginação em modo busca
  } else {
    // Paginação normal
    const data: PokemonListResponse = await getPokemonList(page);
    results = data.results;
    next = data.next;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Pokédex</h1>

      {/* Campo de busca */}
      <SearchBar />

      {/* Grid de pokémons */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {results.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} />
        ))}
      </div>

      {/* Paginação */}
      <div className="flex justify-center gap-4 mt-6">
        {page > 1 && (
          <a
            href={`/?page=${page - 1}${q ? `&q=${q}` : ""}`}
            className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            ◀ Anterior
          </a>
        )}
        {next && (
          <a
            href={`/?page=${page + 1}${q ? `&q=${q}` : ""}`}
            className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Próximo ▶
          </a>
        )}
      </div>
    </div>
  );
}
