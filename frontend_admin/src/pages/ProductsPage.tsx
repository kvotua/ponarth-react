import React, { useEffect, useState } from 'react'
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
  base64Image: string
}

const ProductPage: React.FC = () => {
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
          image: product.image,
          base64Image: `data:image/jpeg;base64,${product.image}`,
        }))
        setProducts(productsWithDecodedImages)
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

  return (
    <>
      <h1 className={styles.title}>Отображаемые продукты</h1>

      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className={styles.points_list}>
        {filteredProduct.map((product) => (
          <div key={product.id} className={styles.point}>
            <div className={styles.image_block}>
              <img src={product.base64Image} alt="image" />{' '}
            </div>

            <div className={styles.description_block}>
              <h2>{product.title}</h2>
              <p>{product.description}</p>
            </div>

            <div className={styles.settings_btn}>
              <img src={settings} alt="" />
            </div>

            <div
              className={styles.delete_btn}
              onClick={() => handleDeleteClick(product.id)}
            >
              <img src={delete_btn} alt="" />
            </div>
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
