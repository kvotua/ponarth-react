import React, { useState, useEffect } from 'react';
import Flickity from 'react-flickity-component';
import stylesV from './Vaksnsii.module.scss';
import stylesF from './flickity.module.css';
import DelayedButton from '../Buttons/DelayedButton';
import InputMask from 'react-input-mask';

import pivovar from './img/hova.png';
import narkovar from './img/ilya.png';
import govnovar from './img/Leha.png';
import dildovar from './img/Eji.png';
import jopavar from './img/image copy 4.png';

const flickityOptions = {
  initialIndex: 2,
  prevNextButtons: false,
  pageDots: false,
  adaptiveHeight: true,
};

const cars = [
  {
    id: 1,
    title: 'Юрий Хованский',
    opisanie: 'Водка — самый безвредный из алкогольных напитков. Если пьёшь водку — доживёшь до ста лет.',
    image: pivovar,
  },
  {
    id: 2,
    title: 'Илья Меддисон',
    opisanie: 'Цветы оставьте для покойников, а женщинам подарите член.',
    image: narkovar,
  },
  {
    id: 3,
    title: 'Алексей Шевцов',
    opisanie: 'Убивает в человеке жизнь лишь две вещи — сигареты и семья',
    image: govnovar,
  },
  {
    id: 4,
    title: 'Ежи Сармат',
    opisanie: 'Сторонники расовой сегрегации так часто практиковали инцест, что все намёки на это перестали восприниматься как шутка.',
    image: dildovar,
  },
  {
    id: 5,
    title: 'Пивовар',
    opisanie: 'Варим пивко ёпт',
    image: jopavar,
  },
];

const Vakansii = () => {
  const [currentIndex, setCurrentIndex] = useState(flickityOptions.initialIndex);

  const handleChange = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const flkty = document.querySelector('.flickity-viewport .flickity-slider');
    if (flkty) {
      flkty.addEventListener('change', (index: number) => handleChange(index));
    }
  }, []);

  return (
    <div className={stylesV.app}>
      <div className={stylesV.wrapper}>
        <div className={stylesV.swiper_container}>
          <Flickity
           className={stylesF.slider}
            elementType="div"
            disableImagesLoaded={false}
            options={flickityOptions}
            static
            flickityRef={(c) => {
              c && c.on('change', (index: number) => handleChange(index));
            }}
          >
            {cars.map((car, index) => (
              <div
                key={car.id}
                className={`${stylesV.plate} ${index === currentIndex ? stylesV.active : ''}`}
              >
                <div
                  style={{
                    backgroundImage: `url(${car.image})`,
                    width: '100%',
                    height: 400,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: index === currentIndex ? 'scale(1.2)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <img src="" alt="" />
                </div>
              </div>
            ))}
          </Flickity>
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
              dopstyle={{ marginTop: '32px', width: '100%' }}
            >
              СТАТЬ ПАРТНЕРОМ
            </DelayedButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Vakansii;
