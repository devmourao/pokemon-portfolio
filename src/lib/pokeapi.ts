const API_URL = "https://pokeapi.co/api/v2";

export interface PokemonListResult {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListResult[];
}

export async function getPokemonList(page: number, limit: number = 24) {
  const offset = (page - 1) * limit;
  const res = await fetch(`${API_URL}/pokemon?limit=${limit}&offset=${offset}`, {
    next: { revalidate: 3600 }, // revalida a cada 1h
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar pokémons");
  }

  return res.json() as Promise<PokemonListResponse>;
}
