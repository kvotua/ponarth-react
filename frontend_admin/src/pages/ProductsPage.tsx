import { FC, useEffect, useState } from 'react'
import styles from './styles/productpage.module.scss'
import settings from '../assets/settings.svg'
import delete_btn from '../assets/delete.svg'
import add_btn from '../assets/Pluse.svg'
import Search from '../components/Search'
import { useNavigate } from 'react-router-dom'
import { getProducts, deleteProduct } from '../api/products/requests'

interface Product {
  id: number
  title: string
  description: string
  image: string
  base64Image?: string
  fileName: string
  color: string
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

const ProductPage: FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        const productsWithDecodedImages = data.map((product) => ({
          id: product.id,
          title: product.name,
          description: product.description,
          image: product.fileName
          ? getImageSrc(product.image, product.fileName)
          : product.image,
          fileName: product.fileName,
          color: product.color,
        }))
        setProducts(productsWithDecodedImages as Product[])
      } catch (error) {
        console.error('Error fetching products', error)
      }
    }

    fetchProducts()
  }, [])

  const handleDeleteClick = async (id: number) => {
    const confirmed = window.confirm(
      'Вы уверены что хотите удалить данный продукт?'
    )
    if (confirmed) {
      try {
        await deleteProduct(id)
        setProducts(products.filter((product) => product.id !== id))
      } catch (error) {
        console.error('Error deleting product', error)
      }
    }
  }

  const [searchQuery, setSearchQuery] = useState<string>('')
  const filteredProduct = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSettingsClick = (product: Product) => {
    navigate('/products/add', { state: { product } })
  }

  return (
    <>
      <h1 className={styles.title}>Отображаемые продукты</h1>

      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className={styles.points_list}>
        {filteredProduct.map((product) => (
          <div key={product.id} className={styles.point}>
            <div className={styles.image_block}>
              <img
                src={product.image}
                alt={product.title}
                style={{ border: `6px solid ${product.color}` }}
              />
            </div>

            <div className={styles.description_block}>
              <h2>{product.title}</h2>
              <p className={styles.clamped_text}>{product.description}</p>
            </div>

            <button
              className={styles.settings_btn}
              onClick={() => handleSettingsClick(product)}
            >
              <img src={settings} alt="" />
            </button>

            <button
              className={styles.delete_btn}
              onClick={() => handleDeleteClick(product.id)}
            >
              <img src={delete_btn} alt="" />
            </button>
          </div>
        ))}
      </div>
      <button
        className={styles.add_btn}
        onClick={() => navigate('/products/add')}
      >
        <img src={add_btn} alt="Add" />
      </button>
    </>
  )
}

export default ProductPage
