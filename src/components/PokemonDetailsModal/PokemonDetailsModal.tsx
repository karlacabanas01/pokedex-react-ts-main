import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal";

export const PokemonDetailsModal = ({ isOpen, pokemon, onClose }: any) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsFlipped(false);
      const timer = setTimeout(() => setIsFlipped(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!pokemon) return null;

  return (
    <Modal handleClose={onClose} isOpen={isOpen}>
      <div className="perspective-1000 w-[340px] h-[480px] mx-auto select-none">
        <div
          className={`relative w-full h-full transition-transform duration-1000 preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* REVERSO: SIMULACIÓN EXACTA */}
          <div className="absolute inset-0 w-full h-full backface-hidden rounded-[20px] border-[10px] border-[#2b58a1] bg-[#1d3673] shadow-2xl flex flex-col items-center justify-between py-10 overflow-hidden">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_white_0%,_transparent_70%)] rotate-12 scale-150"></div>
            <div className="text-[#ffcb05] font-black text-4xl italic tracking-tighter drop-shadow-[2px_2px_0_#2a52be] uppercase">
              Pokémon
            </div>
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
              className="w-32 h-32 relative z-10 drop-shadow-[0_0_20px_white]"
              alt="ball"
            />
            <div className="text-[#ffcb05] font-black text-4xl italic tracking-tighter drop-shadow-[2px_2px_0_#2a52be] uppercase rotate-180">
              Pokémon
            </div>
          </div>

          {/* FRENTE: CARTA GASTLY STYLE */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-[20px] border-[10px] border-[#e9cb4e] bg-[#f8e694] shadow-2xl overflow-hidden flex flex-col">
            <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer"></div>
            </div>

            <div className="p-4 flex justify-between items-center bg-gradient-to-b from-black/5 to-transparent">
              <h2 className="text-2xl font-black text-slate-800 italic tracking-tighter uppercase">
                {pokemon.name}
              </h2>
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-red-600">HP</span>
                <span className="text-2xl font-black text-slate-800">
                  {pokemon.hp}
                </span>
              </div>
            </div>

            <div className="mx-3 rounded-sm border-[4px] border-[#a8a8a8] bg-[#1a1a1a] h-48 overflow-hidden relative shadow-inner">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,_transparent_1px)] [background-size:10px_10px]"></div>
              <img
                src={pokemon.imglarge}
                alt={pokemon.name}
                className="relative z-10 w-full h-full object-contain p-4 drop-shadow-[0_0_15px_white]"
              />
            </div>

            <div className="flex-1 m-1 bg-gray-100 rounded-b-xl p-4 shadow-inner">
              <div className="flex gap-2 mb-4">
                {Array.isArray(pokemon.type) ? (
                  pokemon.type.map((t: any) => (
                    <span
                      key={t}
                      className="px-3 py-0.5 bg-slate-800 text-white text-[10px] font-bold rounded uppercase italic"
                    >
                      {t}
                    </span>
                  ))
                ) : (
                  <span className="px-3 py-0.5 bg-slate-800 text-white text-[10px] font-bold rounded uppercase italic">
                    {pokemon.type}
                  </span>
                )}
              </div>
              <div className="space-y-2.5">
                {[
                  { l: "HP", v: pokemon.hp, c: "bg-green-500" },
                  { l: "ATK", v: pokemon.attack, c: "bg-red-500" },
                  { l: "DEF", v: pokemon.defense, c: "bg-blue-500" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-0.5">
                      <span>{s.l}</span>
                      <span>{s.v}</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-300 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${s.c}`}
                        style={{ width: `${(s.v / 150) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={onClose}
                className="mt-4 w-full py-2 bg-[#2a2a2a] text-white font-bold text-[10px] uppercase tracking-[0.2em] rounded active:scale-95 transition-all"
              >
                CERRAR_FICHA
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
