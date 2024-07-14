import styles from "../Products/products.module.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import banka1 from "../../assets/Банки12-01.svg";
import banka2 from "../../assets/Банки1-01.svg";
import banka3 from "../../assets/Банки-03.svg";

export default function Products() {
  return (
    <div className={styles.wrapper}>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className={styles.images}
      >
        <SwiperSlide>
          <div className={styles.swiperimg}>
            <img src={banka1} alt=""/>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.swiperimg}>
            <img src={banka2} alt="" />
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