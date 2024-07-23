import VKPosts from "./VkPost";
import styles from "./NewsProduction.module.css";

function NewsProduction() {
  const groupId = "ponarth"; // Замените на реальный ID группы
  const accessToken =
    "02124e4202124e4202124e4271010b1ed20021202124e4264830a231c9cda8a7390d524"; // Замените на реальный сервисный ключ доступа

  return (
    <div className={styles.seven_page} id="news">
      <div className={styles.content_seven_page}>
        <h2 className={styles.texter_seven}>
          НОВОСТИ <br />
          ПРОИЗВОДСТВА
        </h2>
      </div>
      <VKPosts groupId={groupId} accessToken={accessToken} />
    </div>
  );
}

export default NewsProduction;
