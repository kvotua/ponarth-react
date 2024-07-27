import React, { useState } from 'react';
import Flickity from 'react-flickity-component';
import styles from './Vaksnsii.module.scss';
import stylesF from './flickity.module.css';

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
  
    return (
      <div className={styles.app}>
        <h1 className={styles.Govno}>МЫ В ПОИСКЕ<br /> СОТРУДНИКОВ</h1>
  
        <div className={styles.wrapper}>
          <div className={styles.swiper_container}>
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
                <div key={car.id} className={styles.plate}>
                  <div
                    style={{
                      backgroundImage: `url(${car.image})`,
                      width: '100%',
                      height: 400,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  ></div>
                </div>
              ))}
            </Flickity>
          </div>
          <div className={styles.text_container}>
            <h1>{cars[currentIndex].title}</h1>
            <p>{cars[currentIndex].opisanie}</p>
            <form action="">
              <input type="text" />
              <input type="text" />
              <button>отправить</button>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default Vakansii;
  