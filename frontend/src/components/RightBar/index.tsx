import { createContext, FC, useContext } from "react";
import styles from "./RightBar.module.scss";

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

const RightBar: FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`${styles.right_menu} ${theme === "dark" ? styles.dark : ""}`}
    >
      <div className={styles.container_menu}>
        <input
          id="themeToggle"
          type="checkbox"
          role="switch"
          className={styles.toggle}
          checked={theme === "dark" ? true : false}
          onClick={toggleTheme}
        />
        <button
          className={`${styles.expand_less} ${
            theme === "dark" ? styles.dark : ""
          }`}
          onClick={scrollToTop}
        ></button>
      </div>
    </div>
  );
};

export default RightBar;
