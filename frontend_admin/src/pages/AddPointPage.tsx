import { useNavigate } from 'react-router-dom'
import back from '../assets/Icon.svg'
import styles from './styles/addpointspage.module.scss'
import add_icon from '../assets/Pluse.svg'
import { FC, useState } from 'react'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const AddPointPage: FC = () => {
  const navigate = useNavigate()
  const [isMapLoading, setIsMapLoading] = useState(true)

  const handleBackClick = () => {
    navigate('/points')
  }

  const handleMapLoad = () => {
    setIsMapLoading(false)
  }

  return (
    <>
      <button className={styles.back_btn} onClick={handleBackClick}>
        <img src={back} alt="" />
      </button>
      <p className={styles.title}>Заполните информацию о точке</p>
      <input
        className={styles.address_input}
        type="text"
        placeholder="Адрес точки"
      />

      <div className={styles.map}>
        {isMapLoading && (
          <Skeleton
            height={400}
            width="100%"
            baseColor="#777777"
            highlightColor="#444444"
          />
        )}
        <YMaps>
          <Map
            defaultState={{ center: [55.751574, 37.573856], zoom: 9 }}
            className={styles.map_container}
            onLoad={handleMapLoad}
          >
            <Placemark geometry={[55.751574, 37.573856]} />
          </Map>
        </YMaps>
      </div>

      <p className={styles.title}>Добавьте изображение торговой точки</p>

      <div className={styles.add_image}>
        <div className={styles.circle}>
          <img src={add_icon} alt="add" />
        </div>
      </div>
    </>
  )
}

export default AddPointPage
