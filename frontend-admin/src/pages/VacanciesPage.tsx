import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './styles/vacanciespage.module.scss'
import settings from '../assets/settings.svg'
import delete_btn from '../assets/delete.svg'
import add_btn from '../assets/Pluse.svg'
import { useNavigate } from 'react-router-dom'
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from 'react'

interface Vacancies {
  id: string
  vacanciesname: string
  vacanciesimg: string
}

const VacanciesPage = () => {
  const [vacancies, setVacancies] = useState<Vacancies[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get<Vacancies[]>('https://6695329f4bd61d8314ca736c.mockapi.io/users')
      .then((response) => {
        setVacancies(response.data)
      })
      .catch((error) => {
        console.error('Ошибка при получении данных', error)
      })
  }, [])

  const handleDelete = (id: string) => {
    axios
      .delete(`https://6695329f4bd61d8314ca736c.mockapi.io/users/${id}`)
      .then((response) => {
        console.log('Запись удалена', response)
        setVacancies(vacancies.filter((vacancy) => vacancy.id !== id))
      })
      .catch((error) => {
        console.error('Ошибка при удалении записи', error)
      })
  }

  return (
    <>
      <h1 className={styles.title}>Отображаемые вакансии</h1>

      <div className={styles.vacancieslistblock}>
        {vacancies.map(
          (vacancy: {
            id: Key | null | undefined
            vacanciesimg: string | undefined
            vacanciesname:
              | string
              | number
              | boolean
              | ReactElement<unknown, string | JSXElementConstructor<unknown>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined
          }) => (
            <div key={vacancy.id} className={styles.vacancies}>
              <div className={styles.image_block}>
                <img src={vacancy.vacanciesimg} alt="image" />
              </div>

              <div className={styles.vacanciesblock}>
                <p className={styles.myParagraph}>{vacancy.vacanciesname}</p>
              </div>

              <button className={styles.settings_btn}>
                <img src={settings} alt="" />
              </button>

              <button
                className={styles.delete_btn}
                onClick={() => {
                  if (typeof vacancy.id === 'string') {
                    handleDelete(vacancy.id)
                  }
                }}
              >
                <img src={delete_btn} alt="" />
              </button>
            </div>
          )
        )}
      </div>
      <button
        className={styles.add_btn}
        onClick={() => navigate('/vacancies/add')}
      >
        <img src={add_btn} alt="Add" />
      </button>
    </>
  )
}

export default VacanciesPage
