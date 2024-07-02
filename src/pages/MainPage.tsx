import Header from "../components/Header";
import styles from "./styles/mainpage.module.css";
import Partnership from "../components/Partnership/Partnership";
const MainPage = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
    <Partnership />
    </div>
  );
};

export default MainPage;
