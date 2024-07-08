import Header from "../components/Header";
import Map from "../components/Map";
import NewHistory from "../components/NewHistory";
import Partnership from "../components/Partnership/Partnership";
import RightBar from "../components/RightBar";
import Form from '../components/Form/Form';
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
        <Form />
      </div>
      <RightBar />
    </div>
  );
};

export default MainPage;
