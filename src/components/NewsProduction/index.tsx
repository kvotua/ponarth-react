import VKPosts from './VkPost';
import styles from './NewsProduction.module.css';

function NewsProduction() {
  const groupId = 'ponarth'; // Замените на реальный ID группы
  const accessToken = '05666844056668440566684479067f279c005660566684463f75a3168a4db417e744c85'; // Замените на реальный сервисный ключ доступа

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
