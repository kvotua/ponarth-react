import styles from './FirstScreenSlider.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useContext } from "react";
import './swiper.css';
import './swiperNavigation.css';
import './swiperPagination.css';
import { Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import pivoImg from '../../assets/bottle1-01.svg';
import pivoImg2 from '../../assets/bottle2-01.svg';
import pivoImg3 from '../../assets/bottle3-01.svg';
import DelayedButton from '../Buttons/DelayedButton';
import { ThemeContext } from "../RightBar";
const FirstScreenSlider = () => {
  const { theme } = useContext(ThemeContext);
  const themeButton = theme === "dark" ? "white" : "mixed";
  return (
    <div className={styles.first_container} content='f' id='sorta'>
        <Swiper
     effect={'coverflow'}
    grabCursor={true}
    centeredSlides={true}
    slidesPerView={3}
    spaceBetween={0}
    loop={true}
    coverflowEffect={{
        rotate: 0,
        stretch: 20,
        depth: 250,
        modifier: 1,
        slideShadows: false,
        scale:1,
      }}
      breakpoints={{
        769:{
slidesPerView:3,
coverflowEffect: {
  rotate: 0,
  stretch: 0,
  depth: 250,
  modifier: 1,
  slideShadows: false,
},
        },
        600:{
          slidesPerView: 1,
          coverflowEffect: {
            rotate: 0,
            stretch: 420,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          },
        },
        500:{
          slidesPerView: 1,
          coverflowEffect: {
            rotate: 0,
            stretch: 300,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          },
        },
        320: {
          slidesPerView: 1,
          coverflowEffect: {
            rotate: 0,
            stretch: 190,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          },
        },
      }}
    pagination={{
      el: '.custom-pagination',
      clickable: true,
      bulletActiveClass:'swiper-pagination-bullet-active-first',
      bulletClass:'swiper-pagination-bullet-first',
      modifierClass:'swiper-pagination-first'
    }}
    navigation={ true }
    modules={[Pagination, Navigation, EffectCoverflow ]}
    className={styles.swiper} 
    content='f'
  >
    <SwiperSlide className={` ${styles.default} ${styles.swiper_slide} `} content='f'><img src={pivoImg} alt="" /></SwiperSlide>
    <SwiperSlide className={` ${styles.default} ${styles.swiper_slide}`} content='f'><img src={pivoImg2} alt="" /></SwiperSlide>
    <SwiperSlide className={`${styles.default} ${styles.swiper_slide} `} content='f'><img src={pivoImg3} alt="" /></SwiperSlide>
 <SwiperSlide className={` ${styles.default} ${styles.swiper_slide} `} content='f'><img src={pivoImg} alt="" /></SwiperSlide>
 <div className="custom-pagination"></div>
    </Swiper>

    <div className={styles.text_slider}>
    <div className={styles.text_in}>
    <h2 className={styles.gradual_appear}>ПИВО</h2>
    {/* <div className={styles.space}></div> */}
    <div className={styles.first_screen_par}>
    <p>
            Пиво классическое. Сварено по рецептам 1849 года только с использованием натуральных высококачественных ингредиентов
          </p>
          <a href="#maps" className={styles.button_slider}>
          <DelayedButton to='' delay={1} className={styles.button_slider} style={themeButton}>ГДЕ ПОПРОБОВАТЬ?</DelayedButton>
          </a>
    </div>
          
</div>
    </div>
    </div>
  )
}

export default FirstScreenSlider