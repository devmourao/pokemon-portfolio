import PokemonCard from "@/components/PokemonCard";
import { getPokemonList } from "@/lib/pokeapi";

interface HomeProps {
  searchParams: { page?: string };
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams ; 
  const page = Number(params.page) || 1;
  const data = await getPokemonList(page);


  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Pokédex</h1>

      {/* Grid de pokémons */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data.results.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} />
        ))}
      </div>

      {/* Paginação */}
      <div className="flex justify-center gap-4 mt-6">
        {page > 1 && (
          <a
            href={`/?page=${page - 1}`}
            className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            ◀ Anterior
          </a>
        )}
        {data.next && (
          <a
            href={`/?page=${page + 1}`}
            className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Próximo ▶
          </a>
        )}
      </div>
    </div>
  );
}
