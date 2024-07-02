import Header from "../components/Header";
import Map from "../components/Map";
import styles from "./styles/mainpage.module.css";

const MainPage = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Map />
    </div>
  );
};

export default MainPage;
