import { FC, useState, ChangeEvent, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import icon from '../assets/Icon.svg'
import styles from './styles/addvacanciespage.module.scss'
import {
  addVacancy,
  uploadVacancyImage,
  updateVacancy,
  updateVacancyImage,
} from '../api/vacancies/requests'
import button_icon from '../assets/Pluse.svg'

interface AddVacancy {
  id?: number
  vacanciesname: string
  vacanciesdescription: string
}

const AddVacanciesPage: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [vacancy, setVacancy] = useState<AddVacancy>({
    vacanciesname: '',
    vacanciesdescription: '',
  })
  const [image, setImage] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    if (location.state && location.state.vacancy) {
      const { id, name, description, base64Image } = location.state.vacancy
      setVacancy({
        id,
        vacanciesname: name,
        vacanciesdescription: description,
      })
      setImagePreview(base64Image)
    }
  }, [location.state])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setVacancy((prevVacancy) => ({
      ...prevVacancy,
      [name]: value,
    }))
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSave = async () => {
    setIsSubmitting(true)
    try {
      const base64Image = image ? await imageToBase64(image) : ''
      if (vacancy.id) {
        await updateVacancy({
          id: vacancy.id,
          name: vacancy.vacanciesname,
          description: vacancy.vacanciesdescription,
          image: base64Image,
          fileName: image ? image.name : '',
        })

        if (image) {
          await updateVacancyImage(vacancy.id, image) // Обновляем изображение
        }

        alert('Вакансия обновлена!')
      } else {
        const vacancyId = await addVacancy({
          name: vacancy.vacanciesname,
          description: vacancy.vacanciesdescription,
        })

        if (image) {
          await uploadVacancyImage(vacancyId, image)
        }

        alert('Вакансия добавлена!')
      }
      window.location.href = '/vacancies'
    } catch (error) {
      console.error('Error saving vacancy:', error)
      alert('Ошибка сохранения вакансии!')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBackClick = () => {
    navigate('/vacancies')
  }

  const imageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
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
          <h2>Добавьте изображение вакансии</h2>
          <section
            className={styles.img_container}
            style={{
              backgroundImage: imagePreview ? `url(${imagePreview})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div>
              <label>
                <div className={styles.image_block}>
                  <img src={button_icon} alt="" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  name="vacanciesimg"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </section>
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
