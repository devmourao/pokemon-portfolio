"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  // Sincroniza o input com a URL (?q=)
  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  // Debounce: 400ms após parar de digitar, atualiza a URL
  useEffect(() => {
    const t = setTimeout(() => {
      const sp = new URLSearchParams(searchParams.toString());

      if (query.trim()) {
        sp.set("q", query.trim());
        sp.delete("page"); // ao buscar, resetamos paginação
        router.push(`${pathname}?${sp.toString()}`);
      } else {
        // Remove apenas o parâmetro de busca, mantendo outros (ex.: page)
        sp.delete("q");
        router.push(`${pathname}?${sp.toString()}`);
      }
    }, 400);

    return () => clearTimeout(t);
  }, [query, router, pathname, searchParams]);

  return (
    <input
      type="text"
      placeholder="Buscar Pokémon por nome (ex.: pikachu)"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="border p-2 rounded w-full max-w-md"
    />
  );
}
