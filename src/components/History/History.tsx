import React, { useEffect } from 'react';
import styles from './history.module.css';
import DelayenButton from '../Buttons/DelayedButton'
function History() {
  const text = 'Крупнейшей пивоваренной компанией в довоенной Восточной Пруссии был Кенигсбергский завод "Понарт", основанный Иоганном Филиппом Шиффердеккером 15 ноября 1839 года. Сейчас "Понарт" - это локальное акционерное общество по производству пива, в развитии которого может участвовать каждый желающий';
  const words = text.split(' ');
  const spannedText = words.map((word, index) => (
    <span key={index} className={styles.hoverable}>
      {word}{' '}
    </span>
  ));
  useEffect(() => {
    const updateHeight = () => {
      const doubleScreenHeight = window.innerHeight * 2;
      document.documentElement.style.setProperty('--double-screen-height', `${doubleScreenHeight}px`);
    };

    // Устанавливаем начальное значение высоты
    updateHeight();

    // Обновляем значение при изменении размера окна
    window.addEventListener('resize', updateHeight);

    // Убираем слушатель при размонтировании компонента
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);
  return (
    <div className={styles.container_two_page}>
      <div className={styles.two_page} id="history">
        <div className={styles.block_image }>
          <h1 className={styles.text_two_page}>
            УЗНАЙТЕ МНОГОВЕКОВУЮ ИСТОРИЮ ПИВОВАРНИЯ С 1839 ГОДА
          </h1>
          <div className={styles.secondBlock}>
          <h2 className={styles.litle_text_two} id="litle_text_two">
            {spannedText}
          </h2>
          <div className={styles.history_a}>
            <DelayenButton to="/history" className={styles.history_a} delay={450}>
          УЗНАТЬ БОЛЬШЕ
          </DelayenButton>
            </div>
          </div>
          

          
        </div>
      </div>
    </div>
  );
}

export default History;
