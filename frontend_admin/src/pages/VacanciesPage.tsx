import { useState, useEffect } from 'react'
import styles from './styles/vacanciespage.module.scss'
import settings from '../assets/settings.svg'
import delete_btn from '../assets/delete.svg'
import add_btn from '../assets/Pluse.svg'
import { useNavigate } from 'react-router-dom'
import { getVacancies } from '../api/vacancies/requests'

export interface Vacancy {
  id: number // Changed from string to number
  name: string
  description: string
  image: string
  base64Image?: string // Added base64Image field
}

const VacanciesPage = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const data = await getVacancies()
        const vacanciesWithDecodedImages = data.map((vacancy) => ({
          ...vacancy,
          base64Image: `data:image/jpeg;base64,${vacancy.image}`, // Decode base64 image
        }))
        setVacancies(vacanciesWithDecodedImages)
      } catch (error) {
        console.error('Error fetching vacancies:', error)
      }
    }

    fetchVacancies()
  }, [])

  return (
    <>
      <h1 className={styles.title}>Отображаемые вакансии</h1>

      <div className={styles.vacancieslistblock}>
        {vacancies.map((vacancy) => (
          <div key={vacancy.id} className={styles.vacancies}>
            <div className={styles.image_block}>
              <img src={vacancy.base64Image} alt="image" />{' '}
              {/* Use decoded image */}
            </div>

            <div className={styles.vacanciesblock}>
              <p className={styles.myParagraph}>{vacancy.name}</p>
            </div>

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
        onClick={() => navigate('/vacancies/add')}
      >
        <img src={add_btn} alt="Add" />
      </button>
    </>
  )
}

export default VacanciesPage
