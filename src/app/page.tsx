import PokemonCard from "@/components/PokemonCard";
import SearchBar from "@/components/SearchBar";
import FooterMessage from "@/components/FooterMessage";
import {
  getPokemonList,
  PokemonListResponse,
  searchPokemon,
  PokemonDetails,
  PokemonListResult,
} from "@/lib/pokeapi";

interface HomeProps {
  searchParams: Promise<{ page?: string; q?: string }>;
}

// Type guard para identificar PokemonDetails
function isPokemonDetails(pokemon: PokemonListResult | PokemonDetails): pokemon is PokemonDetails {
  return "id" in pokemon;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const q = (params?.q ?? "").trim();
  const page = Number(params?.page) || 1;

  let results: Array<PokemonListResult | PokemonDetails> = [];
  let next: string | null | undefined = undefined;

  if (q) {
    const found = await searchPokemon(q);
    results = found ? [found] : [];
  } else {
    const data: PokemonListResponse = await getPokemonList(page);
    results = data.results;
    next = data.next;
  }

  return (
    <div className="flex flex-col gap-6 min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white px-4 py-6">
      <h1 className="text-3xl font-bold text-center">Pokédex</h1>

      {/* Campo de busca */}
      <SearchBar />

      {/* Grid de pokémons */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {results.length > 0 ? (
          results.map((pokemon) => (
            <PokemonCard
              key={isPokemonDetails(pokemon) ? String(pokemon.id) : pokemon.name}
              pokemon={pokemon}
            />
          ))
        ) : (
          <p className="text-center col-span-full">Nenhum Pokémon encontrado.</p>
        )}
      </div>

      {/* Paginação */}
      {!q && (
        <div className="flex justify-center gap-4 mt-6">
          {page > 1 && (
            <a
              href={`/?page=${page - 1}`}
              className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
            >
              ◀ Anterior
            </a>
          )}
          {next && (
            <a
              href={`/?page=${page + 1}`}
              className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
            >
              Próximo ▶
            </a>
          )}
        </div>
      )}

      {/* Mensagem de rodapé */}
      <FooterMessage />
    </div>
  );
}
