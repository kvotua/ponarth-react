import { FC, useState, ChangeEvent, useEffect, useRef, useLayoutEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import icon from '../assets/Icon.svg'
import TextareaAutosize from 'react-textarea-autosize';
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  

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

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      const lineHeight = 24;
      const rows = Math.max(
        2,
        Math.ceil(textareaRef.current.scrollHeight / lineHeight)
      );
      textareaRef.current.rows = rows;
      console.log(rows);
    }
    const { name, value } = event.target
    setVacancy((prevVacancy) => ({
      ...prevVacancy,
      [name]: value,
    }))
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      const fileSizeInMB = file.size / 1024 / 1024

      if (fileSizeInMB > 5) {
        alert('Размер файла не должен превышать 5 МБ')
        return
      }

      const img = new Image()
      const width = 8000
      const height = 8000
      img.onload = () => {
        if (img.width > width || img.height > height) {
          alert(
            `Разрешение изображения не должно превышать  ${width}x${height}`
          )
          return
        }

        setImage(file)
        setImagePreview(URL.createObjectURL(file))
      }
      img.src = URL.createObjectURL(file)
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
  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      if (textareaRef.current) {
        const event = {
          target: textareaRef.current,
        } as React.ChangeEvent<HTMLTextAreaElement>;
        handleTextAreaChange(event);
      }
    }, 100); // Небольшая задержка для гарантии применения стилей
  
    return () => clearTimeout(timer);
  }, []);

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
          <TextareaAutosize
            className={styles.big_input}
            name="description"
            value={vacancy.vacanciesdescription}
            onChange={handleTextAreaChange}
            placeholder="Описание продукта"
            minRows={2}
            maxRows={10}
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
