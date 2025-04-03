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
import { Autoplay } from "swiper/modules";



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
  const [isVisibleProduct, setIsVisibleProduct] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const [showPdf, setShowPdf] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    setIsSafari(userAgent.includes("Safari") && !userAgent.includes("Chrome"));
  
    const handleResize = () => {
      WindowWidth();
    };
  
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); 

  useEffect(() => {
    setIsVisibleProduct(true);
  }, [currentProduct]);

  const adjustImagesArray = (images: Products[]): Products[] => {
    const length = images.length;
  
    if (length === 0) {
      console.warn("Warning: Images array is empty.");
      return [];
    }
  
    const imgasf: Products[] = [...images]; // Начинаем с оригинального массива
  
    for (let i = 0; i < Math.max(0, 4 - length); i++) {
      imgasf.push({
        id: images[0].id + (i + 1) * 10,
        src: images[0].image,
        name: images[0].name,
        description: images[0].description,
        image: images[0].image,
        color: "",
        fileName: images[0].fileName,
      });
    }
  
    return imgasf;
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
    const width = window.innerWidth;
    let visible;

    if (isSafari) {
      visible = width > 1000
        ? swiper.slides.filter((slide: HTMLElement) => slide.classList.contains("swiper-slide-visible"))
        : swiper.slides.filter((slide: HTMLElement) => slide.classList.contains("swiper-slide-fully-visible"));
    } else {
      visible = swiper.slides.filter((slide: HTMLElement) => slide.classList.contains("swiper-slide-visible"));
    }

    const visibleIds = visible.map(slide => slide.querySelector("img")?.getAttribute("data-id") || "");
    const activeIndex = swiper.realIndex;

    // Обновляем состояния
    setVisibleSlides(visibleIds);
    setCurrentProduct(productsData[activeIndex]);
    setProductsData(images);
    setIsVisibleProduct(true); // Устанавливаем видимость сразу
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

console.log(currentProduct?.description.split(";")[4])

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
          autoplay={{
            delay: 3000, // Задержка между прокрутками в миллисекундах
            disableOnInteraction: false, // Не отключать автопрокрутку при взаимодействии
          }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className={styles.mySwiperBottle}
          onSlideChange={handleSlideChange}
        >
          {images.map((image) => {
            const isVisible = visibleSlides.includes(image.id.toString());
            return (
              <SwiperSlide
                key={image.id}
                style={isVisible? {filter: isVisible? 'opacity(100%)' : 'opacity(0)', opacity: '1' , willChange: 'filter'}: {filter: isVisible? 'opacity(100%)' : 'opacity(0)', opacity: '0' , willChange: 'filter'}}
                className={styles.slide}
              >
                <img
                  src={getImageSrc(image.image, image.fileName)}
                  loading="lazy"
                  decoding="async"
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
          <h2 className={`${styles.gradual_appear} ${isVisibleProduct ? styles.fade_in : ""}`}>
            {currentProduct?.name}
          </h2>
          <div className={`${styles.first_screen_par} ${isVisibleProduct ? styles.fade_in : ""}`}>
            <p>
              <p>{isSafari}</p>
              {currentProduct?.description.split(";")[4]} 
            </p>
              <DelayedButton
                to="/journal"
                delay={1}
                className={`${styles.button_slider} ${isVisibleProduct ? styles.appear_button : ""}`}
                style={themeButton}
                onClick={() => setShowPdf(true)}
              >
                УЗНАТЬ БОЛЬШЕ
              </DelayedButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstScreenSlider;
