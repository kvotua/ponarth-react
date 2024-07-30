import React, { useState, useEffect } from 'react';
import Flickity from 'react-flickity-component';
import stylesV from './Vaksnsii.module.scss';
import stylesF from './flickity.module.css';
import styles from '../Form/Form.module.css';
import DelayedButton from '../Buttons/DelayedButton';
import InputMask from 'react-input-mask';

import pivovar from './img/image.png';
import narkovar from './img/image copy.png';
import govnovar from './img/image copy 2.png';
import dildovar from './img/image copy 3.png';
import jopavar from './img/image copy 4.png';

const flickityOptions = {
  initialIndex: 2,
};

const cars = [
  {
    id: 1,
    title: 'Пивовар',
    opisanie: 'asdas asdasd asdasd asdasd asdasad',
    image: pivovar,
  },
  {
    id: 2,
    title: 'Нарковар',
    opisanie: 'fdfdf fdfdf dfdfdf dfdf ddfdf',
    image: narkovar,
  },
  {
    id: 3,
    title: 'Говновар',
    opisanie: 'ghghgh ghghgh ghghgh ghghg',
    image: govnovar,
  },
  {
    id: 4,
    title: 'Дилдовар',
    opisanie: 'eded eded eded eded',
    image: dildovar,
  },
  {
    id: 5,
    title: 'Жоповар',
    opisanie: 'yhyh yhyh yhyh yhyh',
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
                    transform: index === currentIndex ? 'scale(1.5)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}
                ></div>
              </div>
            ))}
          </Flickity>
        </div>
        <div className={stylesV.text_container}>
          <h1>{cars[currentIndex].title}</h1>
          <p>{cars[currentIndex].opisanie}</p>
          <form id="stat_partner" className={styles.stat_partner}>
            <div className={styles.form_group}>
              <input
                className={styles.input}
                type="text"
                id="userName"
                name="userName"
                placeholder=" "
                required
                autoComplete="off"
              />
              <label htmlFor="userName">Ваше имя</label>
            </div>

            <div className={styles.form_group}>
              <InputMask
                className={styles.input}
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
              className={styles.learn_more}
              style="black"
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
  