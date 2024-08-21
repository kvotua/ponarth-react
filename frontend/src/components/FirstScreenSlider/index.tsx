import { useContext, useState, useEffect, useRef, FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import { Swiper as SwiperType } from "swiper/types";
import styles from "./FirstScreenSlider.module.css";
import DelayedButton from "../Buttons/DelayedButton";
import { ThemeContext } from "../RightBar";
import {Products } from "../../api/products";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Product{
  id: number;
  name: string;
  description: string;
  color: string;
  image: string;
  fileName: string;
  src: string;
}

interface FisrtSliderProps{
  products: Product[]
}

const FirstScreenSlider: FC<FisrtSliderProps> = ({products}) => {
  const [currentProduct, setCurrentProduct] = useState<Products | null>(null);
  const [stretch, setStretch] = useState<number>(190);
  const [images, setImages] = useState<Products[]>([]);
  const [productsData, setProductsData] = useState<Products[]>([]);
  const [isSafari, setIsSafari] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  useEffect(() => {
    if (
      navigator.userAgent.indexOf("Safari") != -1 &&
      navigator.userAgent.indexOf("Chrome") == -1
    ) {
      setIsSafari(true);
    } else {
      setIsSafari(false);
    }

    WindowWidth();
    window.addEventListener("resize", WindowWidth);
    return () => {
      window.removeEventListener("resize", WindowWidth);
    };
  }, []);

  const adjustImagesArray = (images: Products[]): Products[] => {
    const length = images.length;

    if (length === 0) {
      console.warn("Warning: Images array is empty.");
    } else if (length === 1) {
      const imgasf: Products[] = [
        images[0],
        {
          id: images[0].id + 10,
          src: images[0].image,
          name: images[0].name,
          description: images[0].description,
          image: images[0].image,
          color: "",
          fileName: images[0].fileName,
        },
        {
          id: images[0].id + 20,
          src: images[0].image,
          name: images[0].name,
          description: images[0].description,
          image: images[0].image,
          color: "",
          fileName: images[0].fileName,
        },
        {
          id: images[0].id + 30,
          src: images[0].image,
          name: images[0].name,
          description: images[0].description,
          image: images[0].fileName,
          color: "",
          fileName: images[0].fileName,
        },
      ];
      return imgasf;
    } else if (length === 2) {
      const imgasf: Products[] = [
        images[0],
        images[1],
        {
          id: images[0].id + 20,
          src: images[0].image,
          name: images[0].name,
          description: images[0].description,
          image: images[0].image,
          color: "",
          fileName: images[0].fileName,
        },
        {
          id: images[1].id + 30,
          src: images[1].image,
          name: images[1].name,
          description: images[1].description,
          image: images[1].image,
          color: "",
          fileName: images[1].fileName,
        },
      ];
      return imgasf;
    } else if (length === 3) {
      const imgasf: Products[] = [
        images[0],
        images[1],
        images[2],
        {
          id: images[1].id + 30,
          src: images[1].image,
          name: images[1].name,
          description: images[1].description,
          image: images[1].image,
          color: "",
          fileName: images[1].fileName,
        },
      ];
      return imgasf;
    }

    return images;
  };

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
  const [visibleSlides, setVisibleSlides] = useState<string[]>([]);

  const handleSlideChange = (swiper: SwiperType) => {
    let visible;
    if(isSafari){
      visible = swiper.slides.filter((slide: HTMLElement) =>
        slide.classList.contains("swiper-slide-fully-visible")
      );
    }
    else{
        visible = swiper.slides.filter((slide: HTMLElement) =>
        slide.classList.contains("swiper-slide-visible")
      );
    }

    setVisibleSlides(
      visible.map(
        (slide) => slide.querySelector("img")?.getAttribute("data-id") || ""
      )
    );
    const activeIndex = swiper.realIndex;
    setCurrentProduct(productsData[activeIndex]);
    setProductsData(images);
  };
  const WindowWidth = () => {
    const width = window.innerWidth;
    if (isSafari) {
      if (width > 1200 && stretch !== 190) {
        setStretch(190);
      } else if (width <= 1200 && stretch !== 0) {
        setStretch(0);
      }
    } else {
      if (width > 1200 && stretch !== 190) {
        setStretch(190);
      } else if (width <= 1200 && stretch !== 90) {
        setStretch(90);
      }
    }
  };
  const handleSwiperInit = () => {
    const imagesData: Products[] = products;
    const adjustedImages = adjustImagesArray(imagesData);
    setImages(adjustedImages);
  };
  useEffect(() => {

    if (swiperRef.current) {
      swiperRef.current.setProgress(0)
      swiperRef.current.update(); // Принудительно обновляем Swiper после загрузки
    }
  }, [stretch]);

  return (
    <div className={styles.first_container} content="f" id="sorta">
      <div className={styles.sliders}>
        <Swiper
          key={stretch}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          initialSlide={0}
          onInit={handleSwiperInit}
          effect={"coverflow"}
          loop={true}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          spaceBetween={100}
          coverflowEffect={{
            rotate: 0,
            stretch: stretch,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          mousewheel
          modules={[EffectCoverflow, Pagination, Navigation]}
          className={styles.mySwiperBottle}
          onSlideChange={handleSlideChange}
        >
          {images.map((image) => {
            const isVisible = visibleSlides.includes(image.id.toString());
            return (
              <SwiperSlide
                key={image.id}
                style={{filter: isVisible? 'opacity(100%)' : 'opacity(0)' , willChange: 'opacity' }}
                className={styles.slide}
              >
                <img
                  src={getImageSrc(image.image, image.fileName)}
                  className={styles.img_slide}
                  data-id={image.id}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className={styles.text_slider}>
        <div className={styles.text_in}>
          <h2 className={styles.gradual_appear}>
            {currentProduct?.name || "ПИВО"}
          </h2>
          <div className={styles.first_screen_par}>
            <p>
              <p>{isSafari}</p>
              {currentProduct?.description.split(";")[4] ||
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
