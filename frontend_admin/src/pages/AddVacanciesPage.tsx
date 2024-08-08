import { FC, useState, ChangeEvent } from 'react'
import icon from '../assets/Icon.svg'
import styles from './styles/addvacanciespage.module.scss'
import { addVacancy } from '../api/requests' // Импортируем функцию addVacancy
import { useNavigate } from 'react-router-dom'

interface AddVacancy {
  vacanciesname: string
  vacanciesdescription: string
}

const AddVacanciesPage: FC = () => {
  const [vacancy, setVacancy] = useState<AddVacancy>({
    vacanciesname: '',
    vacanciesdescription: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setVacancy((prevVacancy) => ({
      ...prevVacancy,
      [name]: value,
    }))
  }

  const handleSave = async () => {
    setIsSubmitting(true)
    try {
      await addVacancy({
        name: vacancy.vacanciesname,
        description: vacancy.vacanciesdescription,
      })
      alert('Вакансия добавлена!')
      window.location.href = '/vacancies'
    } catch (error) {
      console.error('Error adding vacancy:', error)
      alert('Ошибка добавления вакансии!')
    } finally {
      setIsSubmitting(false)
    }
  }

  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate('/vacancies')
  }

  return (
    <>
      <button className={styles.back_btn} onClick={handleBackClick}>
        <img src={icon} alt="" />
      </button>
      <section className={styles.add_vacancies_main}>
        <h1>Заполните информацию о вакансии</h1>
        <div className={styles.input_container}>
          <label>
            <input
              className={styles.add_vacancies_input}
              type="text"
              name="vacanciesname"
              value={vacancy.vacanciesname}
              onChange={handleInputChange}
              placeholder="Название вакансии"
            />
          </label>

          <label>
            <input
              className={styles.second_input}
              type="text"
              name="vacanciesdescription"
              value={vacancy.vacanciesdescription}
              onChange={handleInputChange}
              placeholder="Описание вакансии"
            />
          </label>
        </div>
        <button
          className={styles.save_btn}
          onClick={handleSave}
          disabled={isSubmitting}
        >
          Сохранить
        </button>
      </section>
    </>
  )
}

export default AddVacanciesPage
