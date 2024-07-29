import { useContext } from "react";
import styles from "./NewHistory.module.scss";
import { ThemeContext } from "../RightBar";
import DelayedButton from "../Buttons/DelayedButton";

function NewHistory() {
  const { theme } = useContext(ThemeContext);
  const themeButton = theme === "dark" ? "white" : "mixed";
  return (
    <div className={styles.setDirection}>
      <div className={styles.texter}>
        <h2 className={styles.text}>
          СТАНЬ ЧАСТЬЮ <br />
          НОВОЙ ИСТОРИИ
        </h2>
      </div>

      <div className={styles.mark}>
        <div className={styles.buy_action}>
        </div>
      </div>
      <DelayedButton to="/share" delay={750} className={styles.history_a} style={themeButton} dopstyle={{ marginTop: "32px", borderTop: "white"}}>
            КУПИТЬ АКЦИЮ
      </DelayedButton>
    </div>
  );
}

export default NewHistory;
