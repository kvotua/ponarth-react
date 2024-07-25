import VKPosts from "./VkPost";
import styles from "./NewsProduction.module.css";

function NewsProduction() {
  const groupId = "ponarth"; // Замените на реальный ID группы
  const accessToken =
    "386e0c85386e0c85386e0c85fe3b77fa743386e386e0c855ef1e75df3dabd817dbb743c"; // Замените на реальный сервисный ключ доступа

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
