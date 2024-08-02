import styles from "./LookingPage.module.css";
import SliderVakansii from "../Slider/SliderVakansii";

const Looking = () => {
  return (
    <>
      <div className={styles.div_text}>
        <h2 className={styles.texter_six}>МЫ В ПОИСКЕ <br /> СОТРУДНИКОВ</h2>
      </div>
      <SliderVakansii />
    </>

  );
};

export default Looking;
