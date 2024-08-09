import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import pivovar from './img/hova.png';
import kovar from './img/ilya.png';
import novar from './img/Leha.png';
import dovar from './img/Eji.png';

import 'swiper/css';
import 'swiper/css/effect-cards';

import stylesV from './Vaksnsii.module.scss';
import styles from './styles.module.css';

import { EffectCards } from 'swiper/modules';
import DelayedButton from '../Buttons/DelayedButton';
import InputMask from 'react-input-mask';

const cars = [
  {
    id: 1,
    title: 'Бригадир смены',
    opisanie: 'Контроль производственных процессов, управление командой на линии.',
    image: pivovar,
  },
  {
    id: 2,
    title: 'Оператор оборудования',
    opisanie: 'Настройка и обслуживание пивоваренного оборудования.',
    image: kovar,
  },
  {
    id: 3,
    title: 'Технолог пивоварения',
    opisanie: 'Разработка рецептур, контроль качества готовой продукции.',
    image: novar,
  },
  {
    id: 4,
    title: 'Лаборант-микробиолог:',
    opisanie: 'Проведение анализа сырья и готового пива.',
    image: dovar,
  },
];

const SliderVakansii: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className={stylesV.app}>
      <div className={stylesV.swiper_container}>
        <Swiper
          effect="cards"
          grabCursor={true}
          modules={[EffectCards]}
          className={styles.swiper}
          onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        >
          {cars.map((car) => (
            <SwiperSlide key={car.id} className={styles.swiper_slide}>
              <img src={car.image} alt={car.title} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={stylesV.text_container}>
      <h1>{cars[currentIndex].title}</h1>
      <p>{cars[currentIndex].opisanie}</p>
        <form id="stat_partner" className={stylesV.stat_partner}>
        
          <div className={stylesV.form_group}>
            <input
              className={stylesV.input}
              type="text"
              id="userName"
              name="userName"
              placeholder=" "
              required
              autoComplete="off"
            />
            <label htmlFor="userName">Ваше имя</label>
          </div>

          <div className={stylesV.form_group}>
            <InputMask
              className={stylesV.input}
              name="phoneNumber"
              mask="+7 ( 999 ) 999 - 9999"
              id="phoneNumber"
              placeholder=" "
              required
              autoComplete="off"
            />
            <label htmlFor="phoneNumber">Ваш номер телефона</label>
          </div>
          
          <DelayedButton
            type="submit"
            to=""
            className={stylesV.learn_more}
            style="mixed"
            delay={450}
            dopstyle={{margin:'0 auto', alignContent:'center', marginTop:  '32px', width: '100%' }}
          >
            СТАТЬ ПАРТНЕРОМ
          </DelayedButton>
        </form>
      </div>
    </div>
  );
}

export default SliderVakansii;
