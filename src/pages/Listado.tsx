import React, { useEffect, useState } from "react";
import { getPokemons } from "../controller/getpokemon";
import { Pokemon } from "../models/pokemon";
import { PokemonDetailsModal } from "../components/PokemonDetailsModal/PokemonDetailsModal";
import styles from "./Listado.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const Listado = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [query, setQuery] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(10); // Por defecto 10 para pantallas grandes

  useEffect(() => {
    const getData = async () => {
      const allPokemons = await getPokemons();
      setPokemons([...allPokemons]);
    };
    getData();
  }, []);

  useEffect(() => {
    const filteredPokemon = pokemons
      ?.slice(0, 151)
      .filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );
    setFilteredPokemon(filteredPokemon);
  }, [query, pokemons]);

  // Detectar tamaño de pantalla y ajustar el número de Pokémon por página
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setPokemonsPerPage(10); // Pantallas grandes
      } else {
        setPokemonsPerPage(5); // Pantallas pequeñas
      }
    };

    handleResize(); // Llamar inicialmente
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Cálculo de Pokémon visibles en la página actual
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemon.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  // Cambiar página
  const totalPages = Math.ceil(filteredPokemon.length / pokemonsPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Escuchar cambios en 'query' para resetear la paginación
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

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
          {currentPokemons.map((pokemon) => (
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
                      setSelectedPokemon({ ...pokemon });
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
        <div className={styles.pagination}>
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={styles.arrowButton}
          >
            <IoIosArrowBack />
          </button>
          {currentPage > 3 && (
            <>
              <button onClick={() => paginate(1)} className={styles.pageButton}>
                1
              </button>
              {currentPage > 4 && <span className={styles.dots}>...</span>}
            </>
          )}
          {Array.from({ length: 5 }, (_, index) => currentPage - 2 + index)
            .filter((page) => page >= 1 && page <= totalPages)
            .map((page) => (
              <button
                key={page}
                onClick={() => paginate(page)}
                className={`${styles.pageButton} ${
                  currentPage === page ? styles.activePage : ""
                }`}
              >
                {page}
              </button>
            ))}
          {currentPage < totalPages - 2 && (
            <>
              {currentPage < totalPages - 3 && (
                <span className={styles.dots}>...</span>
              )}
              <button
                onClick={() => paginate(totalPages)}
                className={styles.pageButton}
              >
                {totalPages}
              </button>
            </>
          )}
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={styles.arrowButton}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>

      {/* Paginación */}

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
