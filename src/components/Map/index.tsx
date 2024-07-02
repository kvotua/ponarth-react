import styles from '../Map/header.module.css';

const Map = () => {
    return (
        <div className={styles.Map}>
           <div className={styles.six_page} id="maps">
        <div className={styles.content_six_page}>
          <h2 className={styles.texter_six}>ПОНАРТ <br />НА КАРТЕ</h2>


          <div style={{ position: "relative", overflow: "hidden", borderTop: "2px solid #d3d3d3", paddingTop: "40px" }}>
            <div className={styles.map_container}>
              <iframe className={styles.map}
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A69e7963fbd932471d4fe17d380227c9a9764eb17e7f5c0f0f24f227e3959a1ba&amp;source=constructor"
                frameBorder="0"></iframe>
              <div class="map-overlay" onclick="activateMap()">Нажмите чтобы увидеть карту</div>
            </div>
          </div>
        </div>
      </div>
        </div>
    );
}

export default Map;