import styles from "./LookingPage.module.css";

const Looking = () => {
  return (
    <div className={styles.poisk}>
      <div className={styles.text_five}>
        <h1 className={styles.text}>МЫ В ПОИСКЕ СОТРУДНИКОВ</h1>
      </div>

      <img className={styles.man} src="./src/assets/bREWING.png" alt="" />
    </div>
  );
};

export default Looking;
