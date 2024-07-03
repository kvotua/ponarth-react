import Header from "../components/Header";
import Map from "../components/Map";
import NewHistory from "../components/NewHistory";
import Partnership from "../components/Partnership/Partnership";
import styles from "./styles/mainpage.module.css";
const MainPage = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>
        {/* Сюда кладем компоненты */}
        <NewHistory />
        <Partnership />
        <Map />
      </div>
    </div>
  );
};

export default MainPage;
