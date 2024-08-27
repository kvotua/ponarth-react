import { useEffect, useState, useContext } from "react";
import styles from "./RightBarMobile.module.scss";
import {ThemeContext} from '../RightBar/index'
const RightBarMobile = () => {
  const { theme } = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState(false);
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      };

      useEffect(() => {
        const updateFlexHeight = () => {
          const doubleScreenHeight = window.innerHeight;
          document.documentElement.style.setProperty(
            "--flexing-screen-height",
            `${doubleScreenHeight}px`
          );
        };
        updateFlexHeight();
        const handleScroll = () => {
          if (window.scrollY > 800) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }

};
    
// Подписываемся на событие прокрутки
window.addEventListener('scroll', handleScroll);

// Очищаем подписку на событие при размонтировании компонента
return () => {
  window.removeEventListener('scroll', handleScroll);
};
}, []);
return (
<div className={styles.container_menu}>
 {isVisible && (
 <button
  className={`${styles.expand_less} ${
    theme === "dark" ? styles.dark : ""
  }`}
  onClick={scrollToTop}
></button>
)}
</div>
)
}

export default RightBarMobile