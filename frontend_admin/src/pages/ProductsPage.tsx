import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './styles/productpage.module.scss'
import settings from '../assets/settings.svg'
import delete_btn from '../assets/delete.svg'
import add_btn from '../assets/Pluse.svg'
import Search from '../components/Search'
import { useNavigate } from 'react-router-dom'

interface Point {
  id: string
  title: string
  description: string
  image: string
}

const ProductPage: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')

  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get<Point[]>(
        'https://66a0e85d7053166bcabd538e.mockapi.io/api/task_productpage/product'
      )
      .then((response) => {
        setPoints(response.data)
      })
      .catch((error) => {
        console.error('Ошибка при получении данных', error)
      })
  }, [])

  const filteredPoints = points.filter((point) =>
    point.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <h1 className={styles.title}>Отображаемые продукты</h1>

      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className={styles.points_list}>
        {filteredPoints.map((point) => (
          <div key={point.id} className={styles.point}>
            <div className={styles.image_block}>
              <img src={point.image} alt="image" />
            </div>

            <div className={styles.description_block}>
              <h2>{point.title}</h2>
              <p>{point.description}</p>
            </div>

            <div className={styles.settings_btn}>
              <img src={settings} alt="" />
            </div>

            <div className={styles.delete_btn}>
              <img src={delete_btn} alt="" />
            </div>
          </div>
        ))}
      </div>
      <button
        className={styles.add_btn}
        onClick={() => navigate('/products/add')}
      >
        <img src={add_btn} alt="Add" />
      </button>
    </>
  )
}

export default ProductPage
