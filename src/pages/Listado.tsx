import React, { useEffect, useState } from "react";
import { getPokemons } from "../controller/getpokemon";
import { Pokemon } from "../models/pokemon";
import { PokemonDetailsModal } from "../components/PokemonDetailsModal/PokemonDetailsModal";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import PokedexHeader from "../components/Header/Header";

const Listado = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [query, setQuery] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(10);

  useEffect(() => {
    const getData = async () => {
      const allPokemons = await getPokemons();
      setPokemons(allPokemons);
      setFilteredPokemon(allPokemons);
    };
    getData();
  }, []);

  useEffect(() => {
    let results = [...pokemons];

    if (selectedType !== "") {
      const typeTranslation: Record<string, string> = {
        FUEGO: "Fire",
        AGUA: "Water",
        PLANTA: "Grass",
        ELÉCTRICO: "Electric",
      };
      const target = typeTranslation[selectedType];
      results = results.filter((pokemon) => {
        if (Array.isArray(pokemon.type))
          return pokemon.type.some((t: string) => t === target);
        return pokemon.type === target;
      });
    }

    if (query.trim() !== "") {
      const search = query.toLowerCase().trim();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.id.toString().includes(search)
      );
    }

    setFilteredPokemon(results);
    setCurrentPage(1);
  }, [query, selectedType, pokemons]);

  const totalPages = Math.ceil(filteredPokemon.length / pokemonsPerPage);
  const currentPokemons = filteredPokemon.slice(
    (currentPage - 1) * pokemonsPerPage,
    currentPage * pokemonsPerPage
  );

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden pb-20">
      {/* Fondo Decorativo */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(#94a3b8 0.5px, transparent 0.5px)`,
          backgroundSize: "30px 30px",
        }}
      />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-600/10 rounded-full blur-[120px]" />

      <div className="relative z-10">
        <PokedexHeader
          query={query}
          setQuery={setQuery}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />

        <main className="max-w-7xl mx-auto py-8 px-4">
          <div className="mb-8 flex items-center gap-3 font-mono text-xs">
            <span className="bg-slate-800/50 text-red-500 px-3 py-1.5 rounded border border-red-500/30 shadow-lg shadow-red-500/5">
              SCAN_RESULTS:{" "}
              <span className="text-white">{filteredPokemon.length}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {currentPokemons.map((pokemon) => (
              <div
                key={pokemon.id}
                className="group relative flex flex-col bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 transition-all duration-300 hover:bg-white/10 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(255,255,255,0.05)]"
              >
                <span className="absolute top-3 right-4 text-[10px] font-mono text-white/20 font-bold tracking-widest">
                  #{pokemon.id}
                </span>

                <div className="flex justify-center items-center h-32 bg-black/20 rounded-xl mb-5 border border-white/5 inner-shadow overflow-hidden">
                  <img
                    alt={pokemon.name}
                    className="w-16 h-16 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:scale-125 transition-transform duration-500"
                    src={pokemon.imggif}
                  />
                </div>

                <div className="text-center space-y-3">
                  <h3 className="text-lg font-black text-white uppercase italic tracking-tighter truncate">
                    {pokemon.name}
                  </h3>
                  <div className="flex justify-center gap-2">
                    <span className="px-3 py-0.5 bg-red-500/10 border border-red-500/30 text-[9px] font-bold text-red-400 rounded-full uppercase italic">
                      {Array.isArray(pokemon.type)
                        ? pokemon.type[0]
                        : pokemon.type}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedPokemon(pokemon);
                    setIsOpen(true);
                  }}
                  className="mt-6 w-full py-2.5 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-lg hover:bg-red-600 hover:border-red-600 transition-all"
                >
                  Analizar_Datos
                </button>
              </div>
            ))}
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-16">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-red-600 disabled:opacity-20 transition-all shadow-xl"
              >
                <IoIosArrowBack size={20} />
              </button>
              <span className="font-mono text-white text-sm bg-slate-800 px-4 py-2 rounded-lg border border-white/5">
                PAG <span className="text-red-500">{currentPage}</span> /{" "}
                {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-red-600 disabled:opacity-20 transition-all shadow-xl"
              >
                <IoIosArrowForward size={20} />
              </button>
            </div>
          )}
        </main>
      </div>
      <PokemonDetailsModal
        isOpen={isOpen}
        pokemon={selectedPokemon}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default Listado;
