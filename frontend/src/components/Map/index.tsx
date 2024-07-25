import React, { useRef, useState, MouseEvent } from "react";
import styles from "../Map/map.module.css";
import { YMaps, Map as YMapsMap, Placemark } from "@pbe/react-yandex-maps";

const PonarthMap: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const mapOverlayRef = useRef<HTMLDivElement>(null);

  const createPlacemark = () => {
    const center = [54.68113632965351, 20.487322667137775];
    const iconContent = "1";

    return (
      <YMaps>
        <YMapsMap defaultState={{ center, zoom: 18 }} className={styles.map}>
          <Placemark
            geometry={center}
            properties={{ iconContent }}
            options={{
              iconLayout: "default#image",
              iconImageHref: "src/assets/Tag_Ponart.svg", // Укажите путь к вашему изображению
              iconImageSize: [64, 64], // Укажите размер вашего изображения
            }}
          />
        </YMapsMap>
      </YMaps>
    );
  };

  const activateMap = (): void => {
    setIsActive(false);
  };

  const deactivateMap = (event: MouseEvent): void => {
    if (
      mapOverlayRef.current &&
      !mapOverlayRef.current.contains(event.target as Node)
    ) {
      setTimeout(() => {
        setIsActive(true);
      }, 500);
    }
  };

  return (
    <div className={styles.Map} onClick={deactivateMap}>
      <div className={styles.six_page} id="maps">
        <div className={styles.content_six_page}>
          <div className={styles.div_text}>
            <h2 className={styles.texter_six}>
              ПОНАРТ <br />
              НА КАРТЕ
            </h2>
          </div>
          <div className={styles.map_container}>
            <div
              className={styles.map_overlay}
              ref={mapOverlayRef}
              style={{
                opacity: isActive ? "1" : "0",
                pointerEvents: isActive ? "auto" : "none",
              }}
              onClick={activateMap}
            >
              Нажмите чтобы увидеть карту
            </div>
            {createPlacemark()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PonarthMap;
