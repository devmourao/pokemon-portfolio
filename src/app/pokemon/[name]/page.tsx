import Link from "next/link";
import { PokemonDetails } from "@/lib/pokeapi";

const typeColors: Record<string, string> = {
  normal: "bg-gray-400 text-white",
  fire: "bg-red-500 text-white",
  water: "bg-blue-500 text-white",
  grass: "bg-green-500 text-white",
  electric: "bg-yellow-400 text-black",
  ice: "bg-cyan-400 text-black",
  fighting: "bg-orange-700 text-white",
  poison: "bg-purple-500 text-white",
  ground: "bg-yellow-700 text-white",
  flying: "bg-indigo-400 text-white",
  psychic: "bg-pink-500 text-white",
  bug: "bg-lime-500 text-black",
  rock: "bg-stone-500 text-white",
  ghost: "bg-violet-600 text-white",
  dark: "bg-gray-800 text-white",
  dragon: "bg-indigo-700 text-white",
  steel: "bg-gray-500 text-white",
  fairy: "bg-pink-400 text-black",
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
  params: { name: string };
}

export const dynamic = "force-dynamic";

export default async function PokemonPage({ params }: PokemonPageProps) {
  const { name } = await params;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-red-600">Pokémon não encontrado</h1>
        <Link
          href="/"
          className="mt-6 inline-block px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
        >
          ← Voltar à Pokédex
        </Link>
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
        {/* Botão Voltar */}
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Voltar à Pokédex
        </Link>

        {/* Cabeçalho */}
        <div className="flex flex-col items-center bg-gray-100 shadow rounded-2xl p-6">
          <img src={image} alt={pokemon.name} className="w-48 h-48 object-contain mb-4 drop-shadow-lg" />
          <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>
          <p className="text-gray-600">ID: {pokemon.id}</p>
        </div>

        {/* Tipos */}
        <div className="bg-gray-100 shadow rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">Tipos</h2>
          <div className="flex gap-2">
            {pokemon.types?.map((t) => {
              const typeName = t.type.name;
              return (
                <span
                  key={t.slot}
                  className={`px-3 py-1 rounded-full font-semibold capitalize ${
                    typeColors[typeName] ?? "bg-gray-300 text-white"
                  }`}
                >
                  {typeName}
                </span>
              );
            })}
          </div>
        </div>

        {/* Informações básicas */}
        <div className="bg-gray-100 shadow rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">Informações</h2>
          <p>Altura: {pokemon.height! / 10} m</p>
          <p>Peso: {pokemon.weight! / 10} kg</p>
        </div>

        {/* Habilidades */}
        <div className="bg-gray-100 shadow rounded-2xl p-6">
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
        <div className="bg-gray-100 shadow rounded-2xl p-6">
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
                  <div className="w-full bg-gray-300 rounded-full h-3">
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
