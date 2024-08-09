import { FC, useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import back from '../assets/Icon.svg'
import add_icon from '../assets/Pluse.svg'
import styles from './styles/addproductpage.module.scss'

interface ImageDisplayProps {
  image: File | null
}

interface AddProduct {
  og: string
  ibu: string
  abv: string
  rub: string
  name: string
  description: string
  color: string
  image: string
}

const ImageDisplay: FC<ImageDisplayProps> = ({ image }) => {
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

const AddProductPage: FC = () => {
  const navigate = useNavigate()
  const [product, setProduct] = useState<AddProduct>({
    og: '',
    ibu: '',
    abv: '',
    rub: '',
    name: '',
    description: '',
    color: '',
    image: '',
  })
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [showButton, setShowButton] = useState(true)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }))
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0])
      setShowButton(false)
    }
  }

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
        <div className={styles.img_container}>
          {showButton ? (
            <label>
              <div className={styles.image_block}>
                <img src={add_icon} alt="add" />
              </div>
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </label>
          ) : (
            <ImageDisplay image={selectedImage} />
          )}
        </div>
        <div className={styles.properties_container}>
          <input
            className={styles.input}
            type="text"
            name="og"
            value={product.og}
            onChange={handleInputChange}
            placeholder="OG"
          />
          <input
            className={styles.input}
            type="text"
            name="ibu"
            value={product.ibu}
            onChange={handleInputChange}
            placeholder="IBU"
          />
          <input
            className={styles.input}
            type="text"
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
            type="text"
            name="rub"
            value={product.rub}
            onChange={handleInputChange}
            placeholder="RUB"
          />
        </div>
        <input
          className={styles.input}
          type="text"
          name="title"
          value={product.name}
          onChange={handleInputChange}
          placeholder="Название продукта"
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
      <button className={styles.save_btn}>Сохранить</button>
    </>
  )
}

export default AddProductPage
