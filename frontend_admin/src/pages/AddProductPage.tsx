import { FC, useState, ChangeEvent, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { SketchPicker, ColorResult } from 'react-color'
import back from '../assets/Icon.svg'
import add_icon from '../assets/Pluse.svg'
import styles from './styles/addproductpage.module.scss'
import {
  addProduct,
  updateProduct,
  updateProductImage,
  uploadProductImage,
} from '../api/products/requests'

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
  const location = useLocation()
  const productToEdit = location.state?.product

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

  useEffect(() => {
    if (productToEdit) {
      const descriptionParts = productToEdit.description.split(';')
      const og =
        descriptionParts
          .find((part: string) => part.trim().startsWith('OG:'))
          ?.split(':')[1]
          .trim() || ''
      const ibu =
        descriptionParts
          .find((part: string) => part.trim().startsWith('IBU:'))
          ?.split(':')[1]
          .trim() || ''
      const abv =
        descriptionParts
          .find((part: string) => part.trim().startsWith('ABV:'))
          ?.split(':')[1]
          .trim() || ''
      const rub =
        descriptionParts
          .find((part: string) => part.trim().startsWith('RUB:'))
          ?.split(':')[1]
          .trim() || ''
      const description = descriptionParts.slice(4).join(';').trim()

      setProduct({
        og,
        ibu,
        abv,
        rub,
        name: productToEdit.title,
        description,
        color: productToEdit.color,
      })
      setImagePreview(productToEdit.base64Image)
    }
  }, [productToEdit])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }))
  }

  const handleColorChange = (color: ColorResult) => {
    const rgbaColor = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
    setProduct((prevProduct) => ({
      ...prevProduct,
      color: rgbaColor,
    }))
    console.log(rgbaColor)
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
      const width = 5000
      const height = 5080
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
      const concatenatedDescription = `OG: ${product.og};
      IBU: ${product.ibu};
      ABV: ${product.abv};
      RUB: ${product.rub};
      ${product.description}`

      const productData = {
        id: productToEdit ? productToEdit.id : Date.now(),
        name: product.name,
        description: concatenatedDescription,
        color: product.color,
        image: imagePreview || '',
      }

      if (productToEdit) {
        await updateProduct(productData)
        if (image) {
          await updateProductImage(productToEdit.id, image)
        }
        alert('Продукт обновлен!')
      } else {
        const productId = await addProduct(productData)
        if (image) {
          await uploadProductImage(productId, image)
        }
        alert('Продукт добавлен!')
      }
      window.location.href = '/products'
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Ошибка сохранения продукта!')
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
                accept="image/*, .svg"
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
          className={styles.big_input}
          type="text"
          name="description"
          value={product.description}
          onChange={handleInputChange}
          placeholder="Описание продукта"
        />
        <SketchPicker
          color={product.color}
          onChangeComplete={handleColorChange}
          className={styles.color_picker}
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
