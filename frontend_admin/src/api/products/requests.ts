import { AxiosResponse } from 'axios'
import api from '../api'

interface ProductData {
  id?: number
  name: string
  color: string
  description: string // Add this line
}

interface ImageResponse {
  success: boolean
  message: string
}

interface Products {
  id: number
  name: string
  description: string
  color: string
  image: string
}

export const addProduct = async (data: ProductData): Promise<number> => {
  try {
    const token = localStorage.getItem('token')
    const response = await api.post<number>('/admin/beer/add', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error adding product', error)
    throw error
  }
}

export const uploadProductImage = async (
  productId: number,
  image: File
): Promise<ImageResponse> => {
  try {
    const token = localStorage.getItem('token')
    const formData = new FormData()
    formData.append('file', image)

    const response = await api.post<ImageResponse>(
      `/admin/beer/image/${productId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Error uploading image', error)
    throw error
  }
}

export const addProductWithImage = async (
  data: ProductData,
  image: File
): Promise<{ productId: number; imageResponse: ImageResponse }> => {
  try {
    const productId = await addProduct(data)
    const imageResponse = await uploadProductImage(productId, image)
    return { productId, imageResponse }
  } catch (error) {
    console.error('Error adding vacancy with image:', error)
    throw error
  }
}

export const getProducts = async (): Promise<Products[]> => {
  try {
    const response: AxiosResponse<Products[]> = await api.get(
      '/site/beer/all',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Error fetching vacancies', error)
    throw error
  }
}

export const deleteProduct = async (id: number): Promise<void> => {
  try {
    const token = localStorage.getItem('token')
    await api.delete(`/admin/beer/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    console.error('Error deleting product', error)
    throw error
  }
}
