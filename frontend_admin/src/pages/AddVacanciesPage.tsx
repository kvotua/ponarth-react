import { FC, useState, ChangeEvent } from 'react'
import axios from 'axios'
import icon from '../assets/Icon.svg'
import button_icon from '../assets/Icon.png'
import styles from './styles/addvacanciespage.module.scss'

interface ImageDisplayProps {
  image: File | null
}

interface AddVacancy {
  vacanciesname: string
  vacanciesimg: string
  vacanciesdescription?: string // make it optional
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ image }) => {
  return (
    <div className={styles.img_container}>
      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="Selected Image"
          className={styles.img}
        />
      )}
    </div>
  )
}

const AddVacanciesPage: FC = () => {
  const [vacancy, setVacancy] = useState<AddVacancy>({
    vacanciesname: '',
    vacanciesimg: '',
    vacanciesdescription: '',
  })
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [showButton, setShowButton] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setVacancy((prevVacancy) => ({
      ...prevVacancy,
      [name]: value,
    }))
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0])
      setShowButton(false)
    }
  }

  const handleSave = () => {
    setIsSubmitting(true)
    const formData = new FormData()
    formData.append('vacanciesname', vacancy.vacanciesname)
    formData.append('vacanciesimg', selectedImage as File)
    if (vacancy.vacanciesdescription) {
      formData.append('vacanciesdescription', vacancy.vacanciesdescription)
    }
    axios
      .post('https://6695329f4bd61d8314ca736c.mockapi.io/vacancies', formData)
      .then((response) => {
        if (response.status === 201) {
          console.log('Vacancy added successfully!')
          alert('Вакансия добавлена!')
          setError(null)
          window.location.href = '/vacancies'
        }
      })
      .catch((error) => {
        console.error('Error adding vacancy:', error)
        alert('Ошибка добавления вакансии!')
        setError('Ошибка добавления вакансии!')
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <>
      <button
        className={styles.back_btn}
        onClick={() => (window.location.href = '/vacancies')}
      >
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
        <h2>Добавьте изображение вакансии</h2>
        <section className={styles.img_container}>
          <div>
            {showButton ? (
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
            ) : (
              <ImageDisplay image={selectedImage} />
            )}
          </div>
        </section>
        {error && <div style={{ color: 'red' }}>{error}</div>}
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
