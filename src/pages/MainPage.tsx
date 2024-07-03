import Header from "../components/Header";
import NewHistory from "../components/NewHistory";
import styles from "./styles/mainpage.module.css";

const MainPage = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <NewHistory />
      {/* Сюда добавляем компоненты главноей страницы */}

    </div>
  );
};

export default MainPage;