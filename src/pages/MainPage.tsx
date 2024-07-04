import Header from "../components/Header";
import Map from "../components/Map";
import NewHistory from "../components/NewHistory";
import Partnership from "../components/Partnership/Partnership";
import RightBar from "../components/RightBar";
import styles from "./styles/mainpage.module.css";
const MainPage = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>
        {/* Сюда кладем компоненты */}
        <NewHistory />
        <Map />
        <Partnership />
      </div>
      <RightBar />
    </div>
  );
};

export default MainPage;
