import { useContext, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import { Swiper as SwiperType } from "swiper/types";
import styles from "./FirstScreenSlider.module.css";
import "./swiper.css";
import "./swiperNavigation.css";
import "./swiperPagination.css";
import DelayedButton from "../Buttons/DelayedButton";
import { ThemeContext } from "../RightBar";
import { getProducts, Products } from "../../api/products"; // Import the getProducts function

const FirstScreenSlider = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [products, setProducts] = useState<Products[]>([]); // State to store products
  const [currentProduct, setCurrentProduct] = useState<Products | null>(null); // State to store current product

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        setCurrentProduct(productsData[0]); // Set the first product as the current product initially
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
    setCurrentProduct(products[swiper.realIndex]); // Update current product based on active slide
  };

  useEffect(() => {
    if (swiperInstance) {
      const bullets = document.querySelectorAll<HTMLDivElement>(
        ".swiper-pagination-bullet-first"
      );
      bullets.forEach((bullet, index) => {
        bullet.style.transform =
          index === activeIndex ? "scale(1.2)" : "scale(1)";
      });
    }
  }, [activeIndex, swiperInstance]);

  const { theme } = useContext(ThemeContext);
  const themeButton = theme === "dark" ? "white" : "mixed";

  const getImageSrc = (image: string, fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "svg":
        return `data:image/svg+xml;base64,${image}`;
      case "png":
        return `data:image/png;base64,${image}`;
      case "jpeg":
      case "jpg":
        return `data:image/jpeg;base64,${image}`;
      default:
        return "";
    }
  };

  return (
    <div className={styles.first_container} content="f" id="sorta">
      <Swiper
        effect={"coverflow"}
        onSlideChange={handleSlideChange}
        onSwiper={setSwiperInstance}
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
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, EffectCoverflow]}
        className={styles.swiper}
        content="f"
      >
        {products.map((product) => (
          <SwiperSlide
            key={product.id}
            className={`${styles.default} ${styles.swiper_slide}`}
            content="f"
          >
            <img
              src={getImageSrc(product.image, product.fileName)}
              alt={product.name}
            />
          </SwiperSlide>
        ))}
        <div className="custom-pagination">
          {[...Array(products.length)].map((_, index) => (
            <div
              key={index}
              className={`swiper-pagination-bullet-first ${
                activeIndex === index
                  ? "swiper-pagination-bullet-active-first"
                  : ""
              }`}
            />
          ))}
        </div>
      </Swiper>
      <div className={styles.text_slider}>
        <div className={styles.text_in}>
          <h2 className={styles.gradual_appear}>
            {currentProduct?.name || "ПИВО"}
          </h2>
          <div className={styles.first_screen_par}>
            <p>
              {currentProduct?.description ||
                "Пиво классическое. Сварено по рецептам 1849 года только с использованием натуральных высококачественных ингредиентов"}
            </p>
            <a href="#maps" className={styles.button_slider}>
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
    </div>
  );
};

export default FirstScreenSlider;
