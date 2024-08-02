import HeaderSlider from "../HeaderSlider";
import styles from "./header.module.scss";

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <section className={styles.header_logo}>
        <div className={styles.header_avatar}>
          <img
            src="https://masterpiecer-images.s3.yandex.net/fa066d4962eb11ee8c6d168cdf1572ce:upscaled"
            alt=""
          />
        </div>
        <p className={styles.name}>Трошкин Александр</p>
      </section>
      <HeaderSlider />
    </div>
  );
};

export default Header;
