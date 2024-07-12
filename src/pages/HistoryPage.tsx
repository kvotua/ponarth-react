import BeforeAfter from '../components/BeforeAfter';
import HeaderHistory from '../components/HeaderHistory/HeaderHistory';
import styles from "./styles/historypage.module.scss";

const HistoryPage = () => {
    return (
        <div className={styles.historyPage}>
            <HeaderHistory />
           <div className={styles.pageContent}>
                <BeforeAfter />
            </div>
        </div>
    );
};

export default HistoryPage;
