import { useState, useEffect } from 'react'
import styles from './styles/vacanciespage.module.scss'
import settings from '../assets/settings.svg'
import delete_btn from '../assets/delete.svg'
import add_btn from '../assets/Pluse.svg'
import { useNavigate } from 'react-router-dom'
import { deleteVacancy, getVacancies } from '../api/vacancies/requests'

export interface Vacancy {
  id: number
  name: string
  description: string
  image: string
  fileName: string
  base64Image?: string
}

const getImageSrc = (image: string, fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase()
  switch (extension) {
    case 'svg':
      return `data:image/svg+xml;base64,${image}`
    case 'png':
      return `data:image/png;base64,${image}`
    case 'jpeg':
    case 'jpg':
      return `data:image/jpeg;base64,${image}`
    default:
      return ''
  }
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
          base64Image: vacancy.fileName
            ? getImageSrc(vacancy.image, vacancy.fileName)
            : '', // Decode base64 image
        }))
        setVacancies(vacanciesWithDecodedImages as Vacancy[])
      } catch (error) {
        console.error('Error fetching vacancies:', error)
      }
    }

    fetchVacancies()
  }, [])

  const handleDeleteClick = async (id: number) => {
    const confirmed = window.confirm(
      'Вы уверены что хотите удалить данную вакансию'
    )
    if (confirmed) {
      try {
        await deleteVacancy(id)
        setVacancies(vacancies.filter((vacancy) => vacancy.id !== id))
      } catch (error) {
        console.error('Error deleting vacancy', error)
      }
    }
  }

  const handleSettingsClick = (vacancy: Vacancy) => {
    navigate('/vacancies/add', { state: { vacancy } })
  }

  return (
    <>
      <h1 className={styles.title}>Отображаемые вакансии</h1>

      <div className={styles.vacancieslistblock}>
        {vacancies.map((vacancy) => (
          <div key={vacancy.id} className={styles.vacancies}>
            <div className={styles.image_block}>
              <img src={vacancy.base64Image} alt={vacancy.name} />
            </div>

            <div className={styles.vacanciesblock}>
              <p className={styles.myParagraph}>{vacancy.name}</p>
            </div>

            <button
              className={styles.settings_btn}
              onClick={() => handleSettingsClick(vacancy)}
            >
              <img src={settings} alt="" />
            </button>

            <button
              className={styles.delete_btn}
              onClick={() => handleDeleteClick(vacancy.id)}
            >
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
