import React, { useRef, useState, MouseEvent } from 'react';
import styles from '../Map/map.module.css';
import {
  YMaps,
  Map as YMapsMap,
  Placemark,
  TrafficControl,
  ZoomControl,
  FullscreenControl,
} from '@pbe/react-yandex-maps';
import { Map as YMapInstance } from 'yandex-maps'; // Импорт типа карты, если доступен

const PonarthMap: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const mapOverlayRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isBalloonOpen, setIsBalloonOpen] = useState<boolean>(false);
  const [mapInstance, setMapInstance] = useState<YMapInstance | null>(null); // Типизация экземпляра карты
  const [zoom] = useState<number>(10); // Начальный зум

  const center: [number, number] = [54.681612173134894, 20.486968735086027];
  const additionalPlacemarkCenter: [number, number] = [54.681562787718505, 20.486080532135926];
  const thirdPlacemarkCenter: [number, number] = [54.72457696830196, 20.541960143062454];

  const iconContent = 'Ponarth';
  const hintContent = 'Калининград, предприятие Ponarth';
  const infoContent = `
    <div class="${styles.vitrine_content} ${isBalloonOpen ? styles.show : ''}">
      <h3>Пивоварня Ponarth</h3>
      <p style="color: black !important;">Калининград, Киевский пер., 1</p>
      <p style="color: black !important;">Режим работы: 10:00-22:00</p>
    </div>
  `;

  const thirdPlacemarkInfoContent = `
    <div class="${styles.vitrine_content} ${isBalloonOpen ? styles.show : ''}">
      <h3>Магазин Пивоварни Ponarth</h3>
      <p style="color: black !important;">Калининград, ул. Кубышева 68</p>
      <p style="color: black !important;">Режим работы: 11:00-00:00</p>
    </div>
  `;

  const activateMap = (): void => {
    setIsActive(false);
  };

  const deactivateMap = (event: MouseEvent): void => {
    if (mapContainerRef.current && !mapContainerRef.current.contains(event.target as Node)) {
      setIsActive(true);
    }
  };

  const handleBalloonClose = () => {
    setIsBalloonOpen(false);
  };

  const smoothCenterChange = (newCenter: [number, number]) => {
    if (!mapInstance) return;

    const steps = 30;
    const interval = 8; // интервал обновления в миллисекундах

    const currentCenter = mapInstance.getCenter();
    const deltaLat = (newCenter[0] - currentCenter[0]) / steps;
    const deltaLon = (newCenter[1] - currentCenter[1]) / steps;

    let step = 0;
    const animate = () => {
      if (step < steps) {
        step++;
        mapInstance.setCenter([
          currentCenter[0] + step * deltaLat,
          currentCenter[1] + step * deltaLon,
        ]);
        setTimeout(animate, interval);
      } else {
        mapInstance.setCenter(newCenter); // Устанавливаем точный центр в конце анимации
      }
    };
    animate();
  };

  const handleDelayedBalloonOpen = (placemarkCenter: [number, number]) => {
    setIsBalloonOpen(true);
    smoothCenterChange(placemarkCenter);
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
                opacity: isActive ? '1' : '0',
                pointerEvents: isActive ? 'auto' : 'none',
                transition: 'opacity 0.5s ease',
              }}
              onClick={activateMap}>
              Нажмите чтобы увидеть карту
            </div>
            <YMaps>
              <YMapsMap
                state={{ center, zoom }}
                className={styles.map}
                instanceRef={(instance: YMapInstance) => setMapInstance(instance)} // Сохраняем экземпляр карты
                modules={[
                  'control.ZoomControl',
                  'control.FullscreenControl',
                  'control.SearchControl',
                  'control.TrafficControl',
                ]}>
                <ZoomControl options={{ position: { right: 10, top: 70 } }} />
                <FullscreenControl options={{ position: { left: 10, top: 10 } }} />
                <TrafficControl />

                <Placemark
                  geometry={center}
                  properties={{
                    iconContent: iconContent,
                    hintContent: hintContent,
                    balloonContent: infoContent,
                  }}
                  options={{
                    iconLayout: 'default#image',
                    iconImageHref: 'src/assets/Group 8.svg',
                    iconImageSize: [130, 130],
                    iconImageOffset: [-32, -64],
                    hideIconOnBalloonOpen: false,
                    balloonAutoPan: false, // Отключаем автоматическое перемещение карты
                    balloonPanelMaxMapArea: 0, // Отключает автоматическое центрирование карты
                  }}
                  onBalloonOpen={() => handleDelayedBalloonOpen(center)}
                  onBalloonClose={handleBalloonClose}
                />

                <Placemark
                  geometry={additionalPlacemarkCenter}
                  properties={{
                    iconContent: iconContent,
                    hintContent: hintContent,
                    balloonContent: infoContent,
                  }}
                  options={{
                    iconLayout: 'default#image',
                    iconImageHref: 'src/assets/Group 8.svg',
                    iconImageSize: [130, 130],
                    iconImageOffset: [-32, -64],
                    hideIconOnBalloonOpen: false,
                    balloonAutoPan: false, // Отключаем автоматическое перемещение карты
                    balloonPanelMaxMapArea: 0, // Отключает автоматическое центрирование карты
                  }}
                  onBalloonOpen={() => handleDelayedBalloonOpen(additionalPlacemarkCenter)}
                  onBalloonClose={handleBalloonClose}
                />

                <Placemark
                  geometry={thirdPlacemarkCenter}
                  properties={{
                    iconContent: 'Третья метка',
                    hintContent: 'Без дополнительной информации',
                    balloonContent: thirdPlacemarkInfoContent,
                  }}
                  options={{
                    iconLayout: 'default#image',
                    iconImageHref: 'src/assets/Group 8.svg',
                    iconImageSize: [130, 130],
                    iconImageOffset: [-32, -64],
                    hideIconOnBalloonOpen: false,
                    balloonAutoPan: false, // Отключаем автоматическое перемещение карты
                    balloonPanelMaxMapArea: 0, // Отключает автоматическое центрирование карты
                  }}
                  onBalloonOpen={() => handleDelayedBalloonOpen(thirdPlacemarkCenter)}
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
