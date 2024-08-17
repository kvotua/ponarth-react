// components/Loader.tsx
import React from 'react';
import styles from './Loader.module.css'; // Импортируйте ваши стили
import Lottie from 'react-lottie-player';
import animationData from '../../assets/beerPreloader.json'

const Loader: React.FC= () => {
  return (
    <div className={styles.loader}>
        <Lottie
          loop
          animationData={animationData}
          play
          className={styles.lottie}
          style={{ width: '300px', height: '300px'}}
        />
    </div>
  );
};

export default Loader;
