import React, { ChangeEvent } from "react";

interface HeaderProps {
  query: string;
  setQuery: (value: string) => void;
  selectedType: string;
  setSelectedType: (value: string) => void;
}

const PokedexHeader: React.FC<HeaderProps> = ({
  query,
  setQuery,
  selectedType,
  setSelectedType,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const types = [
    {
      name: "FUEGO",
      color: "hover:bg-orange-600",
      active: "bg-orange-600 text-white border-orange-400",
    },
    {
      name: "AGUA",
      color: "hover:bg-blue-600",
      active: "bg-blue-600 text-white border-blue-400",
    },
    {
      name: "PLANTA",
      color: "hover:bg-green-600",
      active: "bg-green-600 text-white border-green-400",
    },
    {
      name: "ELÉCTRICO",
      color: "hover:bg-yellow-500",
      active: "bg-yellow-500 text-black border-yellow-300",
    },
  ];

  return (
    <header className="relative sticky top-0 z-50 w-full overflow-hidden border-b-4 border-red-600 bg-[#0a0a0a] font-sans">
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(#ffffff 0.5px, transparent 0.5px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 flex justify-between px-6 py-1 font-mono text-[9px] tracking-widest text-red-500 bg-black/80">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
          <span>DATA_LINK: ESTABLISHED</span>
        </div>
        <div className="hidden md:block">
          ENCRYPTED POKEMON DATABASE V.2.0.26
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex flex-col items-center shrink-0">
            <div className="relative p-2 bg-gradient-to-b from-red-600 to-red-900 rounded-lg shadow-lg mb-4">
              <img
                src="https://crisgon.github.io/pokedex/src/images/logo.png"
                alt="Logo Pokedex"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="relative group cursor-crosshair">
              <div className="absolute -inset-2 bg-blue-500/20 blur-xl rounded-full group-hover:bg-blue-500/40 transition-colors" />
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                alt="Pikachu"
                className="relative w-20 h-20 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] animate-pulse"
              />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-blue-500 text-[8px] px-2 py-0.5 rounded font-mono text-white">
                ID_SCAN: 025
              </div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-4xl">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 via-blue-500 to-red-600 rounded-xl opacity-30 group-focus-within:opacity-100 transition duration-1000 blur-sm"></div>
              <div className="relative flex items-center bg-[#111] border border-white/10 rounded-xl px-5 py-4 shadow-2xl">
                <span className="text-2xl mr-4 opacity-70">🔍</span>
                <input
                  value={query}
                  placeholder="IDENTIFICAR OBJETIVO..."
                  type="text"
                  onChange={handleInputChange}
                  className="w-full bg-transparent text-white font-mono text-lg outline-none placeholder:text-gray-600 uppercase tracking-widest"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="ml-2 px-3 py-1 bg-red-900/30 border border-red-500/50 text-red-500 text-[10px] rounded font-black hover:bg-red-500 hover:text-white transition-all"
                  >
                    CLEAR_
                  </button>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-5 overflow-x-auto pb-2 no-scrollbar">
              <button
                onClick={() => setSelectedType("")}
                className={`flex-shrink-0 px-4 py-1.5 border font-bold rounded tracking-widest transition-all text-[10px] ${
                  selectedType === ""
                    ? "bg-white/20 text-white border-white/40 shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                    : "bg-white/5 text-gray-400 border-white/10 hover:text-white"
                }`}
              >
                TODOS
              </button>

              {types.map((t) => (
                <button
                  key={t.name}
                  onClick={() => setSelectedType(t.name)}
                  className={`flex-shrink-0 px-4 py-1.5 border font-bold rounded tracking-widest transition-all text-[10px] ${
                    t.color
                  } ${
                    selectedType === t.name
                      ? t.active + " shadow-lg scale-105"
                      : "bg-white/5 text-gray-400 border-white/10 hover:text-white"
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PokedexHeader;
