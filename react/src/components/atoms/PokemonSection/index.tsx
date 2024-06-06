import styles from "./index.module.css";

type Props = {
  HeaderElement: React.ReactNode;
  SpritesElement: React.ReactNode;
  DescriptionElement: React.ReactNode;
};

export const PokemonSection: React.FC<Props> = ({
  HeaderElement,
  SpritesElement,
  DescriptionElement,
}) => {
  return (
    <section>
      <header className={styles.header}>{HeaderElement}</header>
      <div className={styles.sprites}>{SpritesElement}</div>
      <div className={styles.description}>{DescriptionElement}</div>
    </section>
  );
};
