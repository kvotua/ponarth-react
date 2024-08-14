import { useEffect, useState, useContext } from "react";
import styles from "./FirstScreenSlider.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "./swiper.css";
import "./swiperNavigation.css";
import "./swiperPagination.css";
import { Pagination, Navigation, EffectCoverflow } from "swiper/modules";

import DelayedButton from "../Buttons/DelayedButton";
import { ThemeContext } from "../RightBar";
import { getProducts } from "../../api/products"; // Import the getProducts function

interface Product {
  id: number;
  name: string;
  description: string;
  color: string;
  image: string;
  base64Image: string;
}

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

  const [products, setProducts] = useState<Product[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        const productsWithDecodedImages = data.map((product) => ({
          ...product,
          base64Image: `data:image/jpeg;base64,${product.image}`,
        }));
        setProducts(productsWithDecodedImages);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className={styles.first_container} content="f" id="sorta">
      <Swiper
        effect={"coverflow"}
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
          scale: 1,
        }}
        breakpoints={{
          769: {
            slidesPerView: 3,
            coverflowEffect: {
              rotate: 0,
              stretch: 0,
              depth: 250,
              modifier: 1,
              slideShadows: false,
            },
          },
          600: {
            slidesPerView: 1,
            coverflowEffect: {
              rotate: 0,
              stretch: 420,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            },

          },
          500: {
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
          el: ".custom-pagination",
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active-first",
          bulletClass: "swiper-pagination-bullet-first",
          modifierClass: "swiper-pagination-first",
        }}
        navigation={true}
        modules={[Pagination, Navigation, EffectCoverflow]}
        className={styles.swiper}
        content="f"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {products.map((product) => (
          <SwiperSlide
            key={product.id}
            className={` ${styles.default} ${styles.swiper_slide} `}
            content="f"
          >
            <img src={product.base64Image} alt={product.name} />
          </SwiperSlide>
        ))}
        <div className="custom-pagination"></div>
      </Swiper>

      <div className={styles.text_slider}>
        <div className={styles.text_in}>
          {products.length > 0 && activeIndex < products.length && (
            <>
              <h2 className={styles.gradual_appear}>
                {products[activeIndex].name}
              </h2>
              <p>{products[activeIndex].description}</p>
            </>
          )}
          <a href="#maps">
            <DelayedButton
              to=""
              delay={1}
              className={styles.button_slider}
              style={themeButton}
            >
              ГДЕ ПОПРОБОВАТЬ?
            </DelayedButton>

          </a>
        </div>
      </div>
    </div>
  );
};

export default FirstScreenSlider;
