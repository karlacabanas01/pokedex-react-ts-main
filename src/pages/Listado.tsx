import React, { useEffect, useState } from "react";
import { getPokemons } from "../controller/getpokemon";
import { Pokemon } from "../models/pokemon";
import { PokemonDetailsModal } from "../components/PokemonDetailsModal/PokemonDetailsModal";
import styles from "./Listado.module.css";

const Listado = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [query, setQuery] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      //Todo async va con un await
      const allPokemons = await getPokemons();
      setPokemons([...allPokemons]);
    };
    getData();
  }, []);

  useEffect(() => {
    const filteredPokemon = pokemons?.slice(0, 151).filter((pokemon) => {
      //vive solo dentro de las llaves
      return pokemon.name.toLowerCase().match(query.toLowerCase());
    });
    setFilteredPokemon(filteredPokemon);
  }, [query, pokemons]);

  /*
    Slice devuelve una copia de un array a un nuevo array comenzando por el inicio hasta el fin
    y con esto el array original  no se modificará.
    Map es el mapeo de los atributos.
    En la imagen se le puede por gif, normal o large ya que estan siendo traidas de la API
*/
  return (
    <>
      <header className={styles.header}>
        <div className={styles.containerHeader}>
          <h1>
            <img
              src="https://crisgon.github.io/pokedex/src/images/logo.png"
              alt="Logo Pokedex"
              className={styles.logo}
            />
          </h1>

          <nav>
            <div className="search-container">
              <input
                value={query}
                placeholder="Buscar pokemon"
                type="text"
                onChange={(event) => setQuery(event.target.value.trim())}
                className="search-input"
              />
            </div>
          </nav>
        </div>
      </header>

      <br />
      <div className={styles.contenedorCard}>
        <div className={styles.contenedorPokemones}>
          {filteredPokemon?.slice(0, 151).map((pokemon) => (
            <div key={pokemon.id} className={styles.card}>
              <div className={styles.textos}>
                <p>N° {pokemon.id}</p>
                <h3>{pokemon.name}</h3>
                <img
                  alt=""
                  className={styles.imgPokemon}
                  src={pokemon.imggif}
                />

                <div className={styles.buttonWrapper}>
                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setSelectedPokemon({ ...pokemon }); //Destructurado
                    }}
                    type="button"
                    className={styles.btn}
                  >
                    Ver más
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PokemonDetailsModal
        isOpen={isOpen}
        pokemon={selectedPokemon}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </>
  );
};

export default Listado;
