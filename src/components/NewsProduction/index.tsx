import VKPosts from './VkPost';
import styles from './NewsProduction.module.css';

function NewsProduction() {
  const groupId = 'ponarth'; // Замените на реальный ID группы
  const accessToken = '3d8387673d8387673d838767003e9ac8bf33d833d8387675b16ccd944e94e47e721fa41'; // Замените на реальный сервисный ключ доступа

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
