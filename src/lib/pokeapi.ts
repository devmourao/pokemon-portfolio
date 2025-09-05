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

export async function getPokemonList(page: number, limit: number = 24): Promise<PokemonListResponse> {
  const offset = (page - 1) * limit;

  console.log('Fetching Pokémon list from API...');
  console.log(`${API_URL}/pokemon?limit=${limit}&offset=${offset}`);
  
  const res = await fetch(`${API_URL}/pokemon?limit=${limit}&offset=${offset}`, {
    next: { revalidate: 3600 }, // revalida a cada 1h
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar pokémons");
  }

  return res.json() as Promise<PokemonListResponse>;
}


export interface PokemonDetails {
  id: number;
  name: string;
  sprites?: {
    front_default?: string;
    other?: {
      ["official-artwork"]?: {
        front_default?: string;
      };
    };
  };
  types?: { slot: number; type: { name: string } }[];
  height?: number;
  weight?: number;
  stats?: { base_stat: number; stat: { name: string } }[];
  abilities?: { ability: { name: string } }[];
}

// Busca 1 Pokémon por nome. Retorna null se não existir.
export async function searchPokemon(name: string): Promise<PokemonDetails | null> {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
