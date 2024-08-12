import ContentHistory from "../componentsHistory/ContentHistory";

// import HeaderHistory from "../components/HeaderHistory/HeaderHistory";
import styles from "./styles/historypage.module.scss";
import Footer from "../components/Footer";

const HistoryPage = () => {
  return (
    <div className={styles.historyPage}>
      {/* <HeaderHistory /> */}
      <div className={styles.pageContent}>
        <ContentHistory />
      </div>
      <Footer />
    </div>
  );
};

export default HistoryPage;
