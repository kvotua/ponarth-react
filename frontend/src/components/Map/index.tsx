import React, { useRef, useState, MouseEvent } from "react";
import styles from "../Map/map.module.css";
import { YMaps, Map as YMapsMap, Placemark, TrafficControl, ZoomControl, FullscreenControl } from "@pbe/react-yandex-maps";

const PonarthMap: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const mapOverlayRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isBalloonOpen, setIsBalloonOpen] = useState<boolean>(false);

    const iconContent = "1";
  const center: [number, number] = [54.68113632965351, 20.487322667137775];

  const iconContent = "Ponarth";
  const hintContent = "Калининград, предприятие Ponarth";
  const infoContent = `
    <div class="${styles.vitrine_content} ${isBalloonOpen ? styles.show : ''}">
      <h3>Пивоварня Ponarth</h3>
      <p style="color: black !important;">Калининград, Киевский пер., 1</p>
      <p style="color: black !important;">Режим работы: 10:00-22:00</p>
    </div>
  `;

  const activateMap = (): void => {
    setIsActive(false);
  };

  const deactivateMap = (event: MouseEvent): void => {
    if (
      mapContainerRef.current &&
      !mapContainerRef.current.contains(event.target as Node)
    ) {
      setIsActive(true);
    }
  };

  const handleBalloonOpen = () => {
    setIsBalloonOpen(true);
  };

  const handleBalloonClose = () => {
    setIsBalloonOpen(false);
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
          <div className={styles.map_container} ref={mapContainerRef}>
            <div
              className={styles.map_overlay}
              ref={mapOverlayRef}
              style={{
                opacity: isActive ? "1" : "0",
                pointerEvents: isActive ? "auto" : "none",
                transition: "opacity 0.5s ease",
              }}
              onClick={activateMap}
            >
              Нажмите чтобы увидеть карту
            </div>
            <YMaps>
              <YMapsMap
                defaultState={{ center, zoom: 20 }}
                className={styles.map}
                modules={[
                  'control.ZoomControl',
                  'control.FullscreenControl',
                  'control.SearchControl',
                  'control.TrafficControl'
                ]}
              >
                <ZoomControl options={{ position: { right: 10, top: 70 } }} />
                <FullscreenControl options={{ position: { left: 10, top: 10 } }} />
                <TrafficControl />

                <Placemark
                  geometry={center}
                  properties={{
                    iconContent: iconContent,
                    hintContent: hintContent,
                    balloonContent: infoContent
                  }}
                  options={{
                    iconLayout: 'default#image',
                    iconImageHref: 'src/assets/Group 8.svg',
                    iconImageSize: [130, 130],
                    iconImageOffset: [-32, -64],
                    hideIconOnBalloonOpen: false,
                  }}
                  onBalloonOpen={handleBalloonOpen}
                  onBalloonClose={handleBalloonClose}
                />
              </YMapsMap>
            </YMaps>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PonarthMap;
