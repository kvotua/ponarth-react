import { FC, useState, useEffect } from "react";
import { Position, Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import { Link } from "react-router-dom";
import styles from "./styles/historypage.module.scss";

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import journal from "../assets/journal.pdf";

const Journal: FC = () => {
    const localTheme = window.localStorage.getItem("theme");
    const [theme, setTheme] = useState(localTheme ? localTheme : "light");
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      };

      useEffect(() => {
        // const updateFlexHeight = () => {
        //   const doubleScreenHeight = window.innerHeight;
        //   document.documentElement.style.setProperty(
        //     "--flexing-screen-height",
        //     `${doubleScreenHeight}px`
        //   );
        // };
        // updateFlexHeight();
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
    return(
    <>
    {/* TODO on pc top and left 50 on Mobile 24 аналогично и с bottom right */}
    <div style={{position: "absolute", top: "24px", left: "24px", zIndex: '1000'}}>
    <Link to='/home' className={styles.button_back_link}>
    <button  className={`${styles.button_back} ${
                    theme === "dark" ? styles.dark : ""
                }`}></button>
    </Link>
    </div>
        <Worker style={{Position: "relative", zIndex: '-1'}} workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer fileUrl={journal} />;
        </Worker>
         <div style={{position: "absolute", bottom: "54px", right: "54px", zIndex: '1000', opacity: !isVisible ? "0" : "1",transition: "all .2s ease-in",}}>
        <button  className={`${styles.button_back} ${
                    theme === "dark" ? styles.dark : ""
                }`} style={{ backgroundImage: "url(../assets/expand_less.svg) !important", transform: "rotate(0deg)"}} onClick={scrollToTop}>
        </button>
    </div>
    </>
);
};

export default Journal;