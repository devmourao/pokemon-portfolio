import Link from "next/link";

interface PokemonCardProps {
  name: string;
}

export default function PokemonCard({ name }: PokemonCardProps) {
  return (
    <Link
      href={`/pokemon/${name}`}
      className="p-4 border rounded-lg shadow hover:shadow-md transition bg-red-50 flex flex-col items-center"
    >
      <h2 className="capitalize font-bold text-lg">{name}</h2>
      <p className="text-sm text-red-500">Ver detalhes</p>
    </Link>
  );
}
