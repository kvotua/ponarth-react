import React, { useRef, useState, MouseEvent } from 'react';
import styles from '../Map/map.module.css';
import { YMaps, Map, Placemark, ZoomControl} from '@pbe/react-yandex-maps';

const PonarthMap: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const mapOverlayRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

 
  const activateMap = (): void => {
    setIsActive(false);
  };

  const deactivateMap = (event: MouseEvent): void => {
    if (mapContainerRef.current && !mapContainerRef.current.contains(event.target as Node)) {
      setIsActive(true);
    }
  };
  const points = [
    {
        coordinates: [54.681612173134894, 20.486968735086027],
        name: 'Калининградский зоопарк'
    },
    {
        coordinates: [54.681562787718505, 20.486080532135926],
        name: 'Кафедральный собор'
    }
];
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
               <Map 
                  defaultState={{ center: [54.681562787718505, 20.486080532135926], zoom: 13 }}  
                   className={styles.map}
                   
               >
                <ZoomControl options={{ position: { right: 10, top: 70 } }} />
                  {points.map((point, index) => (
                   <Placemark 
                   key={index} 
                   geometry={point.coordinates} 
                   properties={{
                    balloonContent: point.name
                }} 
               >
               </Placemark>
                      ))}
               </Map>
           </YMaps>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PonarthMap;
