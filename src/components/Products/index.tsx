import styles from "./products.module.css";
import banka1 from "../../assets/Банки12-01.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Swiper as SwiperClass } from "swiper/core";

const Products: React.FC = () => {
  const handleSlideChange = (swiper: SwiperClass) => {
    const { activeIndex, slides } = swiper;
    slides.forEach((slide, index) => {
      slide.style.transform = index === activeIndex ? "scale(1)" : "scale(0.8)";
    });
  };

  return (
    <div className={styles.wrapper}>
      <Swiper
        spaceBetween={0}
        slidesPerView={3}
        centeredSlides={true}
        onSlideChangeTransitionEnd={handleSlideChange}
        onSwiper={(swiper) => handleSlideChange(swiper)}
        className={styles.images}
      >
        <SwiperSlide>
          <div>
            <img src={banka1} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img src={banka1} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img src={banka1} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img src={banka1} alt="" />
          </div>
        </SwiperSlide>
      </Swiper>
      <div className={styles.text_slider}>
        <div className={styles.text_in}>
          <h2 className={styles.gradual_appear}>ПИВО</h2>

          <p>
            Пиво классическое. Сварено по рецептам 1849 года только с
            использованием натуральных высококачественных ингридиентов
          </p>

          <a href="#maps" style={{ width: "250px" }}>
            <button className={styles.learn_more}>
              <span className={styles.circle} aria-hidden="true">
                <span className={styles.icon_arrow}></span>
              </span>
              <span className={styles.button_text}>Где попробовать?</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Products;
