import styles from "../Products/products.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import banka1 from "../../assets/Банки12-01.svg";
import banka2 from "../../assets/Банки1-01.svg";
import banka3 from "../../assets/Банки-03.svg";
import banka4 from "../../assets/Банки-02.svg";
export default function Products() {
  return (
    <div className={styles.wrapper}>
      <Swiper
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3} // Показывать три слайда одновременно
        spaceBetween={50} // Промежуток между слайдами
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '"></span>';
          },
        }}
        navigation={true}
        loop={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className={styles.images}
      >
        <SwiperSlide>
          <div className={styles.swiperimg}>
            <img src={banka1} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.swiperimg}>
            <img src={banka2} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.swiperimg}>
            <img src={banka4} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.swiperimg}>
            <img src={banka3} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.swiperimg}>
            <img src={banka3} alt="" />
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
                <span className={`${styles.icon} ${styles.arrow}`}></span>
              </span>
              <span className={styles.button_text}>Где попробовать?</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
