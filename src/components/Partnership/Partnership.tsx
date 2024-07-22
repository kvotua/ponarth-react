import { useState, useEffect, useRef } from "react";
import styles from "./partnership.module.css";

const Partnership = () => {
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible3, setIsVisible3] = useState(false);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  useEffect(() => {
    const observer1 = new IntersectionObserver(
      ([entry]) => {
        setIsVisible1(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    const observer2 = new IntersectionObserver(
      ([entry]) => {
        setIsVisible2(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    const observer3 = new IntersectionObserver(
      ([entry]) => {
        setIsVisible3(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (ref1.current) {
      observer1.observe(ref1.current);
    }

    if (ref2.current) {
      observer2.observe(ref2.current);
    }

    if (ref3.current) {
      observer3.observe(ref3.current);
    }

    return () => {
      if (ref1.current) {
        observer1.unobserve(ref1.current);
      }

      if (ref2.current) {
        observer2.unobserve(ref2.current);
      }

      if (ref3.current) {
        observer3.unobserve(ref3.current);
      }
    };
  }, []);

  return (
    <>
      <div className={styles.texter} id="partner">
        <h2 className={styles.text}>
          ПОНАРТ <br />
          ДЛЯ ПАРТНЕРОВ
        </h2>
      </div>
      <div className={styles.grid_container}>
        <div className={styles.grid_item_left}>
          <div className={styles.txt_four_page} ref={ref1}>
            <h1
              className={`${styles.big_text_four_page} ${
                isVisible1 ? styles.fadeIn : ""
              }`}
            >
              01
            </h1>
            <p>
              Только натуральное сырье и<br />
              качественный продукт
            </p>
          </div>
        </div>
        <div className={styles.grid_item_right}>
          <div className={styles.kartinka1}>
            <img
              className={styles.img_four_end}
              src="./src\assets\Image.png"
              alt=""
            />
          </div>
        </div>

        <div className={styles.grid_item_left}>
          <div className={styles.kartinka1}>
            <img
              className={styles.img_four_end}
              src="./src\assets\Pivo2.png"
              alt=""
            />
          </div>
        </div>

        <div className={styles.grid_item_right}>
          <div className={styles.txt_four} ref={ref2}>
            <h1
              className={`${styles.big_text_four_right} ${
                isVisible2 ? styles.fadeIn : ""
              }`}
            >
              02
            </h1>
            <p className={styles.text_four_right}>
              Всесторонняя поддержка <br />
              партнеров
            </p>
          </div>
        </div>

        <div className={styles.grid_item_left}>
          <div className={styles.txt_four_page} ref={ref3}>
            <h1
              className={`${styles.big_text_four_page} ${
                isVisible3 ? styles.fadeIn : ""
              }`}
            >
              03
            </h1>{" "}
            <p>
              14 лет варим вкусное пиво по <br />
              технологиям 19го века
            </p>
          </div>
        </div>

        <div className={styles.grid_item_right}>
          <div className={styles.kartinka1}>
            <img
              className={styles.img_four_end}
              src="./src\assets\Pivo3.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Partnership;
