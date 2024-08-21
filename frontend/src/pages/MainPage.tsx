import { FC, useState, useEffect } from "react";
import Header from "../components/Header";
import Map from "../components/Map";
import NewHistory from "../components/NewHistory";
import Partnership from "../components/Partnership/Partnership";
import RightBar from "../components/RightBar";
import styles from "./styles/mainpage.module.css";
import { ThemeContext } from "../components/RightBar";
import Looking from "../components/LookingPage/LookingPage";
import Footer from "../components/Footer";
import History from "../components/History/History";
import FirstScreenSlider from "../components/FirstScreenSlider/";
import NewsProduction from "../components/NewsProduction";
import CalendarComp from "../components/Calendar";
import PartnerForm from "../components/Form";
import RightBarMobile from "../components/RightBarMobile";
import { VacanciesProvider } from "../components/LookingPage/VacanciesContext";
import { getProducts, Products } from "../api/products";
import Loader from "../components/Loader";
const MainPage: FC = () => {
  const localTheme = window.localStorage.getItem("theme");
  const [theme, setTheme] = useState(localTheme ? localTheme : "light");
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts]= useState<Products[]>([]);
  useEffect(() => {
    window.localStorage.setItem("theme", theme);
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    if (theme === "dark") {
      if (screenWidth <= 600) {
        document.body.style.backgroundColor = "black";
      } else {
        document.body.style.backgroundColor = "#121212";
      }
    } else {
      document.body.style.backgroundColor = "#fff";
    }
  }, [theme, screenWidth]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleBurger = () => {
    setIsBurgerOpen((prevIsBurgerOpen) => !prevIsBurgerOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Здесь вы можете заменить URL на ваш реальный API
        const response = await getProducts();
        // Обработка данных, если необходимо
        setLoading(true);
        setProducts(response);
        return response;
      } catch (err) {
        console.error("Ошибка при загрузке данных", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />; // Показать прелоадер, пока данные загружаются
  }

  return (
    <VacanciesProvider>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div
          className={`${styles.box_shadow} ${
            theme === "dark" ? styles.dark : ""
          }`}
        >
          <div
            className={
              styles.wrapper +
              (theme === "dark"
                ? " " + styles.dark + " " + styles.darkWrapper
                : "")
            }
          >
            <div
              className={`${styles.burger} ${
                isBurgerOpen ? styles.burgerClosed : ""
              }`}
              onClick={toggleBurger}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
            <Header isBurgerOpen={isBurgerOpen} />
            <div
              className={styles.content}
              onClick={isBurgerOpen ? toggleBurger : undefined}
            >
              <FirstScreenSlider products={products} />
              <History />
              <CalendarComp />
              <Partnership />
              <PartnerForm />
              <Looking />
              <NewHistory />
              <NewsProduction />
              <Map />
            </div>
            <RightBar />
            <RightBarMobile />
          </div>
          <Footer />
        </div>
      </ThemeContext.Provider>
    </VacanciesProvider>
  );
};

export default MainPage;
