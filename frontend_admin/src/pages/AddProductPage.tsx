import { FC, useState, ChangeEvent, useEffect, useRef, useLayoutEffect} from 'react'
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

function getBase64FileSize(base64String: string): number | null {
  if (!base64String) return null;

  try {
    // Удаляем data-URL префикс если есть (например: "data:image/png;base64,...")
    const base64Data = base64String.includes(',') 
      ? base64String.split(',')[1] 
      : base64String;

    // Проверяем валидность Base64 (должна содержать только разрешенные символы)
    if (!/^[A-Za-z0-9+/]+={0,2}$/.test(base64Data)) {
      throw new Error('Invalid Base64 string');
    }

    // Вычисляем длину без padding символов '='
    const padding = (base64Data.match(/=+$/) || [''])[0].length;
    const cleanBase64 = base64Data.replace(/=+$/, '');

    // Основная формула расчета размера
    const sizeInBytes = (cleanBase64.length * 3) / 4 - padding;

    // Возвращаем округленное значение (размер не может быть дробным)
    return Math.ceil(sizeInBytes);
  } catch (error) {
    console.error('Error calculating Base64 file size:', error);
    return null;
  }
}
function formatFileSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
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
  const [fileSize, setFileSize] = useState()
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
      setImagePreview(productToEdit.image)
      setFileSize(formatFileSize(getBase64FileSize(productToEdit.image)));
    }
  }, [productToEdit])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }))
  }



  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      const lineHeight = 24;
      const rows = Math.max(
        2,
        Math.ceil(textareaRef.current.scrollHeight / lineHeight)
      );
      textareaRef.current.rows = rows;
      console.log(rows);
    }
    const { name, value } = event.target;

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

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
      const width = 800   
      const height = 800
      img.onload = () => {
        if (img.width > width || img.height > height) {
          alert(
            `Разрешение изображения не должно превышать  ${width}x${height}`
          )
          return
        }

        setImage(file)
        setImagePreview(URL.createObjectURL(file))
        setFileSize(formatFileSize(file.size));
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
    <div className={styles.image_and_properties}>
      <button className={styles.back_btn} onClick={handleBackClick}>
        <img src={back} alt="" />
      </button>
      <p className={styles.title}>Добавьте изображение продукта</p>
      {/* <button className={styles.back_btn} style={{opacity: 0, // Прозрачность
              pointerEvents: 'none', // Отключает взаимодействие
              cursor: 'not-allowed', // Меняет курсор
              background: 'transparent', // Прозрачный фон
              border: 'none' }} onClick={handleBackClick}>
        <img src={back} alt="" />
      </button> */}
      </div>
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
      <p>Имя файла на сервере: {productToEdit.fileName} {fileSize}</p>

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

        <textarea
          className={styles.big_input}
          name="description"
          ref={textareaRef}
          value={product.description}
          onChange={handleTextAreaChange}
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
