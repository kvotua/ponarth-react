import styles from "./LookingPage.module.css";
import Vakansii from "../Vakansii";

const Looking = () => {
  return (
    <>
    <div className={styles.div_text}>
        <h2 className={styles.texter_six}>МЫ В ПОИСКЕ <br /> СОТРУДНИКОВ</h2>
    </div>
    <Vakansii/>
    </>
    
  );
};

export default Looking;
