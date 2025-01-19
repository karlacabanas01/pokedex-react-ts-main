import Modal from "../Modal/Modal";
import styles from "./PokemonDetailsModal.module.css";

export const PokemonDetailsModal = ({ isOpen, pokemon, onClose }: any) => {
  return (
    <Modal handleClose={onClose} isOpen={isOpen}>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <div className={styles.cardImage}>
            <img
              className={styles.cardImage}
              src={pokemon?.imglarge}
              alt="171x180"
            />
          </div>
          <div className={styles.cardTitle}>
            <h2>{pokemon?.name}</h2>
            <h6>Tipo: {pokemon?.type}</h6>
          </div>

          <div className={styles.cardText}>
            <h3>Estadísticas </h3>

            <h4>
              <img
                className={styles.icons}
                src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
                alt="171x180"
              />
              <b> HP: </b> {pokemon?.hp}
            </h4>

            <h4>
              <img
                className={styles.icons}
                src="https://cdn-icons-png.flaticon.com/512/1007/1007003.png"
                alt="171x180"
              />
              <b> Ataque: </b> {pokemon?.attack}
            </h4>

            <h4>
              <img
                className={styles.icons}
                src="https://cdn-icons-png.flaticon.com/512/5185/5185689.png"
                alt="171x180"
              />
              <b> Defensa: </b> {pokemon?.defense}
            </h4>

            <h4>
              <img
                className={styles.icons}
                src="https://cdn-icons-png.flaticon.com/512/1065/1065450.png"
                alt="171x180"
              />
              <b> E. Defensa: </b> {pokemon?.sp_def}
            </h4>

            <h4>
              <img
                className={styles.icons}
                src="https://cdn-icons-png.flaticon.com/512/7674/7674388.png"
                alt="171x180"
              />
              <b> E. Ataque: </b> {pokemon?.sp_atk}
            </h4>

            <h4>
              <img
                className={styles.icons}
                src="https://cdn-icons-png.flaticon.com/512/1455/1455318.png"
                alt="171x180"
              />
              <b> Velocidad: </b> {pokemon?.speed}
            </h4>
          </div>
        </div>
      </div>
    </Modal>
  );
};
