import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "./styles/mainpage.module.css";

const MainPage = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Footer/>
      {/* Сюда добавляем компоненты главноей страницы */}
    </div>
  );
};

export default MainPage;
