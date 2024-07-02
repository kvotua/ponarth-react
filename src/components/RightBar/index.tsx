import useLocalStorage from 'use-local-storage';
import styles from './RightBar.module.scss';

function RightBar() {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    return (
        <div className={styles.right_menu}>
            <div className={styles.container_menu}>
                <input id="themeToggle" type="checkbox" role="switch" className={styles.toggle} />
                {/* <script src="components/right menu/RightMenu.js"></script> */}
                <button className={styles.expand_less} onClick={() => scrollToTop()}></button>
            </div>
        </div>
    )
}

export default RightBar
