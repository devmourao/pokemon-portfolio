import { PokemonDetails } from "@/lib/pokeapi";

const typeColors: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  grass: "bg-green-500",
  electric: "bg-yellow-400",
  ice: "bg-cyan-400",
  fighting: "bg-orange-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-700",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-stone-500",
  ghost: "bg-violet-600",
  dark: "bg-gray-800",
  dragon: "bg-indigo-700",
  steel: "bg-gray-500",
  fairy: "bg-pink-400",
};

const statColors: Record<string, string> = {
  hp: "bg-green-500",
  attack: "bg-red-500",
  defense: "bg-blue-500",
  "special-attack": "bg-purple-500",
  "special-defense": "bg-teal-500",
  speed: "bg-yellow-400",
};

interface PokemonPageProps {
  params: {
    name: string;
  };
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
  if (!res.ok) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-red-600">Pokémon não encontrado</h1>
      </div>
    );
  }

  const pokemon: PokemonDetails = await res.json();

  const image =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.front_default ||
    "";

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        {/* Cabeçalho */}
        <div className="flex flex-col items-center bg-white shadow rounded-2xl p-6">
          <img
            src={image}
            alt={pokemon.name}
            className="w-48 h-48 object-contain mb-4 drop-shadow-lg"
          />
          <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>
          <p className="text-gray-600">ID: {pokemon.id}</p>
        </div>

        {/* Tipos */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">Tipos</h2>
          <div className="flex gap-2">
            {pokemon.types?.map((t) => {
              const typeName = t.type.name;
              return (
                <span
                  key={t.slot}
                  className={`px-3 py-1 rounded-full text-white font-semibold capitalize ${typeColors[typeName] || "bg-gray-300"}`}
                >
                  {typeName}
                </span>
              );
            })}
          </div>
        </div>

        {/* Infos básicas */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">Informações</h2>
          <p>Altura: {pokemon.height! / 10} m</p>
          <p>Peso: {pokemon.weight! / 10} kg</p>
        </div>

        {/* Habilidades */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">Habilidades</h2>
          <ul className="list-disc pl-6 space-y-1">
            {pokemon.abilities?.map((a) => (
              <li key={a.ability.name} className="capitalize">
                {a.ability.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Stats */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">Stats</h2>
          <ul className="space-y-4">
            {pokemon.stats?.map((s) => {
              const statName = s.stat.name;
              const statColor = statColors[statName] || "bg-gray-400";
              return (
                <li key={statName} className="capitalize">
                  <div className="flex items-center justify-between mb-1">
                    <span>{statName.replace("-", " ")}</span>
                    <span className="font-bold">{s.base_stat}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`${statColor} h-3 rounded-full`}
                      style={{ width: `${(s.base_stat / 200) * 100}%` }}
                    ></div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
