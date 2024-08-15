import { FC, useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import back from '../assets/Icon.svg'
import add_icon from '../assets/Pluse.svg'
import styles from './styles/addproductpage.module.scss'
import { addProduct, uploadProductImage } from '../api/products/requests'

interface AddProduct {
  og: string
  ibu: string
  abv: string
  rub: string
  name: string
  description: string
  color: string
}

const AddProductPage: FC = () => {
  const [product, setProduct] = useState<AddProduct>({
    og: '',
    ibu: '',
    abv: '',
    rub: '',
    name: '',
    description: '',
    color: '',
  })

  const [image, setImage] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setProduct((prevProduct) => ({
      ...prevProduct,
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
      const concatenatedDescription = `OG: ${product.og};
      IBU: ${product.ibu};
      ABV: ${product.abv};
      RUB: ${product.rub};
      ${product.description}`
      const productId = await addProduct({
        name: product.name,
        description: concatenatedDescription,
        color: product.color,
      })
      if (image) {
        await uploadProductImage(productId, image)
      }
      alert('Продукт добавлен!')
      window.location.href = '/products'
    } catch (error) {
      console.error('Error adding product:', error)
      alert('Ошибка добавления продукта!')
    } finally {
      setIsSubmitting(false)
    }
  }

  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate('/products')
  }

  return (
    <>
      <button className={styles.back_btn} onClick={handleBackClick}>
        <img src={back} alt="" />
      </button>
      <p className={styles.title}>Добавьте изображение продукта</p>
      <div className={styles.image_and_properties_block}>
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
                <img src={add_icon} alt="" />
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
        <div className={styles.properties_container}>
          <input
            className={styles.input}
            type="number"
            name="og"
            value={product.og}
            onChange={handleInputChange}
            placeholder="OG"
          />
          <input
            className={styles.input}
            type="number"
            name="ibu"
            value={product.ibu}
            onChange={handleInputChange}
            placeholder="IBU"
          />
          <input
            className={styles.input}
            type="number"
            name="abv"
            value={product.abv}
            onChange={handleInputChange}
            placeholder="ABV"
          />
        </div>
      </div>
      <p className={styles.title}>Заполните дополнительную информацию</p>
      <div className={styles.additional_information}>
        <div className={styles.money_container}>
          <p className={styles.money_text}>Стоимость продукта:</p>
          <input
            className={styles.input}
            type="number"
            name="rub"
            value={product.rub}
            onChange={handleInputChange}
            placeholder="RUB"
          />
        </div>
        <input
          className={styles.input}
          type="text"
          name="name"
          value={product.name}
          onChange={handleInputChange}
          placeholder="Название продукта"
        />
        <input
          className={styles.input}
          type="text"
          name="color"
          value={product.color}
          onChange={handleInputChange}
          placeholder="Цвет продукта"
        />
        <input
          className={styles.big_input}
          type="text"
          name="description"
          value={product.description}
          onChange={handleInputChange}
          placeholder="Описание продукта"
        />
      </div>
      <button
        className={styles.save_btn}
        onClick={handleSave}
        disabled={isSubmitting}
      >
        Сохранить
      </button>
    </>
  )
}

export default AddProductPage
