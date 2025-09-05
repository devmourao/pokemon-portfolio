"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PokemonDetails, PokemonListResult } from "@/lib/pokeapi";

// 🔹 type guard para distinguir entre listagem e detalhes
function isPokemonDetails(
  p: PokemonListResult | PokemonDetails
): p is PokemonDetails {
  return (p as PokemonDetails).id !== undefined;
}

// 🔹 extrai ID da URL (quando vem de listagem)
function extractIdFromUrl(url?: string): number | null {
  if (!url) return null;
  const match = url.match(/\/pokemon\/(\d+)\//);
  return match ? parseInt(match[1], 10) : null;
}

interface PokemonCardProps {
  pokemon: PokemonListResult | PokemonDetails;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    // Caso já venha completo (busca)
    if (isPokemonDetails(pokemon)) {
      setDetails(pokemon);
      const img =
        pokemon.sprites?.other?.["official-artwork"]?.front_default ||
        pokemon.sprites?.front_default ||
        null;
      setImageSrc(img);
      return;
    }

    // Caso venha da listagem (name/url)
    const maybeId = extractIdFromUrl(pokemon.url);
    if (maybeId) {
      const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${maybeId}.png`;
      setImageSrc(img);
      setDetails({
        id: maybeId,
        name: pokemon.name,
      } as PokemonDetails);
      return;
    }

    // fallback → busca na API
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      .then((res) => res.json())
      .then((data: PokemonDetails) => {
        setDetails(data);
        const img =
          data.sprites?.other?.["official-artwork"]?.front_default ||
          data.sprites?.front_default ||
          null;
        setImageSrc(img);
      })
      .catch(() => {
        setDetails(null);
        setImageSrc(null);
      });
  }, [pokemon]);

  if (!details) {
    return (
      <div className="p-4 border rounded-lg shadow bg-gray-50 text-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <Link
      href={`/pokemon/${details.name}`}
      className="p-4 border rounded-lg shadow hover:shadow-md transition bg-red-50 flex flex-col items-center"
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={details.name}
          className="w-24 h-24 object-contain mb-2"
        />
      )}
      <h2 className="capitalize font-bold text-lg">{details.name}</h2>
      <p className="text-sm text-red-500">Ver detalhes</p>
    </Link>
  );
}
