import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styles from './styles/pointspage.module.scss'
import settings from '../assets/settings.svg'
import delete_btn from '../assets/delete.svg'
import add_btn from '../assets/Pluse.svg'
import Search from '../components/Search'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface Point {
  id: string
  address: string
  image: string
}

const PointsPage: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get<Point[]>('https://665730a89f970b3b36c84dc4.mockapi.io/points')
      .then((response) => {
        setPoints(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Ошибка при получении данных', error)
        setIsLoading(false)
      })
  }, [])

  const filteredPoints = points.filter((point) =>
    point.address.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <h1 className={styles.title}>Отображаемые торговые точки на карте</h1>

      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className={styles.points_list}>
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className={styles.point}>
                <div className={styles.image_block}>
                  <Skeleton height={70} width={70} />
                </div>
                <h2>
                  <Skeleton width={160} />
                  <Skeleton width={120} />
                </h2>
                <button className={styles.settings_btn}>
                  <img src={settings} alt="" />
                </button>
                <button className={styles.delete_btn}>
                  <img src={delete_btn} alt="" />
                </button>
              </div>
            ))
          : filteredPoints.map((point) => (
              <div key={point.id} className={styles.point}>
                <div className={styles.image_block}>
                  <img src={point.image} alt="image" />
                </div>
                <h2>{point.address}</h2>
                <button className={styles.settings_btn}>
                  <img src={settings} alt="" />
                </button>
                <button className={styles.delete_btn}>
                  <img src={delete_btn} alt="" />
                </button>
              </div>
            ))}
      </div>
      <button
        className={styles.add_btn}
        onClick={() => navigate('/points/add')}
      >
        <img src={add_btn} alt="Add" />
      </button>
    </>
  )
}

export default PointsPage
