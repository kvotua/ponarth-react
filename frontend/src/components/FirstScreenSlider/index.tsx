import styles from './FirstScreenSlider.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import pivoImg from '../../assets/Банки1-01.svg';
import pivoImg2 from '../../assets/Банки12-01.svg';
import DelayedButton from '../Buttons/DelayedButton'
const FirstScreenSlider = () => {
  return (
    <div className={styles.first_container}>
        <Swiper
     effect={'coverflow'}
    grabCursor={true}
    centeredSlides={true}
    slidesPerView={3}
    spaceBetween={0}
    loop={true}
    coverflowEffect={{
        rotate: 0,
        stretch: 100,
        depth: 400,
        modifier: 1,
        slideShadows: false,
        scale:1,
      }}
    pagination={{
      clickable: true,
    }}
    navigation={true}
    modules={[Pagination, Navigation, EffectCoverflow ]}
    className={styles.swiper}
  >
    <SwiperSlide className={` ${styles.default} ${styles.swiper_slide} `}><img src={pivoImg} alt="" /></SwiperSlide>
    <SwiperSlide className={` ${styles.default} ${styles.swiper_slide}`}><img src={pivoImg2} alt="" /></SwiperSlide>
    <SwiperSlide className={`${styles.default} ${styles.swiper_slide} `}><img src={pivoImg} alt="" /></SwiperSlide>
    <SwiperSlide className={`${styles.default} ${styles.swiper_slide} `}><img src={pivoImg2} alt="" /></SwiperSlide>
    <SwiperSlide className={`${styles.default} ${styles.swiper_slide} `}><img src={pivoImg} alt="" /></SwiperSlide>
    <SwiperSlide className={`${styles.default} ${styles.swiper_slide} `}><img src={pivoImg2} alt="" /></SwiperSlide>
    </Swiper>

    <div className={styles.text_slider}>
    <div className={styles.text_in}>
    <h2 className={styles.gradual_appear}>ПИВО</h2>
          <p>
            Пиво классическое. Сварено по рецептам 1849 года только с использованием натуральных высококачественных ингредиентов
          </p>
          <DelayedButton to='' delay={1} className={styles.button_slider} style='mixed'>ГДЕ ПОПРОБОВАТЬ?</DelayedButton>
</div>
    </div>
    </div>
  )
}

export default FirstScreenSlider