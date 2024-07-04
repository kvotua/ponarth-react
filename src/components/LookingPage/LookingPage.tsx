import styles from './LookingPage.module.css';

const LookingPage = () => {
  return (
    <div className={styles.poisk}>
    <div className={styles.text_five}>
      <h3 className={styles.text}>МЫ В ПОИСКЕ СОТРУДНИКОВ</h3>
    </div>

    <img className={styles.man}src="./src/assets/bREWING.png" alt="" />
  </div>
  )
}

export default LookingPage