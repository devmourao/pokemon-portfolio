interface PokemonPageProps {
  params: {
    name: string;
  };
}

export default function PokemonPage({ params }: PokemonPageProps) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-red-600">
        Página do Pokémon: {params.name}
      </h1>
      <p>Detalhes em breve...</p>
    </div>
  );
}
