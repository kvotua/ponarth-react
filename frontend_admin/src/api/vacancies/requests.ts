import api from '../api'
import { AxiosResponse } from 'axios'

interface VacancyData {
  name: string
  description: string
}

interface ImageResponse {
  success: boolean
  message: string
}

interface Vacancy {
  id: number
  name: string
  description: string
  image: string
}

export const addVacancy = async (data: VacancyData): Promise<number> => {
  try {
    const token = localStorage.getItem('token')
    const response = await api.post<number>('/admin/vacancy/add', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error adding vacancy:', error)
    throw error
  }
}

export const uploadVacancyImage = async (
  vacancyId: number,
  image: File
): Promise<ImageResponse> => {
  try {
    const token = localStorage.getItem('token')
    const formData = new FormData()
    formData.append('file', image)

    const response = await api.post<ImageResponse>(
      `/admin/vacancy/image/${vacancyId}`,
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
    console.error('Error uploading image:', error)
    throw error
  }
}

export const addVacancyWithImage = async (
  data: VacancyData,
  image: File
): Promise<{ vacancyId: number; imageResponse: ImageResponse }> => {
  try {
    const vacancyId = await addVacancy(data)
    const imageResponse = await uploadVacancyImage(vacancyId, image)
    return { vacancyId, imageResponse }
  } catch (error) {
    console.error('Error adding vacancy with image:', error)
    throw error
  }
}

export const getVacancies = async (): Promise<Vacancy[]> => {
  try {
    const response: AxiosResponse<Vacancy[]> = await api.get(
      '/site/vacancy/all',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Error fetching vacancies:', error)
    throw error
  }
}
