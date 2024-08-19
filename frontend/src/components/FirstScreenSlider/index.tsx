import { useContext, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import { Swiper as SwiperType } from "swiper/types";
import styles from "./FirstScreenSlider.module.css";
import DelayedButton from "../Buttons/DelayedButton";
import { ThemeContext } from "../RightBar";
import { getProducts, Products } from "../../api/products"; // Import the getProducts function
import "swiper/css";
import "swiper/css/effect-coverflow";
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import img1 from "../../assets/Pivo2.png";
import img2 from "../../assets/Pivo3.png";
import img3 from "../../assets/photo_2024-08-18_13-44-12.jpg";
import img4 from "../../assets/photo_2024-08-18_13-44-13.jpg";
import img5 from "../../assets/bottle1-01.svg";
import img6 from "../../assets/bottle2-01.svg";
import img7 from "../../assets/bottle3-01.svg";

const FirstScreenSlider = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  // const [activeIndex, setActiveIndex] = useState(0);
  // const [products, setProducts] = useState<Products[]>([]); // State to store products
  const [currentProduct, setCurrentProduct] = useState<Products | null>(null); // State to store current product
  const [stretch, setStretch] = useState<number>(190);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        // setProducts(productsData);
        setCurrentProduct(productsData[0]); // Set the first product as the current product initially
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);


  const { theme } = useContext(ThemeContext);
  const themeButton = theme === "dark" ? "white" : "mixed";

  // const getImageSrc = (image: string, fileName: string) => {
  //   const extension = fileName.split(".").pop()?.toLowerCase();
  //   switch (extension) {
  //     case "svg":
  //       return `data:image/svg+xml;base64,${image}`;
  //     case "png":
  //       return `data:image/png;base64,${image}`;
  //     case "jpeg":
  //     case "jpg":
  //       return `data:image/jpeg;base64,${image}`;
  //     default:
  //       return "";
  //   }
  // };

  const images: { id: string; src: string }[] = [
    { id: 'img1', src: img1 },
    { id: 'img2', src: img2 },
    { id: 'img3', src: img3 },
    { id: 'img4', src: img4 },
    { id: 'img5', src: img5 },
    { id: 'img6', src: img6 },
    { id: 'img7', src: img7 },
];
  const [visibleSlides, setVisibleSlides] = useState<string[]>([]); 

  const handleSlideChange = (swiper: SwiperType) => {
    const visible = swiper.slides.filter((slide: HTMLElement) => 
        slide.classList.contains('swiper-slide-visible')
    );
    setVisibleSlides(visible.map((slide) => slide.querySelector('img')?.getAttribute('data-id') || ''));
};
const [isSafari, setIsSafari] = useState(false);

useEffect(() => {
  if (
    navigator.userAgent.indexOf("Safari") != -1 &&
    navigator.userAgent.indexOf("Chrome") == -1
  ) {
    setIsSafari(true);
  }
}, []);
const WindowWidth =()=>{
  const width= window.innerWidth;
  console.log("Current window width: ", width, " Curr stretch: ", stretch);
  if(isSafari){
    if(width > 1200 && stretch !== 190){
      setStretch(190);
    }else if(width <= 1200 && stretch !== 90){
      setStretch(10);
    }
  }else{
    if(width > 1200 && stretch !== 190){
      setStretch(190);
    }else if(width <= 1200 && stretch !== 90){
      setStretch(90);
    }
  }

}

useEffect(() => {
  WindowWidth(); 
  window.addEventListener('resize', WindowWidth);
  return () => {
    window.removeEventListener('resize', WindowWidth);
  };
}, []);

useEffect(() => {
  if (swiperInstance) {
    swiperInstance.update();
    console.log("stretch:   " + stretch);
    console.log(swiperInstance);
  }
}, [stretch, swiperInstance]);

  return (
    <div className={styles.first_container} content="f" id="sorta">
      <div className={styles.sliders}>
      <Swiper
        key={stretch}
        onSwiper={setSwiperInstance} 
        effect={'coverflow'}
        loop={true}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
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
        navigation
        mousewheel 
        modules={[EffectCoverflow, Pagination, Navigation]}
        className={styles.mySwiperBottle}
        onSlideChange={handleSlideChange}
      >
      {images.map((image) => {
        const isVisible = visibleSlides.includes(image.id); 
        
        return (
          <SwiperSlide key={image.id} style={{ opacity: isVisible ? 1 : 0, }} className={styles.slide}>
              <img src={image.src} className={styles.img_slide} data-id={image.id} />
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
