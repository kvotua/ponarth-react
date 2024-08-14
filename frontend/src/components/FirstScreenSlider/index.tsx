import styles from './FirstScreenSlider.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useContext, useState, useEffect } from "react";
import './swiper.css';
import './swiperNavigation.css';
import './swiperPagination.css';
import { Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import pivoImg from '../../assets/bottle1-01.svg';
import pivoImg2 from '../../assets/bottle2-01.svg';
import pivoImg3 from '../../assets/bottle3-01.svg';
import DelayedButton from '../Buttons/DelayedButton';
import { ThemeContext } from "../RightBar";
import { Swiper as SwiperType } from 'swiper/types';
const FirstScreenSlider = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper : SwiperType) => {
    setActiveIndex(swiper.realIndex);
  };
  useEffect(() => {
    if (swiperInstance) {
      const bullets = document.querySelectorAll<HTMLDivElement>('.swiper-pagination-bullet-first');
      bullets.forEach((bullet, index) => {
        bullet.style.transform = index === activeIndex ? 'scale(1.2)' : 'scale(1)';
      });
    }
  }, [activeIndex, swiperInstance]);
  const { theme } = useContext(ThemeContext);
  const themeButton = theme === "dark" ? "white" : "mixed";
  return (
    <div className={styles.first_container} content='f' id='sorta'>
        <Swiper
     effect={'coverflow'}
     onSlideChange={handleSlideChange}
     onSwiper={setSwiperInstance}
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
      modifierClass:'swiper-pagination-first',
      dynamicBullets: true,
    
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
 <SwiperSlide className={`${styles.default} ${styles.swiper_slide} `} content='f'><img src={pivoImg3} alt="" /></SwiperSlide>
 <SwiperSlide className={` ${styles.default} ${styles.swiper_slide} `} content='f'><img src={pivoImg} alt="" /></SwiperSlide>
 <SwiperSlide className={`${styles.default} ${styles.swiper_slide} `} content='f'><img src={pivoImg3} alt="" /></SwiperSlide>
 <SwiperSlide className={` ${styles.default} ${styles.swiper_slide} `} content='f'><img src={pivoImg} alt="" /></SwiperSlide>
 
 <div className="custom-pagination"

 >   {[...Array(4)].map((_, index) => (
  <div
    key={index}
    className={`swiper-pagination-bullet-first ${activeIndex === index ? 'swiper-pagination-bullet-active-first' : ''}`}
  />
))}
 </div>
    </Swiper>
    <div className={styles.text_slider}>
    <div className={styles.text_in}>
    <h2 className={styles.gradual_appear}>ПИВО</h2>
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